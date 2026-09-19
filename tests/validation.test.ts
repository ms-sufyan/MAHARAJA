import { describe, it, expect } from "vitest";
import { validateContactSubmission } from "../src/lib/validation";

describe("Server-Side Form Validation (Section 99 & 146)", () => {
  const validBasePayload = {
    name: "Jane Smith",
    email: "jane.smith@enterprise.com",
    service_interest: "crm",
    problem: "We currently spend 2 hours each day copying lead data from forms into spreadsheets.",
    company: "Acme Logistics",
    systems: "HubSpot, Google Sheets"
  };

  it("accepts a completely valid submission", () => {
    const result = validateContactSubmission(validBasePayload);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.data).toBeDefined();
    expect(result.data?.email).toBe("jane.smith@enterprise.com");
    expect(result.data?.status).toBe("new");
  });

  it("normalizes email to lowercase", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      email: "Jane.Smith@ENTERPRISE.COM"
    });
    expect(result.isValid).toBe(true);
    expect(result.data?.email).toBe("jane.smith@enterprise.com");
  });

  it("accepts valid Unicode non-English names without corruption", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      name: "Renée Müller-Åström 鈴木"
    });
    expect(result.isValid).toBe(true);
    expect(result.data?.name).toBe("Renée Müller-Åström 鈴木");
  });

  it("rejects blank or whitespace-only name", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      name: "   "
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "name",
      message: "Enter your name."
    });
  });

  it("rejects overlong names (> 120 chars)", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      name: "A".repeat(121)
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "name",
      message: "Name must be 120 characters or fewer."
    });
  });

  it("rejects invalid email formats", () => {
    const invalidEmails = ["notanemail", "test@", "@example.com", "user@.com"];
    for (const email of invalidEmails) {
      const result = validateContactSubmission({
        ...validBasePayload,
        email
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({
        field: "email",
        message: "Enter an email address in a valid format."
      });
    }
  });

  it("rejects overlong emails (> 254 chars)", () => {
    const longEmail = "a".repeat(245) + "@domain.com";
    const result = validateContactSubmission({
      ...validBasePayload,
      email: longEmail
    });
    expect(result.isValid).toBe(false);
  });

  it("rejects invalid service_interest enum", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      service_interest: "crypto_tokenomics"
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "service_interest",
      message: "Choose what you need help with."
    });
  });

  it("rejects too-short problem descriptions (< 10 chars)", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      problem: "Help me"
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "problem",
      message: "Describe the workflow or problem in at least 10 characters."
    });
  });

  it("rejects overlong problem descriptions (> 3000 chars)", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      problem: "x".repeat(3001)
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "problem",
      message: "Keep the description to 3,000 characters or fewer."
    });
  });

  it("rejects submission if anti-bot honeypot is populated", () => {
    const result = validateContactSubmission({
      ...validBasePayload,
      honeypot: "automated_spambot_content"
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContainEqual({
      field: "general",
      message: "Automated submission detected."
    });
  });

  it("stores HTML and SQL-like strings safely as plain text without execution", () => {
    const injectionString = `<script>alert('xss')</script> OR '1'='1' DROP TABLE users;`;
    const result = validateContactSubmission({
      ...validBasePayload,
      problem: injectionString
    });
    expect(result.isValid).toBe(true);
    expect(result.data?.problem).toBe(injectionString);
  });
});
