export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Derives an HMAC-SHA-256 hash of the IP address using the secret key.
 * Ensures the raw IP address is NEVER stored or logged.
 */
export async function hashIdentifier(secret: string, identifier: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret || "fallback_default_dev_secret_key"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(identifier.trim().toLowerCase()));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export interface D1DatabaseLike {
  prepare(query: string): {
    bind(...values: unknown[]): {
      run(): Promise<{ success: boolean; meta?: unknown }>;
      first<T = unknown>(): Promise<T | null>;
    };
  };
}

/**
 * Evaluates and applies atomic rate limiting in Cloudflare D1.
 * Policy: maxAttempts (default 5) per windowMs (default 15 minutes = 900,000ms).
 */
export async function checkRateLimit(
  db: D1DatabaseLike,
  keyHash: string,
  maxAttempts: number = 5,
  windowSeconds: number = 900
): Promise<RateLimitResult> {
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresIso = new Date(now.getTime() + windowSeconds * 1000).toISOString();

  try {
    // 1. Check existing record
    const existing = await db
      .prepare("SELECT count, expires_at FROM submission_rate_limits WHERE key_hash = ?")
      .bind(keyHash)
      .first<{ count: number; expires_at: string }>();

    if (!existing) {
      // First attempt in window: insert new row
      await db
        .prepare("INSERT INTO submission_rate_limits (key_hash, window_started_at, count, expires_at) VALUES (?, ?, ?, ?)")
        .bind(keyHash, nowIso, 1, expiresIso)
        .run();

      return {
        allowed: true,
        limit: maxAttempts,
        remaining: maxAttempts - 1,
        resetSeconds: windowSeconds
      };
    }

    const expiresAt = new Date(existing.expires_at).getTime();
    const isExpired = now.getTime() > expiresAt;

    if (isExpired) {
      // Window has elapsed: reset window
      await db
        .prepare("UPDATE submission_rate_limits SET window_started_at = ?, count = 1, expires_at = ? WHERE key_hash = ?")
        .bind(nowIso, expiresIso, keyHash)
        .run();

      return {
        allowed: true,
        limit: maxAttempts,
        remaining: maxAttempts - 1,
        resetSeconds: windowSeconds
      };
    }

    // Active window: increment count atomically
    const newCount = existing.count + 1;
    const remainingSeconds = Math.max(1, Math.round((expiresAt - now.getTime()) / 1000));

    if (newCount > maxAttempts) {
      // Over limit
      return {
        allowed: false,
        limit: maxAttempts,
        remaining: 0,
        resetSeconds: remainingSeconds
      };
    }

    await db
      .prepare("UPDATE submission_rate_limits SET count = count + 1 WHERE key_hash = ?")
      .bind(keyHash)
      .run();

    return {
      allowed: true,
      limit: maxAttempts,
      remaining: maxAttempts - newCount,
      resetSeconds: remainingSeconds
    };
  } catch (error) {
    // Graceful degradation: in case of transient DB failure, permit request but log generic error
    console.error("[RateLimit] Transient rate-limit check failure:", error instanceof Error ? error.message : "Unknown");
    return {
      allowed: true,
      limit: maxAttempts,
      remaining: 1,
      resetSeconds: windowSeconds
    };
  }
}
