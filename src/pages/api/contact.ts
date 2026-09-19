import type { APIRoute } from "astro";
import { validateContactSubmission } from "../../lib/validation";
import { validateRequestSecurity } from "../../lib/requestSecurity";
import { verifyTurnstileToken } from "../../lib/turnstile";
import { checkRateLimit, hashIdentifier } from "../../lib/rateLimit";
import { D1ContactRepository, InMemoryContactRepository } from "../../lib/contactRepository";
import { getContactNotifier } from "../../lib/notifications";
import { applySecurityHeaders } from "../../lib/securityHeaders";

export const prerender = false; // On-demand server execution for contact submissions

// In-memory fallback repository when local dev runs without attached D1 database
const devFallbackRepo = new InMemoryContactRepository();

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });
  applySecurityHeaders(headers);

  // Cloudflare environment bindings
  const cfEnv = ((locals as Record<string, unknown>)?.runtime as Record<string, unknown>)?.env as Record<string, unknown> | undefined;
  const canonicalOrigin = (cfEnv?.CANONICAL_ORIGIN as string) || "https://maharajasystems.com";
  const rateLimitSecret = (cfEnv?.RATE_LIMIT_SECRET as string) || "dev_rate_limit_secret_key";
  const turnstileSecret = (cfEnv?.TURNSTILE_SECRET_KEY as string) || "1x0000000000000000000000000000000AA";
  const expectedHostname = (cfEnv?.TURNSTILE_EXPECTED_HOSTNAME as string) || "localhost";
  const d1Db = cfEnv?.DB as any;

  // 1. Request Security Checks (Method, Content-Length, Sec-Fetch-Site, Origin)
  const secCheck = validateRequestSecurity(request, canonicalOrigin);
  if (!secCheck.allowed) {
    return new Response(
      JSON.stringify({ success: false, message: secCheck.reason }),
      { status: secCheck.status || 400, headers }
    );
  }

  // 2. Body Parsing (JSON or Form URL-encoded)
  let rawBody: Record<string, unknown> = {};
  const contentType = request.headers.get("content-type") || "";
  const isFormSubmission = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  try {
    if (isFormSubmission) {
      const formData = await request.formData();
      formData.forEach((val, key) => {
        rawBody[key] = val;
      });
      // Map honeypot field
      if (formData.has("company_tax_reference")) {
        rawBody["honeypot"] = formData.get("company_tax_reference");
      }
      if (formData.has("cf-turnstile-response")) {
        rawBody["turnstile_token"] = formData.get("cf-turnstile-response");
      }
    } else {
      rawBody = await request.json() as Record<string, unknown>;
      if (rawBody["company_tax_reference"]) {
        rawBody["honeypot"] = rawBody["company_tax_reference"];
      }
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid payload format." }),
      { status: 400, headers }
    );
  }

  // 3. Server-Side Data Validation
  const validation = validateContactSubmission(rawBody);
  if (!validation.isValid || !validation.data) {
    if (isFormSubmission) {
      // Re-render / redirect back or show error
      return new Response(
        JSON.stringify({ success: false, errors: validation.errors }),
        { status: 422, headers }
      );
    }
    return new Response(
      JSON.stringify({ success: false, errors: validation.errors }),
      { status: 422, headers }
    );
  }

  // 4. Server-Side Cloudflare Turnstile Verification (Section 100)
  const clientToken = typeof rawBody.turnstile_token === "string" ? rawBody.turnstile_token : "";
  const clientIp = request.headers.get("cf-connecting-ip") || "127.0.0.1";

  const turnstileResult = await verifyTurnstileToken(
    clientToken,
    turnstileSecret,
    expectedHostname,
    "contact_form",
    clientIp
  );

  if (!turnstileResult.success) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "We could not complete the verification. Please try again.",
        errors: [{ field: "turnstile", message: "Verification challenge failed or expired." }]
      }),
      { status: 403, headers }
    );
  }

  // 5. Atomic Rate Limiting via D1 (Section 97: HMAC-SHA-256 IP, 5 submissions per 15 min)
  if (d1Db) {
    const keyHash = await hashIdentifier(rateLimitSecret, clientIp);
    const rateCheck = await checkRateLimit(d1Db, keyHash, 5, 900);

    if (!rateCheck.allowed) {
      headers.set("Retry-After", String(rateCheck.resetSeconds));
      return new Response(
        JSON.stringify({
          success: false,
          message: "Too many submission attempts were received from this connection. Please wait and try again later."
        }),
        { status: 429, headers }
      );
    }
  }

  // 6. Database Insertion (Parameterized bound queries)
  try {
    const repository = d1Db ? new D1ContactRepository(d1Db) : devFallbackRepo;
    await repository.insert(validation.data);

    // 7. Non-blocking Notification Dispatch (Section 103)
    const notifier = getContactNotifier(cfEnv as Record<string, string> | undefined);
    notifier.notify(validation.data).catch((notifyErr) => {
      console.error("[Notification] Non-blocking dispatch failed:", notifyErr instanceof Error ? notifyErr.message : "Unknown");
    });

    // 8. Success Response (Section 113: 200 JSON or 303 Redirect for non-JS form post)
    if (isFormSubmission) {
      return redirect("/contact/success", 303);
    }

    return new Response(
      JSON.stringify({
        success: true,
        redirectUrl: "/contact/success",
        submissionId: validation.data.id
      }),
      { status: 200, headers }
    );
  } catch (dbError) {
    console.error("[ContactAPI] Database insertion failure:", dbError instanceof Error ? dbError.message : "Unknown");
    return new Response(
      JSON.stringify({
        success: false,
        message: "We could not confirm that your inquiry was received. Please try again."
      }),
      { status: 500, headers }
    );
  }
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ error: "Method Not Allowed. Contact endpoint accepts POST only." }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
};
