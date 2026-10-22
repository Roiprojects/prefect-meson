import { HeaderConfig } from '../types/navigation';

export const navigationConfig: HeaderConfig = {
  brandName: 'PERFECT MASON',
  tagline: 'ARCHITECTURAL & TURNKEY CONSTRUCTION',
  contactQuickInfo: {
    phone: '+91 98863 29424',
    email: 'contact@perfectmason.com',
    address: 'AECS Layout, Hosur Main Road, Bengaluru, Karnataka 560068',
  },
  ctaButton: {
    label: 'GET A QUOTE',
    href: '/contact-us?type=quote',
    sublabel: 'Enquire Now',
  },
  navItems: [
    {
      id: 'home',
      label: 'HOME',
      href: '/',
    },
    {
      id: 'about',
      label: 'ABOUT US',
      href: '/about-us',
    },
    {
      id: 'commercial',
      label: 'COMMERCIAL',
      href: '/commercial-construction',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          categoryTitle: '3 COMMERCIAL CONTRACTING MODELS',
          categorySubtitle: 'End-to-End Turnkey, Core Shell & Specialized Single-Trade Subcontracts',
          items: [
            {
              title: '1. Item Rate End-to-End Services',
              href: '/commercial-construction/category/item-rate-end-to-end',
              badge: 'ITEM RATE',
              description: 'Complete turnkey commercial construction with 100% itemized BOQ rate transparency from foundation to final fit-out.',
            },
            {
              title: '2. Shell Only Package',
              href: '/commercial-construction/category/shell-only-package',
              badge: 'CORE & SHELL',
              description: 'Heavy RCC structural frame, slabs, retaining walls, and weather-sealed exterior building envelope.',
            },
            {
              title: '3. Any One Individual Service',
              href: '/commercial-construction/category/individual-trade-services',
              badge: 'INDIVIDUAL TRADE',
              description: 'Targeted single-discipline subcontracts: VDF/Epoxy flooring, structural steel fabrication, MEP, or painting.',
            },
          ],
        },
      ],
      megaMenuFeatured: {
        title: 'COMMERCIAL CONSTRUCTION AT PERFECT MASON',
        subtitle: 'From Itemized Turnkey Contracts & Core Shell Build to Trade Subcontracts & PEB Industrial Sheds.',
        tag: 'COMMERCIAL EXECUTION',
        imageUrl: '/assets/commercial_hero.jpg',
        href: '/commercial-construction',
        metrics: [
          { label: 'BOQ TRANSPARENCY', value: '100%' },
          { label: 'INDUSTRIAL SPANS', value: 'UP TO 45M' },
        ],
      },
    },
    {
      id: 'residential',
      label: 'RESIDENTIAL',
      href: '/residential-construction',
      hasMegaMenu: true,
      megaMenuColumns: [
        {
          categoryTitle: '3 RESIDENTIAL CONTRACTING GROUPS',
          categorySubtitle: 'Custom Luxury Villas, Spec-Driven Affordable Packages & Sustainable Green Homes',
          items: [
            {
              title: '1. Luxury Villas on Item Rate Basis',
              href: '/residential-construction/category/luxury-villas-item-rate',
              badge: 'ITEM RATE',
              description: 'Bespoke architectural residences and luxury villas built with exact item-rate BOQ transparency and master craftsmanship.',
            },
            {
              title: '2. Affordable Homes with Different Packages as per Specs',
              href: '/residential-construction/category/affordable-homes-packages',
              badge: 'SPEC PACKAGES',
              description: 'Value-engineered quality homes tailored to standardized specification tiers (Basic, Premium & Luxury packages).',
            },
            {
              title: '3. Eco-Friendly Homes (Consultation, Design & Execution)',
              href: '/residential-construction/category/eco-friendly-homes',
              badge: 'ECO SUSTAINABLE',
              description: 'Climate-responsive green homes integrating passive cooling, eco-friendly materials, rainwater harvesting & solar design.',
            },
          ],
        },
      ],
      megaMenuFeatured: {
        title: 'RESIDENTIAL CONSTRUCTION AT PERFECT MASON',
        subtitle: 'From Item-Rate Luxury Villas to Custom Eco-Friendly Homes & Specification Packages.',
        tag: 'RESIDENTIAL EXECUTION',
        imageUrl: '/ndl_projects/slide_012_img_1.jpg',
        href: '/residential-construction',
        metrics: [
          { label: 'EXPERIENCE', value: '14+ YRS' },
          { label: 'BOQ TRANSPARENCY', value: '100%' },
        ],
      },
    },
    {
      id: 'turnkey',
      label: 'TURNKEY',
      href: '/turnkey-project-execution',
    },
    {
      id: 'interiors',
      label: 'INTERIORS',
      href: '/interiors',
    },
    {
      id: 'gallery',
      label: 'GALLERY',
      href: '/gallery',
    },
    {
      id: 'blogs',
      label: 'BLOGS',
      href: '/blogs',
    },
    {
      id: 'testimonials',
      label: 'TESTIMONIALS',
      href: '/testimonials',
    },
    {
      id: 'contact',
      label: 'CONTACT US',
      href: '/contact-us',
    },
  ],
};
