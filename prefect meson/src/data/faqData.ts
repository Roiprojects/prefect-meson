export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQSectionData = {
  eyebrow: 'FAQ',
  headline: {
    line1: 'Things You',
    line2: 'Should Know',
  },
  description:
    "We've answered common questions about construction, turnkey execution and interior design to help you plan your project with confidence.",
  faqs: [
    {
      id: 'faq-01',
      question: 'How do I start a project with Perfect Mason?',
      answer:
        'Begin with a consultation. We understand your requirements, review the project scope and guide you through the next steps.',
    },
    {
      id: 'faq-02',
      question: 'What types of construction projects do you handle?',
      answer:
        'We work across residential construction, commercial construction, turnkey project execution and interiors.',
    },
    {
      id: 'faq-03',
      question: 'Do you provide planning and design support?',
      answer:
        'Our process includes requirement understanding, planning, design coordination, estimation and execution.',
    },
    {
      id: 'faq-04',
      question: 'Can Perfect Mason handle the complete project?',
      answer:
        'Yes. Turnkey execution can coordinate multiple stages from concept and planning through construction, finishing and handover.',
    },
    {
      id: 'faq-05',
      question: 'Do you provide interior design and execution?',
      answer:
        'Yes. Interior services can include space planning, material selection, flooring, false ceiling, lighting, wall finishes, furniture, modular solutions and custom works.',
    },
    {
      id: 'faq-06',
      question: 'How do you maintain construction quality?',
      answer:
        'Quality is supported through planned execution, inspections, material control and attention to construction details.',
    },
    {
      id: 'faq-07',
      question: 'How can I request a project quotation?',
      answer:
        'Use the Get a Quote / Enquire Now CTA and submit your project requirements so the team can review them.',
    },
  ],
};
