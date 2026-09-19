import { describe, it, expect } from "vitest";
import { hashIdentifier, checkRateLimit, type D1DatabaseLike } from "../src/lib/rateLimit";

describe("Rate Limiting & IP Hashing (Section 97)", () => {
  it("generates deterministic HMAC-SHA-256 hash from IP", async () => {
    const secret = "test_rate_secret_12345";
    const ip = "192.168.1.100";
    const hash1 = await hashIdentifier(secret, ip);
    const hash2 = await hashIdentifier(secret, ip);

    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // 256 bits = 64 hex chars
    expect(hash1).not.toContain("192.168.1.100"); // Zero raw IP leakage
  });

  it("produces different hashes for different secret keys", async () => {
    const ip = "10.0.0.1";
    const hashA = await hashIdentifier("secretA", ip);
    const hashB = await hashIdentifier("secretB", ip);
    expect(hashA).not.toBe(hashB);
  });

  it("enforces max attempts limit in mock database", async () => {
    const store = new Map<string, { count: number; expires_at: string }>();

    // Mock D1 implementation
    const mockDb: D1DatabaseLike = {
      prepare: (query: string) => ({
        bind: (...values: unknown[]) => ({
          run: async () => {
            if (query.includes("INSERT")) {
              store.set(values[0] as string, {
                count: Number(values[2]),
                expires_at: values[3] as string
              });
            } else if (query.includes("UPDATE") && query.includes("count + 1")) {
              const item = store.get(values[0] as string);
              if (item) item.count += 1;
            }
            return { success: true };
          },
          first: async <T>() => {
            const item = store.get(values[0] as string);
            return (item as T) || null;
          }
        })
      })
    };

    const keyHash = "mock_hashed_key_001";

    // Attempt 1: should be allowed (limit 3)
    const r1 = await checkRateLimit(mockDb, keyHash, 3, 60);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    // Attempt 2: allowed
    const r2 = await checkRateLimit(mockDb, keyHash, 3, 60);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);

    // Attempt 3: allowed
    const r3 = await checkRateLimit(mockDb, keyHash, 3, 60);
    expect(r3.allowed).toBe(true);
    expect(r3.remaining).toBe(0);

    // Attempt 4: blocked (exceeds limit)
    const r4 = await checkRateLimit(mockDb, keyHash, 3, 60);
    expect(r4.allowed).toBe(false);
    expect(r4.remaining).toBe(0);
  });
});
