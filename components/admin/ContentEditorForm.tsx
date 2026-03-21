'use client';

import {
  useState, useTransition, useCallback, useMemo, useRef, useId, useEffect,
} from 'react';
import { notify } from '@/lib/notify';
import { BengalButton } from '@/components/bengal';
import { cn } from '@/lib/utils';
import {
  ChevronDown, RotateCcw, Save, ExternalLink, Globe,
  Smartphone, Monitor, RefreshCw, Search, X, Languages, Loader2,
} from 'lucide-react';

// ─── MyMemory free translation (no API key, no setup) ──────────────
async function translateEN_BN(text: string): Promise<string> {
  if (!text.trim()) return '';
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|bn`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error('Translation service unavailable');
  const data = await res.json() as { responseData?: { translatedText?: string }; responseStatus?: number };
  const translated = data.responseData?.translatedText;
  if (!translated || data.responseStatus === 403) throw new Error('Translation failed');
  return translated;
}
import { saveContentOverrides, resetContentKey, getContentOverrides } from '@/actions/content';
import type { ContentPageGroup, ContentNamespaceConfig } from '@/lib/content-config';

// ─── Types ─────────────────────────────────────────────────────────
type OverrideMap = Record<string, Record<string, string>>;

type Props = {
  pages: ContentPageGroup[];
  allDefaults: { en: OverrideMap; bn: OverrideMap };
  initialOverrides: OverrideMap;
  initialLocale: string;
};

// ─── Highlight: wraps matched portion in a <mark> ──────────────────
function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q || !text) return null;

  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return null;

  // Show up to 40 chars of context around the match
  const ctxStart = Math.max(0, idx - 30);
  const ctxEnd   = Math.min(text.length, idx + q.length + 30);
  const prefix   = (ctxStart > 0 ? '…' : '') + text.slice(ctxStart, idx);
  const match    = text.slice(idx, idx + q.length);
  const suffix   = text.slice(idx + q.length, ctxEnd) + (ctxEnd < text.length ? '…' : '');

  return (
    <p className="mt-1 text-[11px] leading-snug text-muted-foreground font-mono break-all">
      {prefix}
      <mark className="bg-amber-300/60 dark:bg-amber-500/30 text-foreground rounded-[2px] px-0.5 font-semibold not-italic">
        {match}
      </mark>
      {suffix}
    </p>
  );
}

// ─── Section Accordion ─────────────────────────────────────────────
function SectionAccordion({
  ns, expanded, onToggle, dirtyCount, overrides, defaults,
  isBn, isPending, onChange, onReset, idPrefix, highlightQuery, enDefaults,
}: {
  ns: ContentNamespaceConfig;
  expanded: boolean;
  onToggle: () => void;
  dirtyCount: number;
  overrides: Record<string, string> | undefined;
  defaults: Record<string, string>;
  isBn: boolean;
  isPending: boolean;
  onChange: (ns: string, key: string, value: string) => void;
  onReset: (ns: string, key: string) => void;
  idPrefix: string;
  highlightQuery: string;
  enDefaults?: Record<string, string>;
}) {
  const panelId  = `${idPrefix}-panel-${ns.name}`;
  const headerId = `${idPrefix}-hdr-${ns.name}`;
  const q        = highlightQuery.trim().toLowerCase();

  // Per-field translate loading state
  const [translating, setTranslating] = useState<Set<string>>(new Set());

  const handleTranslate = useCallback(async (key: string) => {
    const source = enDefaults?.[key];
    if (!source) return;
    setTranslating((prev) => new Set([...prev, key]));
    try {
      const result = await translateEN_BN(source);
      onChange(ns.name, key, result);
    } catch {
      notify.error('settings', 'saved', 'Translation failed — try again');
    } finally {
      setTranslating((prev) => { const next = new Set(prev); next.delete(key); return next; });
    }
  }, [enDefaults, ns.name, onChange]);

  // Pre-compute which keys have a match in their value (for header badge + field highlight)
  const matchingKeys = useMemo(() => {
    if (!q) return new Set<string>();
    const result = new Set<string>();
    for (const k of ns.keys) {
      const def = defaults[k.key] ?? '';
      const ov  = overrides?.[k.key] ?? '';
      if (def.toLowerCase().includes(q) || ov.toLowerCase().includes(q)) {
        result.add(k.key);
      }
    }
    return result;
  }, [q, ns.keys, defaults, overrides]);

  const valueMatchCount = matchingKeys.size;

  return (
    <div className={cn(
      'bg-card border border-border rounded-xl overflow-hidden transition-colors',
      q && valueMatchCount > 0 && 'border-amber-400/40 dark:border-amber-500/30',
    )}>
      <button
        id={headerId}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-2 px-3 sm:px-4 min-h-[48px] hover:bg-muted/50 active:bg-muted/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset rounded-xl"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-sans font-semibold text-[13px] sm:text-sm text-foreground truncate">{ns.label}</span>
          <span className="text-[11px] text-muted-foreground shrink-0">{ns.keys.length}</span>
          {dirtyCount > 0 && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full shrink-0">
              {dirtyCount}
            </span>
          )}
          {/* Value-match badge — shown when search is active and values matched */}
          {q && valueMatchCount > 0 && (
            <span className="text-[10px] font-semibold bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30 px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              {valueMatchCount} match{valueMatchCount > 1 ? 'es' : ''}
            </span>
          )}
        </div>
        <ChevronDown size={16} className={cn('text-muted-foreground transition-transform duration-200 shrink-0', expanded && 'rotate-180')} />
      </button>

      {expanded && (
        <div id={panelId} role="region" aria-labelledby={headerId} className="px-3 sm:px-4 pb-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground mt-2.5 mb-3">{ns.description}</p>
          <div className="space-y-3">
            {ns.keys.map((k) => {
              const overridden    = overrides?.[k.key] !== undefined;
              const displayVal    = overridden ? (overrides?.[k.key] ?? '') : '';
              const defaultVal    = defaults[k.key] ?? '';
              const fieldId       = `${idPrefix}-${ns.name}-${k.key}`;
              const isValueMatch  = matchingKeys.has(k.key);
              // The text to highlight: prefer live value, fall back to default
              const highlightText = displayVal || defaultVal;

              return (
                <div
                  key={k.key}
                  className={cn(
                    'rounded-lg transition-colors',
                    isValueMatch && q && 'pl-2 border-l-2 border-amber-400 dark:border-amber-500',
                  )}
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <label
                      htmlFor={fieldId}
                      className={cn(
                        'text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold font-sans truncate',
                        isValueMatch && q ? 'text-amber-700 dark:text-amber-400' : 'text-foreground/60',
                      )}
                    >
                      {k.label}
                    </label>
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Translate button — Bengali mode only, when an EN source exists */}
                      {isBn && enDefaults?.[k.key] && (
                        <button
                          type="button"
                          onClick={() => handleTranslate(k.key)}
                          disabled={translating.has(k.key) || isPending}
                          title={`Auto-translate from: "${(enDefaults[k.key] ?? '').slice(0, 60)}${(enDefaults[k.key] ?? '').length > 60 ? '…' : ''}"`}
                          className="flex items-center gap-1 text-[10px] sm:text-[11px] text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 disabled:opacity-40 transition-colors min-h-[28px] px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 rounded"
                          aria-label={`Translate ${k.label} from English`}
                        >
                          {translating.has(k.key)
                            ? <Loader2 size={11} className="animate-spin" />
                            : <Languages size={11} />
                          }
                          <span className="hidden sm:inline">
                            {translating.has(k.key) ? 'Translating…' : 'Translate'}
                          </span>
                        </button>
                      )}
                      {overridden && (
                        <button
                          type="button"
                          onClick={() => onReset(ns.name, k.key)}
                          disabled={isPending}
                          className="flex items-center gap-1 text-[10px] sm:text-[11px] text-muted-foreground hover:text-destructive transition-colors whitespace-nowrap min-h-[28px] px-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                          aria-label={`Reset ${k.label} to default`}
                        >
                          <RotateCcw size={10} /><span className="hidden sm:inline">Reset</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {k.multiline ? (
                    <textarea
                      id={fieldId}
                      value={displayVal}
                      onChange={(e) => onChange(ns.name, k.key, e.target.value)}
                      placeholder={defaultVal}
                      rows={3}
                      className={cn(
                        'w-full px-3 py-2.5 rounded-lg border bg-background text-sm leading-relaxed resize-y border-border placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors',
                        isBn ? 'font-bengali' : 'font-sans',
                        overridden && 'border-primary/30 bg-primary/5',
                      )}
                    />
                  ) : (
                    <input
                      id={fieldId}
                      type="text"
                      value={displayVal}
                      onChange={(e) => onChange(ns.name, k.key, e.target.value)}
                      placeholder={defaultVal}
                      className={cn(
                        'w-full h-11 sm:h-10 px-3 rounded-lg border bg-background text-sm border-border placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors',
                        isBn ? 'font-bengali' : 'font-sans',
                        overridden && 'border-primary/30 bg-primary/5',
                      )}
                    />
                  )}

                  {/* Match highlight preview — only shown when value matched the query */}
                  {isValueMatch && q && (
                    <HighlightMatch text={highlightText} query={highlightQuery} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────
export function ContentEditorForm({ pages, allDefaults, initialOverrides, initialLocale }: Props) {
  const idPrefix = useId();
  const [activeLocale,    setActiveLocale]    = useState(initialLocale);
  const [overrides,       setOverrides]       = useState<OverrideMap>(initialOverrides);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [dirtyKeys,       setDirtyKeys]       = useState<Record<string, Set<string>>>({});
  const [isPending, startTransition]          = useTransition();
  const [previewMode,     setPreviewMode]     = useState<'phone' | 'desktop'>('phone');
  const [iframeKey,       setIframeKey]       = useState(0);
  const [search,          setSearch]          = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const defaults         = allDefaults[activeLocale as 'en' | 'bn'] ?? allDefaults.en;
  const isBn             = activeLocale === 'bn';
  const totalDirtyCount  = useMemo(() => Object.values(dirtyKeys).reduce((sum, s) => sum + s.size, 0), [dirtyKeys]);

  const filteredPages = useMemo(() => {
    if (!search.trim()) return pages;
    const q = search.toLowerCase();
    return pages
      .map((pg) => ({
        ...pg,
        sections: pg.sections.filter((ns) => {
          if (ns.label.toLowerCase().includes(q) || ns.description.toLowerCase().includes(q)) return true;
          return ns.keys.some((k) => {
            if (k.label.toLowerCase().includes(q)) return true;
            const defaultVal  = defaults[ns.name]?.[k.key] ?? '';
            const overrideVal = overrides[ns.name]?.[k.key] ?? '';
            return defaultVal.toLowerCase().includes(q) || overrideVal.toLowerCase().includes(q);
          });
        }),
      }))
      .filter((pg) => pg.sections.length > 0);
  }, [pages, search, defaults, overrides]);

  // Auto-expand all matching sections when search changes
  useEffect(() => {
    if (!search.trim()) return;
    const q = search.toLowerCase();
    const toExpand = new Set<string>();
    for (const pg of pages) {
      for (const ns of pg.sections) {
        const sectionMatches =
          ns.label.toLowerCase().includes(q) ||
          ns.description.toLowerCase().includes(q) ||
          ns.keys.some((k) => {
            if (k.label.toLowerCase().includes(q)) return true;
            const def = defaults[ns.name]?.[k.key] ?? '';
            const ov  = overrides[ns.name]?.[k.key] ?? '';
            return def.toLowerCase().includes(q) || ov.toLowerCase().includes(q);
          });
        if (sectionMatches) toExpand.add(ns.name);
      }
    }
    setExpandedSections((prev) => new Set([...prev, ...toExpand]));
  }, [search, pages, defaults, overrides]);

  // Lookup: namespace name → { route, sectionId }
  const nsRouteMap = useMemo(() => {
    const map: Record<string, { route: string; sectionId?: string }> = {};
    for (const pg of pages) {
      for (const ns of pg.sections) {
        map[ns.name] = { route: pg.route, sectionId: ns.sectionId };
      }
    }
    return map;
  }, [pages]);

  const navigatePreview = useCallback((nsName: string) => {
    const info = nsRouteMap[nsName];
    if (!info) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    if (info.route === 'all pages') {
      if (info.sectionId) {
        try {
          const el = iframe.contentWindow?.document.getElementById(info.sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch { /* cross-origin */ }
      }
      return;
    }

    let route = info.route;
    if (route.includes('[')) route = route.replace(/\/\[.*$/, '');
    route = route === '/' ? '' : route;

    const targetPath = `/${activeLocale}${route}` || `/${activeLocale}`;

    try {
      const currentPath = new URL(iframe.src, window.location.origin).pathname;
      if (currentPath === targetPath && info.sectionId) {
        const el = iframe.contentWindow?.document.getElementById(info.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
    } catch { /* cross-origin */ }

    const hash = info.sectionId ? `#${info.sectionId}` : '';
    iframe.src = `${targetPath}${hash}`;
  }, [nsRouteMap, activeLocale]);

  const toggleSection = useCallback((ns: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(ns)) {
        next.delete(ns);
      } else {
        next.add(ns);
        navigatePreview(ns);
      }
      return next;
    });
  }, [navigatePreview]);

  const handleChange = useCallback((ns: string, key: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [ns]: { ...prev[ns], [key]: value } }));
    setDirtyKeys((prev) => ({ ...prev, [ns]: new Set([...(prev[ns] ?? []), key]) }));
  }, []);

  const handleSaveAll = useCallback(() => {
    if (totalDirtyCount === 0) return;
    startTransition(async () => {
      try {
        for (const [ns, keys] of Object.entries(dirtyKeys)) {
          if (keys.size === 0) continue;
          const entries: Record<string, string> = {};
          for (const key of keys) { const val = overrides[ns]?.[key]; if (val !== undefined) entries[key] = val; }
          await saveContentOverrides({ locale: activeLocale, namespace: ns, entries });
        }
        setDirtyKeys({});
        setIframeKey((k) => k + 1);
        notify.success('settings', 'saved');
      } catch { notify.error('settings', 'saved'); }
    });
  }, [dirtyKeys, overrides, activeLocale, totalDirtyCount]);

  const handleResetKey = useCallback((ns: string, key: string) => {
    startTransition(async () => {
      try {
        await resetContentKey({ locale: activeLocale, namespace: ns, key });
        setOverrides((prev) => { const next = { ...prev }; if (next[ns]) { const { [key]: _, ...rest } = next[ns]; next[ns] = rest; } return next; });
        setDirtyKeys((prev) => { const next = { ...prev }; if (next[ns]) { const s = new Set(next[ns]); s.delete(key); next[ns] = s; } return next; });
        setIframeKey((k) => k + 1);
        notify.success('settings', 'reset');
      } catch { notify.error('settings', 'reset'); }
    });
  }, [activeLocale]);

  const handleLocaleSwitch = useCallback(async (newLocale: string) => {
    if (newLocale === activeLocale) return;
    if (totalDirtyCount > 0 && !window.confirm(`You have ${totalDirtyCount} unsaved change(s). Switch locale and discard?`)) return;
    setActiveLocale(newLocale);
    try {
      const newOverrides = await getContentOverrides(newLocale);
      setOverrides(newOverrides);
      setDirtyKeys({});
      setIframeKey((k) => k + 1);
    } catch { notify.error('settings', 'saved', 'Failed to load content'); }
  }, [activeLocale, totalDirtyCount]);

  const sectionDirtyCount = useCallback((ns: string) => dirtyKeys[ns]?.size ?? 0, [dirtyKeys]);

  // Total value-match count across all filtered sections (for search status line)
  const totalValueMatches = useMemo(() => {
    if (!search.trim()) return 0;
    const q = search.toLowerCase();
    let count = 0;
    for (const pg of filteredPages) {
      for (const ns of pg.sections) {
        for (const k of ns.keys) {
          const def = defaults[ns.name]?.[k.key] ?? '';
          const ov  = overrides[ns.name]?.[k.key] ?? '';
          if (def.toLowerCase().includes(q) || ov.toLowerCase().includes(q)) count++;
        }
      }
    }
    return count;
  }, [filteredPages, search, defaults, overrides]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="shrink-0 mb-3 sm:mb-4">
        <h1 className="font-sans font-bold tracking-tight text-xl sm:text-2xl lg:text-3xl text-foreground">Site Copy</h1>
        <p className="text-xs sm:text-sm text-foreground/50 mt-0.5">Edit all website text. Changes apply after saving.</p>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5">
          <Globe size={15} className="text-muted-foreground shrink-0 hidden sm:block" />
          <div className="inline-flex rounded-lg border border-border overflow-hidden" role="radiogroup" aria-label="Select locale">
            {(['en', 'bn'] as const).map((loc) => (
              <button
                key={loc}
                role="radio"
                aria-checked={activeLocale === loc}
                onClick={() => handleLocaleSwitch(loc)}
                className={cn(
                  'px-4 py-2 sm:py-1.5 text-sm font-medium transition-colors min-w-[72px]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset',
                  activeLocale === loc
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground active:bg-muted',
                )}
              >
                {loc === 'en' ? 'English' : 'Bengali'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search copy & values..."
              aria-label="Filter content sections"
              className="w-full h-9 pl-8 pr-8 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <BengalButton type="button" variant="primary" size="sm" onClick={handleSaveAll} loading={isPending} disabled={totalDirtyCount === 0} className="shrink-0 hidden sm:inline-flex">
            <Save size={14} className="mr-1.5" />
            {isPending ? 'Saving...' : totalDirtyCount > 0 ? `Save (${totalDirtyCount})` : 'Saved'}
          </BengalButton>
        </div>
      </div>

      {/* Search status line */}
      {search.trim() && (
        <div className="shrink-0 mb-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          {filteredPages.length === 0
            ? `No sections match "${search}"`
            : `${filteredPages.reduce((s, p) => s + p.sections.length, 0)} section${filteredPages.reduce((s, p) => s + p.sections.length, 0) !== 1 ? 's' : ''}, ${totalValueMatches} field value${totalValueMatches !== 1 ? 's' : ''} matched — all expanded`
          }
        </div>
      )}

      {/* Body: scrollable editor + sticky preview */}
      <div className="flex-1 flex gap-4 xl:gap-6 relative items-start">
        {/* Editor */}
        <div className="flex-1 min-w-0" role="group" aria-label="Content sections">
          <div className="space-y-6 pb-4">
            {filteredPages.length === 0 && search.trim() && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No sections match &ldquo;{search}&rdquo;
              </p>
            )}
            {filteredPages.map((pg) => (
              <section key={pg.page} aria-label={pg.page}>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <h2 className="font-sans font-bold text-sm sm:text-base text-foreground">{pg.page}</h2>
                  <span className="text-[11px] text-muted-foreground font-mono">{pg.route}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2.5">{pg.description}</p>
                <div className="space-y-2">
                  {pg.sections.map((ns) => (
                    <SectionAccordion
                      key={ns.name}
                      ns={ns}
                      expanded={expandedSections.has(ns.name)}
                      onToggle={() => toggleSection(ns.name)}
                      dirtyCount={sectionDirtyCount(ns.name)}
                      overrides={overrides[ns.name]}
                      defaults={defaults[ns.name] ?? {}}
                      isBn={isBn}
                      isPending={isPending}
                      onChange={handleChange}
                      onReset={handleResetKey}
                      idPrefix={idPrefix}
                      highlightQuery={search}
                      enDefaults={isBn ? (allDefaults.en[ns.name] ?? {}) : undefined}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Preview (xl+ only) */}
        <div className="hidden xl:flex flex-col w-[420px] shrink-0 sticky top-4" style={{ height: 'calc(100dvh - 8rem)' }}>
          <div className="flex items-center justify-between mb-2 shrink-0">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">Preview</span>
            <div className="flex items-center gap-0.5">
              <div className="flex rounded-md border border-border overflow-hidden mr-1.5" role="radiogroup" aria-label="Preview device">
                <button
                  role="radio"
                  aria-checked={previewMode === 'phone'}
                  onClick={() => setPreviewMode('phone')}
                  className={cn('p-1.5 transition-colors', previewMode === 'phone' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
                  aria-label="Phone preview"
                >
                  <Smartphone size={14} />
                </button>
                <button
                  role="radio"
                  aria-checked={previewMode === 'desktop'}
                  onClick={() => setPreviewMode('desktop')}
                  className={cn('p-1.5 transition-colors', previewMode === 'desktop' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
                  aria-label="Desktop preview"
                >
                  <Monitor size={14} />
                </button>
              </div>
              <button onClick={() => setIframeKey((k) => k + 1)} className="p-1.5 text-muted-foreground hover:text-foreground rounded" aria-label="Refresh preview">
                <RefreshCw size={14} />
              </button>
              <a href={`/${activeLocale}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground rounded" aria-label="Open in new tab">
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex items-start justify-center">
            <div className={cn('h-full transition-all duration-300', previewMode === 'phone' ? 'w-[375px]' : 'w-full')}>
              <div className={cn('h-full flex flex-col overflow-hidden', previewMode === 'phone' ? 'rounded-[2.5rem] border-[6px] border-foreground/80 shadow-2xl bg-black' : 'rounded-xl border border-border bg-white')}>
                {previewMode === 'phone' && (
                  <div className="h-7 bg-black flex items-center justify-center shrink-0">
                    <div className="w-20 h-5 bg-foreground/80 rounded-b-2xl" />
                  </div>
                )}
                <div className="flex-1 overflow-hidden bg-white">
                  <iframe ref={iframeRef} key={iframeKey} src={`/${activeLocale}`} className="w-full h-full border-0" title="Site preview" />
                </div>
                {previewMode === 'phone' && (
                  <div className="h-5 bg-black flex items-center justify-center shrink-0">
                    <div className="w-28 h-1 bg-white/30 rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Save Bar */}
      <div className="shrink-0 sm:hidden border-t border-border bg-background px-3 pt-2 pb-1" role="toolbar" aria-label="Save">
        <div className="flex items-center gap-2">
          <BengalButton type="button" variant="primary" size="md" onClick={handleSaveAll} loading={isPending} disabled={totalDirtyCount === 0} className="flex-1">
            <Save size={15} className="mr-1.5" />
            {isPending ? 'Saving...' : totalDirtyCount > 0 ? `Save ${totalDirtyCount} Change${totalDirtyCount > 1 ? 's' : ''}` : 'All Saved'}
          </BengalButton>
          <a href={`/${activeLocale}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground active:bg-muted transition-colors shrink-0" aria-label="Preview site">
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
