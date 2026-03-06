import { toast } from 'sonner';
import { createElement } from 'react';
import {
  Package, Layers, Flag, FileText, Megaphone, MessageSquareQuote,
  Grid3X3, Image as ImageIcon, Settings, CircleCheckIcon, OctagonXIcon,
  TriangleAlertIcon, InfoIcon,
} from 'lucide-react';

type EntityType =
  | 'product' | 'collection' | 'banner' | 'page'
  | 'campaign' | 'testimonial' | 'category' | 'media' | 'settings';

type Action =
  | 'created' | 'updated' | 'deleted' | 'uploaded'
  | 'saved' | 'reset' | 'copied' | 'published';

const ENTITY_ICONS: Record<EntityType, typeof Package> = {
  product: Package,
  collection: Layers,
  banner: Flag,
  page: FileText,
  campaign: Megaphone,
  testimonial: MessageSquareQuote,
  category: Grid3X3,
  media: ImageIcon,
  settings: Settings,
};

const ENTITY_LABELS: Record<EntityType, string> = {
  product: 'Product',
  collection: 'Collection',
  banner: 'Banner',
  page: 'Page',
  campaign: 'Campaign',
  testimonial: 'Testimonial',
  category: 'Category',
  media: 'Media',
  settings: 'Settings',
};

function formatMessage(entity: EntityType, action: Action, name?: string): string {
  const label = ENTITY_LABELS[entity];
  const nameStr = name ? ` '${name}'` : '';
  return `${label}${nameStr} ${action}`;
}

function entityIcon(entity: EntityType) {
  return createElement(ENTITY_ICONS[entity], { size: 16 });
}

export const notify = {
  success(entity: EntityType, action: Action, name?: string) {
    toast.success(formatMessage(entity, action, name), {
      icon: entityIcon(entity),
    });
  },

  error(entity: EntityType, action: Action, err?: unknown) {
    const msg = err instanceof Error ? err.message : typeof err === 'string' ? err : `Failed to ${action} ${ENTITY_LABELS[entity].toLowerCase()}`;
    toast.error(msg, {
      icon: entityIcon(entity),
    });
  },

  warn(message: string) {
    toast.warning(message, {
      icon: createElement(TriangleAlertIcon, { size: 16 }),
    });
  },

  info(message: string) {
    toast.info(message, {
      icon: createElement(InfoIcon, { size: 16 }),
    });
  },
};
