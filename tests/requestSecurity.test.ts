import { describe, it, expect } from "vitest";
import { validateRequestSecurity } from "../src/lib/requestSecurity";

describe("Request Security & Origin Defenses (Section 98)", () => {
  const canonicalOrigin = "https://maharajasystems.com";

  it("rejects non-POST methods with 405", () => {
    const req = new Request("https://maharajasystems.com/api/contact", {
      method: "GET"
    });
    const result = validateRequestSecurity(req, canonicalOrigin);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(405);
  });

  it("rejects requests exceeding payload byte limit with 413", () => {
    const req = new Request("https://maharajasystems.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "40000" // > 32768 bytes
      }
    });
    const result = validateRequestSecurity(req, canonicalOrigin);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(413);
  });

  it("rejects cross-site state-changing requests using Sec-Fetch-Site with 403", () => {
    const req = new Request("https://maharajasystems.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "sec-fetch-site": "cross-site"
      }
    });
    const result = validateRequestSecurity(req, canonicalOrigin);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(403);
  });

  it("accepts same-origin requests with valid origin header", () => {
    const req = new Request("https://maharajasystems.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "sec-fetch-site": "same-origin",
        "origin": "https://maharajasystems.com"
      }
    });
    const result = validateRequestSecurity(req, canonicalOrigin);
    expect(result.allowed).toBe(true);
  });

  it("rejects untrusted external origin header with 403", () => {
    const req = new Request("https://maharajasystems.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "origin": "https://malicious-phishing-site.xyz"
      }
    });
    const result = validateRequestSecurity(req, canonicalOrigin);
    expect(result.allowed).toBe(false);
    expect(result.status).toBe(403);
  });
});
