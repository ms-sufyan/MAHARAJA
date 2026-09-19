import { brand } from "../data/brand";

export interface ProductionCheckItem {
  key: string;
  label: string;
  isConfigured: boolean;
  isRequiredForProd: boolean;
  valueDescription?: string;
}

export interface ProductionGateResult {
  readyForProduction: boolean;
  missingRequired: string[];
  warnings: string[];
  items: ProductionCheckItem[];
}

export function evaluateProductionGate(env: Record<string, string | undefined> = {}): ProductionGateResult {
  const missingRequired: string[] = [];
  const warnings: string[] = [];

  const items: ProductionCheckItem[] = [
    {
      key: "COMPANY_NAME",
      label: "Company Name",
      isConfigured: Boolean(brand.companyName && brand.companyName !== "[COMPANY NAME]"),
      isRequiredForProd: true,
      valueDescription: brand.companyName
    },
    {
      key: "CANONICAL_ORIGIN",
      label: "Canonical Origin",
      isConfigured: Boolean(brand.canonicalOrigin && brand.canonicalOrigin.startsWith("https://") && !brand.canonicalOrigin.includes("[")),
      isRequiredForProd: true,
      valueDescription: brand.canonicalOrigin
    },
    {
      key: "LEGAL_ENTITY_NAME",
      label: "Legal Entity Name",
      isConfigured: Boolean(brand.legalEntity && brand.legalEntity.length > 0),
      isRequiredForProd: true,
      valueDescription: brand.legalEntity || "Not configured"
    },
    {
      key: "PRIVACY_CONTACT_EMAIL",
      label: "Privacy Contact Email",
      isConfigured: Boolean(brand.privacyContactEmail && brand.privacyContactEmail.includes("@")),
      isRequiredForProd: true,
      valueDescription: brand.privacyContactEmail || "Not configured"
    },
    {
      key: "GOVERNING_LAW",
      label: "Governing Law / Jurisdiction",
      isConfigured: Boolean(brand.governingLaw && brand.governingLaw.length > 0),
      isRequiredForProd: true,
      valueDescription: brand.governingLaw || "Not configured"
    },
    {
      key: "DATA_RETENTION_DAYS",
      label: "Data Retention Policy (Days)",
      isConfigured: Boolean(brand.dataRetentionDays && brand.dataRetentionDays > 0),
      isRequiredForProd: true,
      valueDescription: `${brand.dataRetentionDays} days`
    },
    {
      key: "PUBLIC_TURNSTILE_SITE_KEY",
      label: "Turnstile Site Key",
      isConfigured: Boolean(env.PUBLIC_TURNSTILE_SITE_KEY && !env.PUBLIC_TURNSTILE_SITE_KEY.startsWith("1x00000")),
      isRequiredForProd: false, // In development/staging, test keys are valid
      valueDescription: env.PUBLIC_TURNSTILE_SITE_KEY ? "Configured" : "Using test key"
    },
    {
      key: "TURNSTILE_SECRET_KEY",
      label: "Turnstile Secret Key",
      isConfigured: Boolean(env.TURNSTILE_SECRET_KEY && !env.TURNSTILE_SECRET_KEY.startsWith("1x00000")),
      isRequiredForProd: false,
      valueDescription: env.TURNSTILE_SECRET_KEY ? "Configured" : "Using test key"
    },
    // Optional checks (informational warnings only)
    {
      key: "BOOKING_URL",
      label: "Direct Booking Link",
      isConfigured: Boolean(brand.bookingUrl),
      isRequiredForProd: false,
      valueDescription: brand.bookingUrl ? "Enabled" : "Disabled (cleanly hidden)"
    },
    {
      key: "CONTACT_EMAIL",
      label: "Public Inbound Email",
      isConfigured: Boolean(brand.contactEmail),
      isRequiredForProd: false,
      valueDescription: brand.contactEmail || "Disabled (form only)"
    }
  ];

  for (const item of items) {
    if (item.isRequiredForProd && !item.isConfigured) {
      missingRequired.push(item.label);
    }
  }

  return {
    readyForProduction: missingRequired.length === 0,
    missingRequired,
    warnings,
    items
  };
}
