import {
  LayoutDashboard, Package, Tags, FolderOpen, Megaphone,
  Image as ImageIcon, FileText, BookOpen, Settings, Flag,
  Quote, Type,
} from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export function getNavGroups(locale: string): NavGroup[] {
  const base = `/${locale}/admin`;
  return [
    {
      title: '',
      items: [
        { label: 'Dashboard', href: base, icon: LayoutDashboard },
      ],
    },
    {
      title: 'Catalog',
      items: [
        { label: 'Products',    href: `${base}/products`,    icon: Package },
        { label: 'Categories',  href: `${base}/categories`,  icon: Tags },
        { label: 'Collections', href: `${base}/collections`, icon: FolderOpen },
      ],
    },
    {
      title: 'Merchandising',
      items: [
        { label: 'Campaigns', href: `${base}/campaigns`, icon: Megaphone },
        { label: 'Banners',   href: `${base}/banners`,   icon: Flag },
      ],
    },
    {
      title: 'Content',
      items: [
        { label: 'Site Copy',    href: `${base}/content`,      icon: Type },
        { label: 'Pages',        href: `${base}/pages`,        icon: FileText },
        { label: 'Stories',      href: `${base}/stories`,      icon: BookOpen },
        { label: 'Testimonials', href: `${base}/testimonials`, icon: Quote },
      ],
    },
    {
      title: '',
      items: [
        { label: 'Media Library', href: `${base}/media`, icon: ImageIcon },
        { label: 'Settings',      href: `${base}/settings`, icon: Settings },
      ],
    },
  ];
}
