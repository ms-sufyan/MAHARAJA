export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  h1: string;
  subheadline: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
  bentoCols: string;
  problems: string[];
  capabilities: string[];
  useCases: string[];
  technicalTopics: string[];
  symptoms?: string[];
  implementationStructure?: {
    structure: string[];
    workflow: string[];
    visibility: string[];
  };
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "crm",
    title: "CRM Systems & Workflow Optimization",
    shortTitle: "CRM Systems",
    eyebrow: "CRM SYSTEMS",
    h1: "Make the CRM reflect how work actually moves.",
    subheadline: "Structure records, stages, ownership and follow-up so the CRM supports the process instead of becoming another place the team has to update manually.",
    summary: "Structure pipelines, statuses, ownership, follow-up and reporting around the way the business actually operates.",
    ctaLabel: "Discuss your CRM workflow",
    ctaHref: "/contact?service=crm",
    bentoCols: "lg:col-span-6",
    problems: [
      "Our CRM does not reflect how the team works.",
      "Leads sit unassigned or fall through gaps without clear lifecycle ownership.",
      "Meeting outcomes and deal progress are not reliably tracked in the system."
    ],
    capabilities: [
      "Pipeline and lifecycle structure",
      "Fields and record relationships",
      "Ownership and follow-up logic",
      "CRM-connected workflows"
    ],
    useCases: [
      "Lead capture and routing",
      "Follow-up sequences",
      "Marketing-source to CRM handoff",
      "Operational reporting and exception visibility"
    ],
    technicalTopics: [
      "Field and data mapping across custom objects and standard schemas",
      "Unique record identifiers and deduplication logic",
      "Status normalization and state-machine transitions",
      "Source-of-truth determination between sales CRM and operational databases",
      "API and webhook boundaries with execution audit histories"
    ],
    symptoms: [
      "Unclear pipeline stages with overlapping criteria",
      "Inconsistent statuses entered across team members",
      "Duplicated contact and deal records across channels",
      "No single identifiable owner for high-intent records",
      "Manual follow-up relying on individual memory or sticky notes",
      "Meetings held without updates reflected in system state",
      "Connected systems updating separately without cross-checks",
      "Executive reporting skewed by unstandardized custom fields"
    ],
    implementationStructure: {
      structure: [
        "Pipeline stage definition & exit criteria",
        "Lead and account lifecycle taxonomy",
        "Required property schemas & field normalization",
        "Account-to-contact and deal-to-ticket record relationships",
        "Permission boundaries & ownership assignment tables"
      ],
      workflow: [
        "Inbound lead capture & round-robin routing",
        "Automated follow-up tasks & notification triggers",
        "Lifecycle transition automations based on real events",
        "Meeting-state synchronization from calendars",
        "Downstream dispatch to operations or production systems"
      ],
      visibility: [
        "Real-time pipeline progression views",
        "Rep activity & follow-up adherence reporting",
        "Acquisition channel & source conversion metrics",
        "Stale record and pipeline bottleneck exception queues"
      ]
    },
    faq: [
      {
        question: "Should we replace our current CRM?",
        answer: "Not necessarily. In many engagements, the primary issue is how pipelines, fields, permissions, and automations are structured rather than the software platform itself. We evaluate your current setup before recommending any migration."
      },
      {
        question: "Can the CRM connect to our other tools?",
        answer: "Yes, provided the connected systems offer stable APIs, webhooks, or native integration connectors. We map directional data movement and establish clear system-of-record boundaries."
      },
      {
        question: "Can follow-up happen automatically?",
        answer: "Yes. Follow-up sequences, reminder tasks, and internal alerts can be triggered by stage changes, form events, or inactivity windows—while stopping immediately once a real customer conversation begins."
      },
      {
        question: "Can some steps still require approval?",
        answer: "Yes. High-stakes stages, discounting, contract handoffs, or ambiguous data can be routed to a designated manager or team queue for explicit human review."
      },
      {
        question: "What information is needed to redesign a CRM workflow?",
        answer: "A clear picture of how inquiries currently enter your business, who touches them, what decisions qualify an opportunity, and where work currently stalls or gets dropped."
      }
    ]
  },
  {
    slug: "workflow-automation",
    title: "Business Workflow Automation",
    shortTitle: "Workflow Automation",
    eyebrow: "WORKFLOW AUTOMATION",
    h1: "Turn repeatable handoffs into reliable workflows.",
    subheadline: "When the same event repeatedly leads to the same checks, updates, messages or tasks, that process may be a strong candidate for automation.",
    summary: "Turn repeatable handoffs into defined workflows with triggers, rules, delays, branches, notifications and actions.",
    ctaLabel: "Map a workflow",
    ctaHref: "/contact?service=workflow-automation",
    bentoCols: "lg:col-span-6",
    problems: [
      "Too many recurring steps depend on people remembering.",
      "Manual data copying between forms, spreadsheets, and operational software.",
      "Tasks stall waiting for handoffs that happen over informal chat or email."
    ],
    capabilities: [
      "Event-driven workflows",
      "Conditional paths & branching logic",
      "Tasks, communications & alerts",
      "Operational status updates"
    ],
    useCases: [
      "Lead capture and routing",
      "Follow-up sequences",
      "Appointment reminders and lifecycle",
      "Document generation and handoff"
    ],
    technicalTopics: [
      "Deterministic trigger evaluation and payload validation",
      "Conditional multi-branch routing and edge-case handling",
      "Idempotency and duplicate event suppression",
      "Exponential backoff retry policies for transient network failures",
      "Execution logs, audit trails, and human-in-the-loop exception queues"
    ],
    faq: [
      {
        question: "What makes a good automation candidate?",
        answer: "A process with a repeatable trigger, clear input data, definable business rules, and a predictable next action. Processes requiring ambiguous judgment should be restructured or incorporate human approval points."
      },
      {
        question: "What happens if a step fails or data is missing?",
        answer: "A properly engineered workflow does not fail silently. It captures the payload, pauses the downstream path, notifies the designated team member, and routes the record to an exception queue for manual remediation."
      },
      {
        question: "Can workflows be paused or stopped when conditions change?",
        answer: "Yes. Automations should include exit criteria—such as a lead replying, a customer booking an appointment, or an invoice being flagged—to immediately halt automated sequences."
      },
      {
        question: "How do you test workflows before going live?",
        answer: "We test using dedicated sandbox records, simulating both happy-path scenarios and anticipated edge cases (malformed data, network timeouts, duplicate triggers) before production activation."
      }
    ]
  },
  {
    slug: "integrations",
    title: "Systems Integration & Data Synchronization",
    shortTitle: "Integrations & Data Sync",
    eyebrow: "SYSTEMS INTEGRATION",
    h1: "Connect the systems that should already be talking to each other.",
    subheadline: "Move the right information between the tools involved in a process so your team does not have to keep re-entering, downloading or reconciling it manually.",
    summary: "Move the right information between systems so teams do not have to keep entering the same data manually.",
    ctaLabel: "Review an integration",
    ctaHref: "/contact?service=integrations",
    bentoCols: "lg:col-span-4",
    problems: [
      "The same information lives in several disconnected systems.",
      "Invoices, project boards, and CRM contacts drift out of sync.",
      "Staff spend hours exporting CSVs and uploading them elsewhere."
    ],
    capabilities: [
      "Supported native integrations",
      "API & webhook patterns",
      "Field mapping & transformation",
      "Record and file synchronization"
    ],
    useCases: [
      "Billing/payment status synchronization",
      "File routing and storage governance",
      "Contact and record synchronization",
      "User/access provisioning"
    ],
    technicalTopics: [
      "Source-of-truth governance per entity and attribute",
      "Deterministic primary and secondary record matching keys",
      "Payload transformation and schema mapping",
      "Webhook signature verification and mutual TLS authentication",
      "Rate-limit management, throttling, and pagination traversal"
    ],
    faq: [
      {
        question: "Do you build custom API integrations or use existing connectors?",
        answer: "We select the simplest reliable method. If a robust native connector or orchestration platform satisfies requirements, we use it. When custom logic, transformation, or unsupported endpoints are required, we implement direct API or webhook connections."
      },
      {
        question: "How do you prevent data from being overwritten incorrectly?",
        answer: "By defining a clear source of truth for every field, checking timestamps or version hashes, and routing conflicting edits to an exception log rather than allowing blind overwrites."
      },
      {
        question: "What happens if one of our software vendors changes their API?",
        answer: "We document the endpoints, authentication types, and payload models during handover so your team has an exact architectural specification to update if vendor schemas evolve."
      }
    ]
  },
  {
    slug: "ai-assisted-automation",
    title: "AI-Assisted Workflow Automation",
    shortTitle: "AI-Assisted Operations",
    eyebrow: "AI-ASSISTED OPERATIONS",
    h1: "Give AI a defined job inside the workflow.",
    subheadline: "AI is most useful when the input, expected output, validation and next action are clear. It should not replace a simple business rule just because AI is available.",
    summary: "Give AI a defined job inside a controlled workflow when extraction, classification, enrichment or drafting is genuinely useful.",
    ctaLabel: "Discuss an AI-assisted process",
    ctaHref: "/contact?service=ai-assisted-automation",
    bentoCols: "lg:col-span-4",
    problems: [
      "We have unstructured information that needs interpreting before the next step.",
      "Inbound emails or documents require tedious manual transcription into form fields.",
      "Team members spend hours categorizing inquiries that follow observable criteria."
    ],
    capabilities: [
      "Unstructured data extraction",
      "Inquiry & ticket categorization",
      "Approved record enrichment",
      "Structured output validation & draft generation"
    ],
    useCases: [
      "AI-assisted extraction/classification",
      "AI-assisted enrichment",
      "Document generation and handoff"
    ],
    technicalTopics: [
      "Strict schema enforcement via structured outputs (JSON Schema)",
      "Confidence thresholding and deterministic validation barriers",
      "Data minimization: passing only necessary context to language models",
      "Controlled human-in-the-loop review queues for low-confidence outputs",
      "Fallback execution paths when model generation fails schema checks"
    ],
    faq: [
      {
        question: "Does every workflow need AI?",
        answer: "No. The majority of dependable business automations rely entirely on deterministic rules and structured API calls. AI is deployed specifically when unstructured text or documents require interpretation."
      },
      {
        question: "Can AI make final business decisions autonomously?",
        answer: "We design systems where critical decisions, financial commitments, and external communications remain gated behind human review or strict confidence boundaries."
      },
      {
        question: "How do you handle inaccurate or hallucinated output?",
        answer: "We pass model outputs through strict JSON Schema validators and deterministic checks. If any expected key or data type is invalid, or confidence falls below a set threshold, the item routes to human review."
      },
      {
        question: "Can AI be integrated into our existing CRM?",
        answer: "Yes. When an incoming email, note, or attachment arrives in your CRM, an automated trigger can invoke an extraction step and write structured properties directly back to the record."
      }
    ]
  },
  {
    slug: "reporting-visibility",
    title: "CRM Reporting & Operational Visibility",
    shortTitle: "Reporting & Visibility",
    eyebrow: "REPORTING & VISIBILITY",
    h1: "Make operational activity easier to see.",
    subheadline: "Useful reporting starts with consistent records, statuses and workflow events—not with another dashboard layered over inconsistent data.",
    summary: "Create more consistent operational data so teams can understand what is moving, waiting or requiring attention.",
    ctaLabel: "Discuss reporting requirements",
    ctaHref: "/contact?service=reporting-visibility",
    bentoCols: "lg:col-span-4",
    problems: [
      "We have data, but not useful operational visibility.",
      "Leadership cannot see which deals or projects are actively moving vs stalled.",
      "Automations run in the background without visibility into failures or exceptions."
    ],
    capabilities: [
      "Pipeline stage progression visibility",
      "Team activity & follow-up adherence views",
      "Source and channel status tracking",
      "Automated workflow exception queues"
    ],
    useCases: [
      "Operational reporting and exception visibility",
      "Billing/payment status synchronization",
      "Lead capture and routing"
    ],
    technicalTopics: [
      "Data consistency preconditions for reliable operational metrics",
      "State-transition timestamping for process velocity tracking",
      "Event audit logging across distributed platforms",
      "Centralized exception aggregation and alerting feeds",
      "Non-numeric operational health indicators and bottleneck identification"
    ],
    faq: [
      {
        question: "Why do you focus on data structure before building dashboards?",
        answer: "A dashboard displaying inconsistent fields, duplicate records, or loosely defined stages simply visualizes bad data faster. Reliable visibility requires clean record taxonomy and disciplined status updates."
      },
      {
        question: "Can we track where records get stuck in our process?",
        answer: "Yes. By timestamping state transitions and tracking inactivity thresholds, we create views that immediately highlight records waiting on review, approval, or follow-up."
      },
      {
        question: "Do you report business savings or ROI figures?",
        answer: "We do not report speculative performance figures. Operational metrics focus on verifiable system events: run histories, stage velocity, exception counts, and record consistency."
      }
    ]
  }
];
