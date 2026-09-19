import { brand } from "./brand";

export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
}

export const seoData: Record<string, PageSEO> = {
  home: {
    title: `${brand.companyName} | CRM, Workflow Automation & Systems Integration`,
    description: "CRM, workflow automation and systems integration designed around the way your business actually operates.",
    canonicalPath: "/"
  },
  services: {
    title: `CRM & Business Automation Services | ${brand.companyName}`,
    description: "Explore CRM, automation, integration, AI-assisted operations, and operational reporting services built around real business processes.",
    canonicalPath: "/services"
  },
  crm: {
    title: `CRM Systems & Workflow Optimization | ${brand.companyName}`,
    description: "Structure records, stages, ownership, and follow-up so your CRM supports real business operations rather than creating manual admin.",
    canonicalPath: "/services/crm"
  },
  workflow: {
    title: `Business Workflow Automation | ${brand.companyName}`,
    description: "Turn repeatable business handoffs into structured workflows with clear triggers, rules, actions, exceptions and human control.",
    canonicalPath: "/services/workflow-automation"
  },
  integrations: {
    title: `Systems Integration & Data Synchronization | ${brand.companyName}`,
    description: "Connect CRM, finance, document, scheduling and operational systems so data moves without repeated manual entry.",
    canonicalPath: "/services/integrations"
  },
  ai: {
    title: `AI-Assisted Workflow Automation | ${brand.companyName}`,
    description: "Give AI a defined role in extraction, classification, and draft preparation within controlled, validated business workflows.",
    canonicalPath: "/services/ai-assisted-automation"
  },
  reporting: {
    title: `CRM Reporting & Operational Visibility | ${brand.companyName}`,
    description: "Build operational visibility on top of consistent fields, stage definitions, and workflow events across your business tools.",
    canonicalPath: "/services/reporting-visibility"
  },
  useCases: {
    title: `Business Automation Use Cases | ${brand.companyName}`,
    description: "Explore common workflow patterns by business problem—from lead capture and appointment lifecycle to document and billing synchronization.",
    canonicalPath: "/use-cases"
  },
  howWeWork: {
    title: `Automation Discovery, Build & Validation | ${brand.companyName}`,
    description: "Our six-stage implementation lifecycle: Understand, Map, Design, Build, Validate, and Handover. Understand first, automate second.",
    canonicalPath: "/how-we-work"
  },
  capabilities: {
    title: `CRM & Automation Implementation Capabilities | ${brand.companyName}`,
    description: "Architectural patterns and technical considerations for CRM handoffs, document automation, financial synchronization, and file governance.",
    canonicalPath: "/capabilities"
  },
  about: {
    title: `About ${brand.companyName} | CRM & Automation Delivery`,
    description: "Practical business systems consultancy focused on CRM, workflow automation, and integrations that connect existing tools reliably.",
    canonicalPath: "/about"
  },
  contact: {
    title: `Discuss Your Workflow | ${brand.companyName}`,
    description: "Tell us where your business workflow is breaking. Share what happens today, the systems involved, and what is currently handled manually.",
    canonicalPath: "/contact"
  },
  contactSuccess: {
    title: `Inquiry Received | ${brand.companyName}`,
    description: "Thank you for reaching out. We have received your inquiry and will review your systems and workflow requirements.",
    canonicalPath: "/contact/success",
    noindex: true
  },
  privacy: {
    title: `Privacy Policy | ${brand.companyName}`,
    description: "Information about how data submitted through this website is handled, stored, and protected in accordance with privacy principles.",
    canonicalPath: "/privacy"
  },
  terms: {
    title: `Terms of Service | ${brand.companyName}`,
    description: "Terms and conditions governing the use of this website and professional services engagement boundaries.",
    canonicalPath: "/terms"
  },
  notFound: {
    title: `Page Not Found | ${brand.companyName}`,
    description: "The page you requested could not be found.",
    canonicalPath: "/404",
    noindex: true
  }
};
