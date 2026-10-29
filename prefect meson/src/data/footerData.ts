export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface FooterContact {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
  };
  socialLinks: SocialLink[];
  companyLinks: FooterLink[];
  servicesLinks: FooterLink[];
  exploreLinks: FooterLink[];
  contact: FooterContact;
  legal: {
    copyright: string;
    builtWith: string;
    privacy: string;
    terms: string;
  };
}

export const footerConfig: FooterData = {
  brand: {
    name: 'NDL ENGINEERS & CONTRACTORS',
    tagline: 'Civil engineering, turnkey construction, commercial complexes, luxury residences & interior fit-outs led by certified civil engineering leadership.',
  },
  socialLinks: [
    { platform: 'Instagram', href: 'https://instagram.com' },
    { platform: 'Facebook', href: 'https://facebook.com' },
    { platform: 'LinkedIn', href: 'https://linkedin.com' },
    { platform: 'YouTube', href: 'https://youtube.com' },
  ],
  companyLinks: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  servicesLinks: [
    { label: 'Commercial Construction', href: '/commercial-construction' },
    { label: 'Residential Construction', href: '/residential-construction' },
    { label: 'Turnkey Projects', href: '/turnkey-project-execution' },
    { label: 'Interiors', href: '/interiors' },
  ],
  exploreLinks: [
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blogs', href: '/blogs' },
  ],
  contact: {
    phone: '+91 98863 29424',
    email: 'contact@perfectmason.com',
    address: 'No: 2041, 18th Cross, AECS Layout, A Block, Hosur Main Road, Bangalore - 560068',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  },
  legal: {
    copyright: `© ${new Date().getFullYear()} NDL Engineers & Contractors. All rights reserved.`,
    builtWith: 'Built with engineering precision & integrity.',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
  },
};
