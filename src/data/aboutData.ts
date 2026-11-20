export interface AboutMetric {
  id: string;
  label: string;
  value: string;
}

export interface AboutFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface ApproachPillar {
  title: string;
  description: string;
  number: string;
}

export const aboutData = {
  hero: {
    label: "ABOUT US",
    heading: "Built with precision.\nDesigned for life.",
    supportingText: "Perfect Mason brings together planning, construction, turnkey execution and interior design under one trusted team."
  },
  intro: {
    label: "WHO WE ARE",
    heading: "Building more than structures.\nCreating places people value.",
    supportingText: "From residential homes to commercial spaces, turnkey projects and interiors, Perfect Mason brings disciplined planning, quality construction and thoughtful execution to every project.",
    expertise: ["RESIDENTIAL", "COMMERCIAL", "TURNKEY", "INTERIORS"]
  },
  visionMission: {
    vision: {
      title: "Our Vision",
      statement: "To be the most trusted and technically revered construction and turnkey engineering studio, shaping enduring architectural landmarks built with uncompromising craft and sustainability."
    },
    mission: {
      title: "Our Mission",
      statement: "To deliver transparent, integrated, and hassle-free design-to-build solutions by uniting architectural clarity, structural rigor, and fine interior craftsmanship under single-source accountability."
    }
  },
  coreValues: [
    {
      title: "Integrity & Transparency",
      description: "Itemized BOQs, open-book material sourcing, and zero hidden costs."
    },
    {
      title: "Engineering Excellence",
      description: "ISO-aligned structural protocols, multi-point laser leveling, and certified material batch testing."
    },
    {
      title: "Client-Centric Collaboration",
      description: "Weekly milestone reviews and single-point director communication."
    },
    {
      title: "Uncompromising Safety",
      description: "Zero-compromise on-site labor safety protocols, PPE mandates, and hazard mitigation."
    }
  ] as CoreValue[],
  approach: [
    {
      number: "01",
      title: "Planning",
      description: "Thorough site feasibility, soil analysis, structural modeling, and municipal compliance."
    },
    {
      number: "02",
      title: "Quality",
      description: "Graded steel, certified RMC batches, and strict non-destructive quality checks at each slab."
    },
    {
      number: "03",
      title: "Communication",
      description: "Direct director access, real-time photographic logs, and clear progress milestones."
    },
    {
      number: "04",
      title: "Execution",
      description: "Full-time resident engineers, synchronized MEP scheduling, and rapid obstacle resolution."
    },
    {
      number: "05",
      title: "Safety",
      description: "Zero-incident safety culture with certified scaffolding and rigorous site audits."
    },
    {
      number: "06",
      title: "Client Satisfaction",
      description: "Detailed snagging resolution, complete documentation transfer, and lifetime warranty assurance."
    }
  ] as ApproachPillar[],
  statement: {
    heading: "PRECISION IN EVERY DECISION.\nQUALITY IN EVERY DETAIL.",
    supportingText: "Every project begins with understanding, careful planning and a clear path from concept to execution."
  },
  trust: {
    label: "TRUST & CONFIDENCE",
    heading: "Confidence built into\nevery project.",
    supportingText: "From planning and construction to turnkey execution and interiors, our process is designed around clarity, quality and dependable delivery.",
    metrics: [
      { id: "m1", label: "YEARS OF EXPERIENCE", value: "12+" },
      { id: "m2", label: "PROJECTS COMPLETED", value: "150+" },
      { id: "m3", label: "CLIENT SATISFACTION", value: "98%" },
      { id: "m4", label: "ON-TIME HANDOVER", value: "100%" }
    ] as AboutMetric[]
  },
  faq: {
    label: "FAQ",
    heading: "Things You\nShould Know",
    supportingText: "We've answered common questions about construction, turnkey execution and interiors to help you plan with confidence.",
    items: [
      {
        id: "faq1",
        question: "How do I start a project with Perfect Mason?",
        answer: "Every project begins with a detailed consultation. We understand your requirements, evaluate the site, and propose a comprehensive plan covering design, timelines, and execution strategy."
      },
      {
        id: "faq2",
        question: "What types of projects do you handle?",
        answer: "We specialize in residential homes, commercial buildings, complete turnkey developments, and premium interior design and execution."
      },
      {
        id: "faq3",
        question: "Can you manage a complete turnkey project?",
        answer: "Yes. Our turnkey service handles everything from architectural planning and structural engineering to civil construction, finishing, and final interior handover."
      },
      {
        id: "faq4",
        question: "Do you provide interior design and execution?",
        answer: "Absolutely. We have a dedicated interiors team that works seamlessly with our construction division to ensure the final spaces match the exact design vision."
      },
      {
        id: "faq5",
        question: "How do you maintain construction quality?",
        answer: "We follow strict ISO-aligned quality protocols, use premium graded materials, and have experienced site engineers monitoring every phase of execution to ensure structural integrity and flawless finishing."
      },
      {
        id: "faq6",
        question: "Do you handle both residential and commercial projects?",
        answer: "Yes, our portfolio includes luxury villas, independent residences, commercial office spaces, and retail environments, each managed by specialized execution teams."
      },
      {
        id: "faq7",
        question: "How can I request a quotation?",
        answer: "You can reach out through our Contact page or request a quote directly. We will schedule an initial discussion to understand your scope before providing a detailed estimate."
      }
    ] as AboutFAQ[]
  },
  cta: {
    heading: "Let's Build Something Special and Unique for You",
    supportingText: "Tell us about your project and our team will help you plan the next step with complete clarity.",
    primaryButton: "Contact Perfect Mason",
    secondaryButton: "EXPLORE PROJECTS"
  }
};
