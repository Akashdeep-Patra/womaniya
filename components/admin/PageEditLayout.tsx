'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Monitor, Tablet, Smartphone, RefreshCw,
  ExternalLink, Eye, EyeOff, PanelRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageForm } from './PageForm';
import { cn } from '@/lib/utils';

type DeviceMode = 'mobile' | 'tablet' | 'desktop';

const DEVICES: { mode: DeviceMode; icon: typeof Monitor; label: string; width: string; frameW: string }[] = [
  { mode: 'mobile',  icon: Smartphone, label: 'Mobile',  width: '390px',  frameW: 'max-w-[390px]' },
  { mode: 'tablet',  icon: Tablet,     label: 'Tablet',  width: '768px',  frameW: 'max-w-[768px]' },
  { mode: 'desktop', icon: Monitor,    label: 'Desktop', width: '100%',   frameW: 'max-w-none'    },
];

type PageData = {
  id: number;
  slug: string;
  title_en?: string | null;
  title_bn?: string | null;
  seo_title_en?: string | null;
  seo_title_bn?: string | null;
  seo_description_en?: string | null;
  seo_description_bn?: string | null;
  page_type?: string | null;
  status?: string | null;
  images?: string[] | null;
  hero_image_url?: string | null;
  sections?: { id: number; section_type: string; content_json: unknown }[];
};

const PROD_ORIGIN = 'https://womaniyakolkata.in';

export function PageEditLayout({
  page,
  locale,
}: {
  page: PageData;
  locale: string;
}) {
  const [device, setDevice]           = useState<DeviceMode>('desktop');
  const [refreshKey, setRefreshKey]   = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [mobileTab, setMobileTab]     = useState<'edit' | 'preview'>('edit');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const liveUrl  = `${PROD_ORIGIN}/${locale}/pages/${page.slug}`;
  const isDraft  = page.status === 'draft';
  const current  = DEVICES.find((d) => d.mode === device)!;

  const refresh = useCallback(() => {
    setIframeLoading(true);
    setRefreshKey((k) => k + 1);
  }, []);

  const PreviewPanel = (
    <div className="flex flex-col h-full min-h-0">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border bg-muted/40 shrink-0">
        {/* Device switcher */}
        <div className="flex items-center gap-0.5 bg-background rounded-lg p-0.5 border border-border">
          {DEVICES.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setDevice(mode)}
              title={label}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer',
                device === mode
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {isDraft && (
            <span className="text-[9px] tracking-widest uppercase text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full font-semibold hidden sm:inline-flex items-center gap-1">
              Draft — not live
            </span>
          )}
          <button
            onClick={refresh}
            title="Refresh preview"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <RefreshCw size={13} className={cn(iframeLoading && 'animate-spin')} />
          </button>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* iframe area */}
      <div className="flex-1 min-h-0 overflow-auto bg-muted/30 p-3">
        <div
          className={cn(
            'relative h-full mx-auto rounded-xl overflow-hidden border border-border bg-background shadow-lg transition-all duration-300',
            current.frameW
          )}
          style={{ width: device !== 'desktop' ? current.width : '100%' }}
        >
          {/* Loading shimmer */}
          <AnimatePresence>
            {iframeLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-muted animate-pulse flex flex-col items-center justify-center gap-3"
              >
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-xs text-muted-foreground font-sans-en tracking-wide">
                  Loading preview…
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {isDraft && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/95 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <EyeOff size={18} className="text-amber-600" />
              </div>
              <div className="text-center px-6">
                <p className="font-semibold text-sm text-foreground mb-1">Page is a Draft</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Publish the page to see a live preview.
                  <br />
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 mt-1 inline-block"
                  >
                    Try opening anyway ↗
                  </a>
                </p>
              </div>
            </div>
          )}

          <iframe
            key={refreshKey}
            ref={iframeRef}
            src={liveUrl}
            title={`Preview — ${page.title_en}`}
            className="w-full h-full border-0"
            style={{ minHeight: device === 'mobile' ? '667px' : '700px' }}
            onLoad={() => setIframeLoading(false)}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile: tab switcher ── */}
      <div className="lg:hidden">
        <div className="flex items-center gap-1 mb-4 bg-muted rounded-xl p-1">
          <button
            onClick={() => setMobileTab('edit')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer',
              mobileTab === 'edit'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Edit
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer',
              mobileTab === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Eye size={13} />
            Preview
          </button>
        </div>

        {mobileTab === 'edit' && (
          <PageForm initialData={page} locale={locale} />
        )}
        {mobileTab === 'preview' && (
          <div className="h-[70vh] rounded-2xl overflow-hidden border border-border">
            {PreviewPanel}
          </div>
        )}
      </div>

      {/* ── Desktop: split layout ── */}
      <div className="hidden lg:flex gap-0 min-h-[calc(100vh-120px)]">
        {/* Left — form */}
        <div className="w-[480px] xl:w-[520px] shrink-0 overflow-y-auto pr-6 pb-12">
          {/* Toggle preview */}
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={() => setShowPreview((v) => !v)}
              className={cn(
                'flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer',
                showPreview
                  ? 'border-primary/30 text-primary bg-primary/5 hover:bg-primary/10'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <PanelRight size={12} />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
          <PageForm initialData={page} locale={locale} />
        </div>

        {/* Right — live preview */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-w-0 sticky top-[72px] self-start h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-border bg-background shadow-sm"
            >
              {PreviewPanel}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
