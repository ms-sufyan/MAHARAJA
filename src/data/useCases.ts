export interface UseCase {
  slug: string;
  title: string;
  category: string[];
  problem: string;
  whenHelpful: string;
  flow: string[];
  humanControl: string;
  systemsInvolved: string[];
  relatedServices: { label: string; href: string }[];
  ctaText: string;
  ctaParam: string;
}

export const useCaseCategories = [
  { id: "all", label: "All" },
  { id: "leads", label: "Leads & sales" },
  { id: "operations", label: "Operations" },
  { id: "appointments", label: "Appointments" },
  { id: "finance", label: "Documents & finance" },
  { id: "reporting", label: "Data & reporting" },
  { id: "ai", label: "AI-assisted" }
];

export const useCases: UseCase[] = [
  {
    slug: "lead-capture-routing",
    title: "Lead capture and routing",
    category: ["leads", "operations"],
    problem: "New leads arrive through one system, while the sales process lives somewhere else. Staff spend time manually copying details and assigning owners.",
    whenHelpful: "Useful when inquiries arrive via forms, inbound emails, ad campaigns, or external platforms and need immediate, structured delivery into a CRM without manual copy-pasting.",
    flow: [
      "Lead source trigger",
      "Validate & format payload",
      "Create / update CRM record",
      "Apply routing rules (territory / capacity)",
      "Assign owner & send notification",
      "Trigger next scheduled action"
    ],
    humanControl: "Qualification, pricing negotiations, and the actual relationship conversation remain owned by the sales representative.",
    systemsInvolved: ["monday.com", "HubSpot", "GoHighLevel", "Typeform", "Zapier", "Make", "Slack"],
    relatedServices: [
      { label: "CRM Systems", href: "/services/crm" },
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    ctaText: "Discuss lead routing",
    ctaParam: "lead-routing"
  },
  {
    slug: "follow-up-sequences",
    title: "Follow-up sequences",
    category: ["leads", "operations"],
    problem: "The next outreach or check-in depends on someone's personal memory, inbox flags, or calendar reminders, leading to missed opportunities.",
    whenHelpful: "Useful when prospective or existing clients require disciplined multi-step communication based on deal stage, quote delivery, or response inactivity.",
    flow: [
      "Status or trigger event",
      "Evaluate conditions & exit criteria",
      "Wait until scheduled time window",
      "Create follow-up task or draft communication",
      "Record outcome in CRM",
      "Continue sequence or stop on customer reply"
    ],
    humanControl: "Any customer reply, deal status change, or manual intervention immediately halts the automated sequence.",
    systemsInvolved: ["HubSpot", "monday.com", "GoHighLevel", "Gmail", "Microsoft Outlook"],
    relatedServices: [
      { label: "CRM Systems", href: "/services/crm" },
      { label: "Workflow Automation", href: "/services/workflow-automation" }
    ],
    ctaText: "Discuss follow-up automation",
    ctaParam: "follow-up"
  },
  {
    slug: "appointment-reminders-lifecycle",
    title: "Appointment reminders and lifecycle",
    category: ["appointments", "operations"],
    problem: "Bookings occur in a scheduling tool, but confirming attendance, updating CRM records, and sending timely reminders is handled one event at a time.",
    whenHelpful: "Useful when consultations or service appointments need automatic CRM logging, multi-stage reminders, and structured reschedule or no-show paths.",
    flow: [
      "Booking event created",
      "Normalize contact & meeting metadata",
      "Update or create CRM deal record",
      "Send immediate confirmation with calendar invite",
      "Send scheduled pre-meeting reminders",
      "Record attendance or trigger reschedule flow"
    ],
    humanControl: "Complex calendar exceptions, VIP reschedules, and sensitive meeting notes remain directly managed by staff.",
    systemsInvolved: ["Calendly", "HubSpot", "GoHighLevel", "Google Calendar", "Microsoft Outlook"],
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    ctaText: "Discuss appointment automation",
    ctaParam: "appointments"
  },
  {
    slug: "document-generation-handoff",
    title: "Document generation and handoff",
    category: ["finance", "operations"],
    problem: "Information already stored in a CRM or database must be repeatedly copied into contracts, scopes, or proposals, then downloaded, renamed, and reattached.",
    whenHelpful: "Useful when proposals, statements of work, or work orders need to be populated directly from CRM fields and tracked through signing.",
    flow: [
      "Record status changed to 'Generate Document'",
      "Retrieve required CRM data fields",
      "Validate completeness of client & deal terms",
      "Populate document template dynamically",
      "Route for internal review or client signing",
      "Store final signed file & update originating record"
    ],
    humanControl: "Mandatory internal approval gates can be required before a generated document is finalized or dispatched to external parties.",
    systemsInvolved: ["PandaDoc", "HubSpot", "monday.com", "Google Drive", "Make"],
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    ctaText: "Discuss document automation",
    ctaParam: "documents"
  },
  {
    slug: "billing-payment-status-sync",
    title: "Billing and payment status synchronization",
    category: ["finance", "operations"],
    problem: "Payment, invoice, and operational CRM records are updated separately, resulting in sales teams chasing clients who have already paid or projects starting without confirmed retainers.",
    whenHelpful: "Useful when accounting events (invoices issued, payments cleared, refunds) need to reflect automatically inside operational project boards and sales pipelines.",
    flow: [
      "Payment or invoice event in financial gateway",
      "Match customer by unique reference key",
      "Verify transaction status & payment amount",
      "Update operational CRM deal or project stage",
      "Trigger onboarding task or notify account manager",
      "Route payment discrepancy to finance exception queue"
    ],
    humanControl: "Financial reconciliations, refund approvals, and disputed charges remain strictly under designated accounting personnel.",
    systemsInvolved: ["Stripe", "QuickBooks", "FreshBooks", "monday.com", "HubSpot"],
    relatedServices: [
      { label: "Integrations", href: "/services/integrations" },
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" }
    ],
    ctaText: "Discuss a billing workflow",
    ctaParam: "billing-sync"
  },
  {
    slug: "file-routing-storage-governance",
    title: "File routing and storage governance",
    category: ["operations", "finance"],
    problem: "Project files, receipts, and deliverables accumulate in disconnected inboxes and downloads folders without standardized folder hierarchies or links to CRM records.",
    whenHelpful: "Useful when operational documents need to be placed automatically into client-specific folder structures with consistent naming conventions.",
    flow: [
      "File uploaded or generated in workflow",
      "Extract entity context (client name, project code)",
      "Apply directory governance rule",
      "Create or identify target directory in cloud storage",
      "Move file and apply standardized naming format",
      "Write persistent file URI back to master CRM record"
    ],
    humanControl: "Access permissions, confidential document flags, and retention exemptions remain governed by organization administrators.",
    systemsInvolved: ["Google Drive", "monday.com", "Contractor Foreman", "Zapier"],
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    ctaText: "Discuss file governance",
    ctaParam: "file-governance"
  },
  {
    slug: "contact-record-synchronization",
    title: "Contact and record synchronization",
    category: ["reporting", "operations"],
    problem: "Customer contact details and status updates are modified in one department tool, while other business systems continue displaying obsolete information.",
    whenHelpful: "Useful when keeping contact details, company records, and communication histories unified across sales, support, and billing platforms.",
    flow: [
      "Record update event in source system",
      "Locate corresponding entity via deterministic matching key",
      "Perform field transformation & mapping",
      "Verify source-of-truth priority rules",
      "Update destination record payload",
      "Log synchronization audit trail"
    ],
    humanControl: "Conflicting updates (e.g. concurrent edits with different values) are flagged for human review rather than overwritten blindly.",
    systemsInvolved: ["HubSpot", "monday.com", "Zoho CRM", "Google Workspace", "Make"],
    relatedServices: [
      { label: "Integrations", href: "/services/integrations" },
      { label: "CRM Systems", href: "/services/crm" }
    ],
    ctaText: "Discuss data synchronization",
    ctaParam: "record-sync"
  },
  {
    slug: "user-access-provisioning",
    title: "User and access provisioning",
    category: ["operations"],
    problem: "New employee or contractor onboarding requires manually creating accounts, granting permissions, and assigning workspace folders across dozens of software tools.",
    whenHelpful: "Useful when HR or operational approvals need to trigger structured, repeatable workspace setups across internal communication and project management tools.",
    flow: [
      "Approved onboarding request logged",
      "Validate user profile and department role",
      "Evaluate role-based permission requirements",
      "Issue invitations or provision user accounts",
      "Assign default project boards and resource folders",
      "Notify team manager and record setup completion"
    ],
    humanControl: "Privileged security roles, multi-factor authentication setup, and final access verification remain under designated internal IT/operations staff.",
    systemsInvolved: ["Google Workspace", "JumpCloud", "Slack", "ClickUp", "monday.com"],
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    ctaText: "Discuss provisioning workflows",
    ctaParam: "provisioning"
  },
  {
    slug: "marketing-source-crm-handoff",
    title: "Marketing-source to CRM handoff",
    category: ["leads", "reporting"],
    problem: "Marketing campaigns drive traffic, but attribution parameters (UTMs, referring channels, form variants) are stripped before reaching the CRM deal record.",
    whenHelpful: "Useful when sales and marketing leadership require clear attribution data connected directly to qualified deals and closed accounts.",
    flow: [
      "Campaign form submission received",
      "Extract and preserve UTM & referrer parameters",
      "Map source tags to normalized CRM attribution fields",
      "Create or associate contact and deal records",
      "Assign lead stage based on engagement rules",
      "Expose attribution data in operational pipeline views"
    ],
    humanControl: "Lead qualification thresholds and sales rep assignment algorithms remain configurable by sales leadership.",
    systemsInvolved: ["HubSpot", "Marketo", "Typeform", "monday.com"],
    relatedServices: [
      { label: "CRM Systems", href: "/services/crm" },
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" }
    ],
    ctaText: "Discuss marketing handoffs",
    ctaParam: "marketing-handoff"
  },
  {
    slug: "ai-assisted-extraction-classification",
    title: "AI-assisted extraction and classification",
    category: ["ai", "operations"],
    problem: "High volumes of unstructured inbound text (vendor invoices, RFP notices, customer emails) require manual reading to identify key values and correct routing.",
    whenHelpful: "Useful when documents or emails follow variable formats but require specific fields (dates, amounts, line items, inquiry type) extracted into structured CRM properties.",
    flow: [
      "Unstructured file or text message received",
      "Sanitize input and isolate relevant content",
      "Execute structured extraction using strict JSON Schema",
      "Perform deterministic validation checks on parsed fields",
      "Evaluate confidence score against defined threshold",
      "Update database record or route low-confidence item to review"
    ],
    humanControl: "Ambiguous documents or extractions falling below required confidence levels are queued for staff review with the extracted values highlighted.",
    systemsInvolved: ["Google Workspace", "monday.com", "HubSpot", "Make"],
    relatedServices: [
      { label: "AI-Assisted Operations", href: "/services/ai-assisted-automation" },
      { label: "Workflow Automation", href: "/services/workflow-automation" }
    ],
    ctaText: "Discuss data extraction",
    ctaParam: "ai-extraction"
  },
  {
    slug: "ai-assisted-enrichment",
    title: "AI-assisted enrichment",
    category: ["ai", "leads"],
    problem: "Records lack context—such as company categorization, territory classification, or synthesized call summaries—requiring staff to research before acting.",
    whenHelpful: "Useful when a new CRM lead or customer ticket needs standardized enrichment (e.g. industry tagging, synthesized pain-point summary) before assignment.",
    flow: [
      "New record created in CRM",
      "Assemble approved contextual inputs",
      "Query enrichment model with constrained prompt boundaries",
      "Validate outputs against pre-defined taxonomy enums",
      "Write enriched tags and summary fields to record",
      "Notify assigned owner with prepared briefing"
    ],
    humanControl: "Staff can review, edit, or overwrite any generated tag or summary at any point in the record lifecycle.",
    systemsInvolved: ["HubSpot", "monday.com", "GoHighLevel"],
    relatedServices: [
      { label: "AI-Assisted Operations", href: "/services/ai-assisted-automation" },
      { label: "CRM Systems", href: "/services/crm" }
    ],
    ctaText: "Discuss record enrichment",
    ctaParam: "ai-enrichment"
  },
  {
    slug: "operational-reporting-visibility",
    title: "Operational reporting and exception visibility",
    category: ["reporting", "operations"],
    problem: "Managers cannot quickly determine where client deliverables are stalled, which tasks are overdue, or where automated handoffs failed.",
    whenHelpful: "Useful when leadership needs clear visibility into stage velocity, workflow execution histories, and immediate alerting on operational bottlenecks.",
    flow: [
      "Workflow actions log timestamps and status states",
      "Aggregate execution events across tools",
      "Check against expected service thresholds",
      "Compile real-time operational status views",
      "Generate automated daily/weekly summary alerts",
      "Route stuck records to designated review queues"
    ],
    humanControl: "Setting operational thresholds, resolving exception queues, and addressing team bottlenecks remain human management responsibilities.",
    systemsInvolved: ["monday.com", "HubSpot", "Google Sheets", "Slack"],
    relatedServices: [
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" },
      { label: "CRM Systems", href: "/services/crm" }
    ],
    ctaText: "Discuss operational visibility",
    ctaParam: "operational-reporting"
  }
];
