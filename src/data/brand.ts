/**
 * Central Brand and Organization Configuration
 * 
 * In accordance with the Business Claim Governance (Section 5) and Brand Configuration (Section 130),
 * values that require verified legal/business details remain null/unset by default.
 * Optional content disappears cleanly from the public UI without rendering placeholders or broken layout.
 */

export interface FounderTeamMember {
  name: string;
  role: string;
  biography: string;
  headshotUrl?: string;
  verifiedLinks?: { label: string; url: string }[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface BrandConfig {
  companyName: string;
  shortName: string;
  tagline: string;
  canonicalOrigin: string;
  logo: string | null;
  favicon: string | null;

  // Contact & Booking (optional)
  contactEmail: string | null;
  contactPhone: string | null;
  bookingUrl: string | null;

  // Team & Social (optional)
  founderTeamContent: FounderTeamMember[] | null;
  socialLinks: SocialLink[];

  // Legal & Compliance (required for production release gate)
  legalEntity: string | null;
  businessLocation: string | null;
  privacyContactEmail: string | null;
  governingLaw: string | null;
  dataRetentionDays: number;

  // Scope & Pricing Guidance (optional)
  pricingGuidance: {
    minimumEngagement?: string;
    scopingModel: string;
  } | null;
}

export const brand: BrandConfig = {
  companyName: "MAHARAJA",
  shortName: "MAHARAJA",
  tagline: "CRM, Workflow Automation & Systems Integration",
  canonicalOrigin: "https://maharajasystems.com",
  logo: null, // Renders typographic wordmark fallback if null
  favicon: null, // Uses neutral SVG monogram fallback if null

  contactEmail: null,
  contactPhone: null,
  bookingUrl: null, // If configured, secondary booking options activate safely

  founderTeamContent: null, // Only rendered when verified details are supplied
  socialLinks: [],

  legalEntity: null,
  businessLocation: null,
  privacyContactEmail: null,
  governingLaw: null,
  dataRetentionDays: 90,

  pricingGuidance: null
};
