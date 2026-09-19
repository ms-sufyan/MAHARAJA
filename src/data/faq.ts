export interface FAQItem {
  question: string;
  answer: string;
}

export const homepageFaqs: FAQItem[] = [
  {
    question: "Do you only work with specific CRM platforms?",
    answer: "Implementation work includes systems such as monday.com, HubSpot and GoHighLevel as well as connected business tools. The existing stack should be reviewed before recommending that anything be replaced."
  },
  {
    question: "Can one workflow connect several tools?",
    answer: "Yes, when the systems involved expose suitable native integrations, connectors, APIs, webhooks or other supported methods. Feasibility should be confirmed before implementation rather than assumed."
  },
  {
    question: "Does every automation need AI?",
    answer: "No. Many reliable workflows are better handled with explicit rules, conditions and integrations. AI should be used when it performs a specific useful task that deterministic logic does not handle as well."
  },
  {
    question: "What usually stays under human control?",
    answer: "Judgment-heavy decisions, approvals, sensitive exceptions, ambiguous records and other steps where the business needs a person to review the context can remain human-controlled."
  },
  {
    question: "How is project scope determined?",
    answer: "Scope depends on the number of workflows and systems involved, the quality and structure of the available data, the business rules and exceptions, the integration methods available, testing requirements and the level of handover or continuing support required."
  },
  {
    question: "Can you guarantee a particular amount of time or money saved?",
    answer: "No unsupported performance result should be promised. Where improvement needs to be measured, the baseline, event data and KPI should be defined and validated against production information."
  },
  {
    question: "What should I send before the first conversation?",
    answer: "A short description of what happens today, the systems involved, where work is still manual and what you want to work differently is enough to start."
  }
];

export const howWeWorkFaqs: FAQItem[] = [
  {
    question: "Do we need to know the technical solution before contacting you?",
    answer: "No. You only need to describe what happens today, what tools your team touches, and what you want to work differently. We help identify where manual bottlenecks exist and what architecture is appropriate."
  },
  {
    question: "Do we need to replace our existing tools?",
    answer: "Generally not. We start with the systems your business already uses—connecting them through native integrations, APIs, and workflows—unless an existing tool fundamentally cannot support your required process."
  },
  {
    question: "What access is usually required?",
    answer: "During discovery and build, we typically require administrative or developer-level access to the relevant platforms (or sandbox environments), using least-privilege credentials and dedicated testing accounts."
  },
  {
    question: "How are exceptions handled?",
    answer: "Every workflow is designed with a deliberate exception path. If an API is temporarily unreachable or an incoming record has missing data, the system flags the issue, sends an alert, and holds the item in an exception queue rather than failing silently."
  },
  {
    question: "What does handover include?",
    answer: "Handover includes complete architectural documentation, data schemas, field mapping tables, operational instructions, known vendor limitations, and walkthrough training for your team."
  },
  {
    question: "How is project scope determined?",
    answer: "Scope is based on the number of workflows, systems involved, data quality and readiness, custom API requirements, exception handling depth, and documentation needs."
  }
];
