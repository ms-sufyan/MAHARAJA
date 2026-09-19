export interface ImplementationPattern {
  slug: string;
  title: string;
  shortTitle: string;
  situation: string;
  flowSteps: string[];
  considerations: string[];
  humanControl: string;
  relatedServices: { label: string; href: string }[];
  technicalTopics: string[];
  highlightOnHome?: boolean;
}

export const implementationPatterns: ImplementationPattern[] = [
  {
    slug: "lead-handoff",
    title: "Lead handoff and cross-system dispatch",
    shortTitle: "Lead handoff",
    highlightOnHome: true,
    situation: "Useful when a qualified record needs to move from one system to another without repeated manual entry or dropped information.",
    flowSteps: [
      "Source lead event",
      "Validate schema & format fields",
      "Deduplicate & match contact",
      "Create / update destination record",
      "Apply territory / capacity route",
      "Update source state with confirmation ID"
    ],
    considerations: [
      "Primary record matching key (email or normalized phone)",
      "Conflict handling when lead exists in destination",
      "Two-way status reflection without circular loops",
      "Rate limits on destination CRM APIs",
      "Exception alert when payload fails required fields"
    ],
    humanControl: "Lead qualification thresholds and initial outbound outreach remain under sales representative judgment.",
    relatedServices: [
      { label: "CRM Systems", href: "/services/crm" },
      { label: "Workflow Automation", href: "/services/workflow-automation" }
    ],
    technicalTopics: [
      "Payload normalization",
      "Unique contact identifiers",
      "Webhook idempotency keys",
      "State-machine transitions"
    ]
  },
  {
    slug: "document-generation",
    title: "Document generation and record update",
    shortTitle: "Document flow",
    highlightOnHome: true,
    situation: "Useful where business data repeatedly becomes a document or file that must remain connected to the original record.",
    flowSteps: [
      "Record trigger event",
      "Retrieve data fields from CRM",
      "Validate required legal & pricing terms",
      "Generate dynamic document template",
      "Apply approval or signature route",
      "Store signed file in cloud storage",
      "Return persistent document link to CRM record"
    ],
    considerations: [
      "Dynamic template version management",
      "Standardized file naming conventions (e.g. [Client]_[Scope]_[Date])",
      "Handling signature webhook callbacks reliably",
      "Storage path directory governance",
      "Graceful error handling when template fields are missing"
    ],
    humanControl: "Insert mandatory internal approval gate before a document is dispatched externally.",
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    technicalTopics: [
      "Template token mapping",
      "Webhook signature validation",
      "Cloud storage permission boundaries",
      "Idempotent PDF generation"
    ]
  },
  {
    slug: "billing-status-flow",
    title: "Billing and payment status reconciliation",
    shortTitle: "Billing status flow",
    highlightOnHome: true,
    situation: "Useful where financial events need to be reflected in an operational CRM or project system without manual accounting re-entry.",
    flowSteps: [
      "Payment gateway webhook received",
      "Identify customer by customer ID / email",
      "Evaluate transaction status (cleared / failed / refunded)",
      "Update operational CRM stage or project status",
      "Trigger client onboarding or project activation",
      "Route discrepancy or failure to finance queue"
    ],
    considerations: [
      "Reconciliation between gateway transaction ID and internal invoice ID",
      "Secure webhook signature verification to prevent spoofing",
      "Handling partial payments, retries, and chargebacks",
      "Non-disclosure of full credit card data in operational records",
      "Idempotency to prevent duplicate credit creation"
    ],
    humanControl: "Financial reconciliations, refund decisions, and customer account suspension remain under authorized staff control.",
    relatedServices: [
      { label: "Integrations", href: "/services/integrations" },
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" }
    ],
    technicalTopics: [
      "Webhook HMAC signature verification",
      "Idempotency tokens",
      "Zero cardholder data storage (PCI compliance)",
      "State-transition reconciliation"
    ]
  },
  {
    slug: "file-governance",
    title: "Governed file storage and metadata routing",
    shortTitle: "File governance",
    highlightOnHome: true,
    situation: "Useful where operational files need predictable storage, consistent folder structure, and a traceable relationship to the business record.",
    flowSteps: [
      "File created or attached to workflow",
      "Extract entity metadata (client code, category, date)",
      "Evaluate folder taxonomy rule",
      "Provision client folder if not already existing",
      "Transfer file to governed storage destination",
      "Apply strict view/edit permission policies",
      "Update originating CRM record with persistent URI"
    ],
    considerations: [
      "Directory hierarchy consistency across accounts",
      "Standardized file naming syntax",
      "Access control boundaries and sharing permissions",
      "Deduplication when identical files are re-uploaded",
      "Handling storage quota and rate limits"
    ],
    humanControl: "Folder access overrides and document retention exemptions remain under administrator governance.",
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    technicalTopics: [
      "Metadata taxonomy enforcement",
      "Cloud storage API directory traversal",
      "Access control list (ACL) inheritance",
      "File hash integrity validation"
    ]
  },
  {
    slug: "lifecycle-follow-up",
    title: "Lifecycle follow-up and engagement sequence",
    shortTitle: "Lifecycle follow-up",
    situation: "Useful when prospects or active clients need structured, time-delayed check-ins linked directly to pipeline state.",
    flowSteps: [
      "Deal or ticket stage transition",
      "Evaluate eligibility and quiet hours",
      "Wait defined delay interval (e.g. 3 business days)",
      "Verify no recent incoming customer communication",
      "Create personalized follow-up task or draft email",
      "Log activity in CRM and advance or terminate sequence"
    ],
    considerations: [
      "Exit criteria evaluation at every stage",
      "Business-hours and time-zone calculation logic",
      "Suppression lists and unsubscribed status respect",
      "Sales rep notification before automated messages send"
    ],
    humanControl: "Any customer response immediately detaches the contact from automated sequence.",
    relatedServices: [
      { label: "CRM Systems", href: "/services/crm" },
      { label: "Workflow Automation", href: "/services/workflow-automation" }
    ],
    technicalTopics: [
      "Temporal workflow delays",
      "State polling vs event interrupts",
      "Time-zone normalization",
      "Activity logging APIs"
    ]
  },
  {
    slug: "calendar-event-routing",
    title: "Calendar scheduling and attendance routing",
    shortTitle: "Calendar routing",
    situation: "Useful when booking events need to trigger immediate CRM logging, prep task assignments, and post-call follow-ups.",
    flowSteps: [
      "Meeting scheduled via scheduling link",
      "Normalize invitee details and meeting type",
      "Match or create contact and deal in CRM",
      "Create calendar event with video conference link",
      "Send reminder sequence leading to call",
      "Trigger post-meeting task for notes and outcome"
    ],
    considerations: [
      "Handling reschedules and cancellations cleanly",
      "Assigning host round-robin based on rep availability",
      "Preventing duplicate deal creation on re-bookings",
      "Passing qualification questions to CRM properties"
    ],
    humanControl: "Complex rescheduling negotiations and meeting outcome notes remain handled by the consultant.",
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    technicalTopics: [
      "Calendar API event reconciliation",
      "Webhook event state handling",
      "Contact property mapping"
    ]
  },
  {
    slug: "internal-provisioning",
    title: "Internal user and workspace provisioning",
    shortTitle: "Internal provisioning",
    situation: "Useful when new personnel or contractors require standardized workspace setups across internal tools upon management approval.",
    flowSteps: [
      "Manager submits onboarding request",
      "Validate user credentials & department role",
      "Query role-based permission matrix",
      "Create accounts in communications & project tools",
      "Assign appropriate department channels and boards",
      "Generate setup checklist and notify supervisor"
    ],
    considerations: [
      "Least-privilege access enforcement",
      "Audit trail of granted permissions",
      "Deprovisioning / offboarding reverse flow capability",
      "Handling license capacity limits on SaaS tools"
    ],
    humanControl: "Privileged administrator credentials and multi-factor authentication setup require direct IT verification.",
    relatedServices: [
      { label: "Workflow Automation", href: "/services/workflow-automation" },
      { label: "Integrations", href: "/services/integrations" }
    ],
    technicalTopics: [
      "Role-based access control (RBAC)",
      "SCIM / directory sync patterns",
      "Idempotent invitation dispatches"
    ]
  },
  {
    slug: "lead-import-processing",
    title: "Structured data batch import and validation",
    shortTitle: "Data import processing",
    situation: "Useful when batches of records from events, partner lists, or external databases need cleaning and deduplication before CRM insertion.",
    flowSteps: [
      "Batch dataset uploaded (CSV / API payload)",
      "Sanitize field formats (phone, email, postal)",
      "Run deduplication against existing database records",
      "Validate required properties and drop corrupt rows",
      "Batch-insert clean records via rate-limited API",
      "Generate exception report for flagged rows"
    ],
    considerations: [
      "Rate-limit management and batch sizing",
      "Fuzzy matching logic vs deterministic email lookup",
      "Logging corrupted rows with clear remediation reasons",
      "Preserving original source tags for marketing attribution"
    ],
    humanControl: "Flagged duplicate candidates and invalid records are reviewed by a data steward prior to insertion.",
    relatedServices: [
      { label: "Integrations", href: "/services/integrations" },
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" }
    ],
    technicalTopics: [
      "Batch processing algorithms",
      "Data sanitation and regex normalization",
      "Database upsert operations",
      "Audit report generation"
    ]
  },
  {
    slug: "ai-assisted-processing",
    title: "AI-assisted extraction and schema validation",
    shortTitle: "AI processing",
    situation: "Useful when unstructured inquiries, quotes, or emails contain key business fields that need parsing into structured database records.",
    flowSteps: [
      "Unstructured text received from form or email",
      "Extract relevant text body & strip sensitive PII",
      "Query language model with strict JSON Schema output",
      "Validate returned payload against TypeScript schema",
      "Check model confidence score against threshold",
      "Write fields to CRM or route to review queue"
    ],
    considerations: [
      "Deterministic schema validation (rejecting malformed JSON)",
      "Strict data minimization before sending context to model",
      "Fallback to human review when confidence is low",
      "Monitoring model latency and cost metrics"
    ],
    humanControl: "All low-confidence extractions and critical business decisions require human confirmation.",
    relatedServices: [
      { label: "AI-Assisted Operations", href: "/services/ai-assisted-automation" },
      { label: "Workflow Automation", href: "/services/workflow-automation" }
    ],
    technicalTopics: [
      "JSON Schema validation",
      "Confidence thresholding",
      "Zero data retention API agreements",
      "Deterministic fallback queues"
    ]
  },
  {
    slug: "operational-reporting",
    title: "Operational pipeline reporting and exception feed",
    shortTitle: "Operational reporting",
    situation: "Useful when leadership needs clear visibility into stage velocity, overdue tasks, and workflow exceptions across platforms.",
    flowSteps: [
      "Record system events and stage timestamp updates",
      "Normalize event data into consistent schema",
      "Calculate operational metrics (velocity, bottleneck count)",
      "Update operational dashboard views",
      "Dispatch daily digest of stalled deals to managers",
      "Alert on any unhandled workflow exception immediately"
    ],
    considerations: [
      "Avoiding dashboard clutter by focusing on actionable metrics",
      "Ensuring underlying field consistency across records",
      "Providing drill-down capability into individual exceptions",
      "Decoupling reporting reads from operational transactional databases"
    ],
    humanControl: "Operational decisions, capacity reallocations, and policy adjustments remain human leadership responsibilities.",
    relatedServices: [
      { label: "Reporting & Visibility", href: "/services/reporting-visibility" },
      { label: "CRM Systems", href: "/services/crm" }
    ],
    technicalTopics: [
      "Event aggregation pipelines",
      "Timestamp difference calculations",
      "Alert throttling and digest batching",
      "Read-replica / cache isolation"
    ]
  }
];
