export const VALID_SERVICE_INTERESTS = [
  "crm",
  "workflow-automation",
  "integrations",
  "ai-assisted-automation",
  "reporting-visibility",
  "custom"
] as const;

export type ServiceInterest = typeof VALID_SERVICE_INTERESTS[number];

export const SERVICE_INTEREST_LABELS: Record<ServiceInterest, string> = {
  "crm": "CRM setup or optimization",
  "workflow-automation": "Workflow automation",
  "integrations": "Systems integration / data sync",
  "ai-assisted-automation": "AI-assisted automation",
  "reporting-visibility": "Reporting / operational visibility",
  "custom": "Not sure / custom problem"
};

export interface ContactInput {
  name: string;
  email: string;
  service_interest: string;
  problem: string;
  company?: string;
  systems?: string;
  source_path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  honeypot?: string;
  turnstile_token?: string;
}

export interface ValidatedContactData {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  service_interest: ServiceInterest;
  systems: string | null;
  problem: string;
  source_path: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  privacy_notice_version: string;
  status: "new";
}

export interface ValidationErrorItem {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrorItem[];
  data?: ValidatedContactData;
}

// RFC 5322 pragmatic email regex that allows international & subdomain emails without overzealous blocking
const PRAGMATIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactSubmission(
  rawInput: Record<string, unknown>,
  privacyVersion: string = "v1.0"
): ValidationResult {
  const errors: ValidationErrorItem[] = [];

  // Honeypot check (anti-bot trap)
  const honeypot = typeof rawInput.honeypot === "string" ? rawInput.honeypot.trim() : "";
  if (honeypot.length > 0) {
    return {
      isValid: false,
      errors: [{ field: "general", message: "Automated submission detected." }]
    };
  }

  // 1. Name validation
  const rawName = typeof rawInput.name === "string" ? rawInput.name.trim() : "";
  if (!rawName || rawName.length === 0) {
    errors.push({ field: "name", message: "Enter your name." });
  } else if (rawName.length > 120) {
    errors.push({ field: "name", message: "Name must be 120 characters or fewer." });
  }

  // 2. Email validation
  const rawEmail = typeof rawInput.email === "string" ? rawInput.email.trim() : "";
  if (!rawEmail || rawEmail.length === 0) {
    errors.push({ field: "email", message: "Enter an email address in a valid format." });
  } else if (rawEmail.length > 254) {
    errors.push({ field: "email", message: "Email address must be 254 characters or fewer." });
  } else if (!PRAGMATIC_EMAIL_REGEX.test(rawEmail)) {
    errors.push({ field: "email", message: "Enter an email address in a valid format." });
  }

  // 3. Service Interest validation
  const rawService = typeof rawInput.service_interest === "string" ? rawInput.service_interest.trim() : "";
  if (!rawService || !VALID_SERVICE_INTERESTS.includes(rawService as ServiceInterest)) {
    errors.push({ field: "service_interest", message: "Choose what you need help with." });
  }

  // 4. Problem description validation
  const rawProblem = typeof rawInput.problem === "string" ? rawInput.problem.trim() : "";
  if (!rawProblem || rawProblem.length < 10) {
    errors.push({ field: "problem", message: "Describe the workflow or problem in at least 10 characters." });
  } else if (rawProblem.length > 3000) {
    errors.push({ field: "problem", message: "Keep the description to 3,000 characters or fewer." });
  }

  // 5. Company (optional)
  const rawCompany = typeof rawInput.company === "string" ? rawInput.company.trim() : "";
  if (rawCompany.length > 160) {
    errors.push({ field: "company", message: "Company name must be 160 characters or fewer." });
  }

  // 6. Systems (optional)
  const rawSystems = typeof rawInput.systems === "string" ? rawInput.systems.trim() : "";
  if (rawSystems.length > 500) {
    errors.push({ field: "systems", message: "Systems description must be 500 characters or fewer." });
  }

  // 7. Source Path & UTMs (sanitized, server-governed)
  const sourcePath = typeof rawInput.source_path === "string" && rawInput.source_path.startsWith("/") 
    ? rawInput.source_path.slice(0, 250) 
    : "/contact";

  const utmSource = typeof rawInput.utm_source === "string" && rawInput.utm_source.length > 0
    ? rawInput.utm_source.trim().slice(0, 100)
    : null;

  const utmMedium = typeof rawInput.utm_medium === "string" && rawInput.utm_medium.length > 0
    ? rawInput.utm_medium.trim().slice(0, 100)
    : null;

  const utmCampaign = typeof rawInput.utm_campaign === "string" && rawInput.utm_campaign.length > 0
    ? rawInput.utm_campaign.trim().slice(0, 100)
    : null;

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Data normalization: lowercase email, strip raw tags from plain text
  const cleanData: ValidatedContactData = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    name: rawName,
    email: rawEmail.toLowerCase(),
    company: rawCompany.length > 0 ? rawCompany : null,
    service_interest: rawService as ServiceInterest,
    systems: rawSystems.length > 0 ? rawSystems : null,
    problem: rawProblem,
    source_path: sourcePath,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    privacy_notice_version: privacyVersion,
    status: "new"
  };

  return { isValid: true, errors: [], data: cleanData };
}
