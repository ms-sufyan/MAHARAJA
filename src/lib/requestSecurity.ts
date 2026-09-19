export interface SecurityValidationResult {
  allowed: boolean;
  status?: number;
  reason?: string;
}

/**
 * Validates request metadata to protect against cross-site request forgery and abuse:
 * - Sec-Fetch-Site must not be 'cross-site'
 * - Origin header (if present) must match canonical origin or localhost in dev
 * - Payload size must not exceed maximum limit (default 32KB)
 */
export function validateRequestSecurity(
  request: Request,
  canonicalOrigin?: string,
  maxBodyBytes: number = 32768
): SecurityValidationResult {
  // 1. Method check
  if (request.method !== "POST") {
    return {
      allowed: false,
      status: 405,
      reason: "Method Not Allowed. Contact submissions accept POST only."
    };
  }

  // 2. Body size check (Content-Length header)
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (!isNaN(contentLength) && contentLength > maxBodyBytes) {
      return {
        allowed: false,
        status: 413,
        reason: `Payload Too Large. Maximum allowed size is ${maxBodyBytes} bytes.`
      };
    }
  }

  // 3. Content-Type check
  const contentType = request.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const isForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
  if (!isJson && !isForm) {
    return {
      allowed: false,
      status: 415,
      reason: "Unsupported Media Type. Accept application/json or form submissions."
    };
  }

  // 4. Sec-Fetch-Site check (Modern browser Fetch Metadata)
  const secFetchSite = request.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return {
      allowed: false,
      status: 403,
      reason: "Forbidden. Cross-site state-changing requests are rejected."
    };
  }

  // 5. Origin check against canonical origin
  const origin = request.headers.get("origin");
  if (origin && canonicalOrigin) {
    try {
      const originUrl = new URL(origin);
      const canonicalUrl = new URL(canonicalOrigin);

      const isDev = originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1";
      const isMatch = originUrl.origin.toLowerCase() === canonicalUrl.origin.toLowerCase();

      if (!isMatch && !isDev) {
        return {
          allowed: false,
          status: 403,
          reason: "Forbidden. Origin does not match canonical site origin."
        };
      }
    } catch {
      return {
        allowed: false,
        status: 400,
        reason: "Bad Request. Malformed origin header."
      };
    }
  }

  return { allowed: true };
}
