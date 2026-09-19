export interface TurnstileVerifyResult {
  success: boolean;
  errorCodes?: string[];
  challengeTs?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  expectedHostname?: string,
  expectedAction?: string,
  remoteIp?: string
): Promise<TurnstileVerifyResult> {
  // If no token supplied, reject immediately
  if (!token || token.trim().length === 0) {
    return { success: false, errorCodes: ["missing-input-response"] };
  }

  // Handle local development with test keys
  if (secretKey === "1x0000000000000000000000000000000AA" && token === "XXXX.DUMMY.TOKEN.XXXX") {
    return { success: true, hostname: "localhost" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) {
      return { success: false, errorCodes: [`http-status-${response.status}`] };
    }

    const outcome = await response.json() as {
      success: boolean;
      "error-codes"?: string[];
      challenge_ts?: string;
      hostname?: string;
      action?: string;
      cdata?: string;
    };

    if (!outcome.success) {
      return {
        success: false,
        errorCodes: outcome["error-codes"] || ["verification-failed"]
      };
    }

    // Verify expected hostname if configured (prevents token reuse across domains)
    if (expectedHostname && expectedHostname !== "localhost" && outcome.hostname) {
      if (outcome.hostname.toLowerCase() !== expectedHostname.toLowerCase()) {
        return {
          success: false,
          errorCodes: ["hostname-mismatch"],
          hostname: outcome.hostname
        };
      }
    }

    // Verify expected action if configured
    if (expectedAction && outcome.action && outcome.action !== expectedAction) {
      return {
        success: false,
        errorCodes: ["action-mismatch"],
        action: outcome.action
      };
    }

    return {
      success: true,
      challengeTs: outcome.challenge_ts,
      hostname: outcome.hostname,
      action: outcome.action
    };
  } catch (err) {
    console.error("[Turnstile] Error communicating with siteverify API:", err instanceof Error ? err.message : "Unknown");
    return {
      success: false,
      errorCodes: ["internal-siteverify-error"]
    };
  }
}
