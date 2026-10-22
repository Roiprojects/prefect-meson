export interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
  subItems?: SubMenuItem[];
}

export interface MegaMenuColumn {
  categoryTitle?: string;
  categorySubtitle?: string;
  items: SubMenuItem[];
}

export interface MegaMenuFeatured {
  title: string;
  subtitle: string;
  tag: string;
  imageUrl: string;
  href: string;
  metrics?: { label: string; value: string }[];
}

export interface NavItemType {
  id: string;
  label: string;
  shortLabel?: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuColumns?: MegaMenuColumn[];
  megaMenuFeatured?: MegaMenuFeatured;
  isAction?: boolean;
}

export interface HeaderConfig {
  brandName: string;
  tagline: string;
  navItems: NavItemType[];
  ctaButton: {
    label: string;
    href: string;
    sublabel?: string;
  };
  contactQuickInfo: {
    phone: string;
    email: string;
    address: string;
  };
}
