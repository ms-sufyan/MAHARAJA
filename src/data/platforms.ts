export interface Platform {
  name: string;
  category: string;
  verifiedExperience: boolean;
  highlight?: boolean; // Highlighted on early homepage proof strip
}

export interface PlatformGroup {
  category: string;
  description: string;
  platforms: Platform[];
}

export const platforms: Platform[] = [
  // CRM & operations
  { name: "monday.com", category: "CRM & operations", verifiedExperience: true, highlight: true },
  { name: "HubSpot", category: "CRM & operations", verifiedExperience: true, highlight: true },
  { name: "GoHighLevel", category: "CRM & operations", verifiedExperience: true, highlight: true },
  { name: "ClickUp", category: "CRM & operations", verifiedExperience: true },
  { name: "Zoho CRM", category: "CRM & operations", verifiedExperience: true },
  { name: "Contractor Foreman", category: "CRM & operations", verifiedExperience: true },

  // Automation & orchestration
  { name: "Zapier", category: "Automation & orchestration", verifiedExperience: true, highlight: true },
  { name: "Make", category: "Automation & orchestration", verifiedExperience: true, highlight: true },

  // Productivity & communication
  { name: "Google Workspace", category: "Productivity & communication", verifiedExperience: true, highlight: true },
  { name: "Gmail", category: "Productivity & communication", verifiedExperience: true },
  { name: "Google Sheets", category: "Productivity & communication", verifiedExperience: true },
  { name: "Google Drive", category: "Productivity & communication", verifiedExperience: true },
  { name: "Microsoft Excel", category: "Productivity & communication", verifiedExperience: true },
  { name: "Microsoft Outlook", category: "Productivity & communication", verifiedExperience: true },
  { name: "Slack", category: "Productivity & communication", verifiedExperience: true },
  { name: "JustCall", category: "Productivity & communication", verifiedExperience: true },

  // Forms, scheduling & lifecycle
  { name: "Typeform", category: "Forms, scheduling & lifecycle", verifiedExperience: true },
  { name: "Calendly", category: "Forms, scheduling & lifecycle", verifiedExperience: true },
  { name: "Marketo", category: "Forms, scheduling & lifecycle", verifiedExperience: true },

  // Documents, finance & access
  { name: "PandaDoc", category: "Documents, finance & access", verifiedExperience: true },
  { name: "QuickBooks", category: "Documents, finance & access", verifiedExperience: true, highlight: true },
  { name: "Stripe", category: "Documents, finance & access", verifiedExperience: true, highlight: true },
  { name: "FreshBooks", category: "Documents, finance & access", verifiedExperience: true },
  { name: "JumpCloud", category: "Documents, finance & access", verifiedExperience: true }
];

export const platformGroups: PlatformGroup[] = [
  {
    category: "CRM & operations",
    description: "Core record pipelines, contact lifecycle state, deal progression, and task assignment.",
    platforms: platforms.filter(p => p.category === "CRM & operations")
  },
  {
    category: "Automation & orchestration",
    description: "Multi-branch workflow logic, condition routing, webhook dispatch, and payload transformation.",
    platforms: platforms.filter(p => p.category === "Automation & orchestration")
  },
  {
    category: "Productivity & communication",
    description: "Spreadsheets, cloud storage, messaging alerts, and email sync.",
    platforms: platforms.filter(p => p.category === "Productivity & communication")
  },
  {
    category: "Forms, scheduling & lifecycle",
    description: "Inbound capture, appointment scheduling, and automated nurture sequences.",
    platforms: platforms.filter(p => p.category === "Forms, scheduling & lifecycle")
  },
  {
    category: "Documents, finance & access",
    description: "Document population, signature routing, payment events, and access provisioning.",
    platforms: platforms.filter(p => p.category === "Documents, finance & access")
  }
];

export const proofStripPlatforms = platforms.filter(p => p.highlight);
