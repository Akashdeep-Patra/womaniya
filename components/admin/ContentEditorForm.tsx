'use client';

import { useState, useTransition, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { BengalButton } from '@/components/bengal';
import { cn } from '@/lib/utils';
import {
  ChevronDown, RotateCcw, Save, ExternalLink, Globe,
} from 'lucide-react';
import { saveContentOverrides, resetContentKey } from '@/actions/content';
import type { ContentNamespaceConfig } from '@/lib/content-config';

type Props = {
  namespaces: ContentNamespaceConfig[];
  jsonDefaults: Record<string, Record<string, string>>;
  dbOverrides: Record<string, Record<string, string>>;
  locale: string;
};

export function ContentEditorForm({ namespaces, jsonDefaults, dbOverrides, locale }: Props) {
  const [activeLocale, setActiveLocale] = useState(locale);
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>(dbOverrides);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [dirtyKeys, setDirtyKeys] = useState<Record<string, Set<string>>>({});
  const [isPending, startTransition] = useTransition();
  const [savingNs, setSavingNs] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleSection = (ns: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(ns)) next.delete(ns);
      else next.add(ns);
      return next;
    });
  };

  const getValue = useCallback(
    (ns: string, key: string) => {
      return overrides[ns]?.[key] ?? '';
    },
    [overrides],
  );

  const getDefault = useCallback(
    (ns: string, key: string) => {
      return jsonDefaults[ns]?.[key] ?? '';
    },
    [jsonDefaults],
  );

  const isOverridden = useCallback(
    (ns: string, key: string) => {
      return overrides[ns]?.[key] !== undefined;
    },
    [overrides],
  );

  const handleChange = (ns: string, key: string, value: string) => {
    setOverrides((prev) => ({
      ...prev,
      [ns]: { ...prev[ns], [key]: value },
    }));
    setDirtyKeys((prev) => ({
      ...prev,
      [ns]: new Set([...(prev[ns] ?? []), key]),
    }));
  };

  const handleSaveSection = (ns: string) => {
    const dirty = dirtyKeys[ns];
    if (!dirty || dirty.size === 0) {
      toast.info('No changes to save');
      return;
    }

    const entries: Record<string, string> = {};
    for (const key of dirty) {
      const val = overrides[ns]?.[key];
      if (val !== undefined) entries[key] = val;
    }

    setSavingNs(ns);
    startTransition(async () => {
      try {
        await saveContentOverrides({ locale: activeLocale, namespace: ns, entries });
        setDirtyKeys((prev) => ({ ...prev, [ns]: new Set() }));
        setIframeKey((k) => k + 1);
        toast.success(`${ns} saved`);
      } catch {
        toast.error('Failed to save');
      } finally {
        setSavingNs(null);
      }
    });
  };

  const handleResetKey = (ns: string, key: string) => {
    startTransition(async () => {
      try {
        await resetContentKey({ locale: activeLocale, namespace: ns, key });
        setOverrides((prev) => {
          const next = { ...prev };
          if (next[ns]) {
            const { [key]: _, ...rest } = next[ns];
            next[ns] = rest;
          }
          return next;
        });
        setDirtyKeys((prev) => {
          const next = { ...prev };
          if (next[ns]) {
            const s = new Set(next[ns]);
            s.delete(key);
            next[ns] = s;
          }
          return next;
        });
        setIframeKey((k) => k + 1);
        toast.success('Reset to default');
      } catch {
        toast.error('Failed to reset');
      }
    });
  };

  const handleLocaleSwitch = async (newLocale: string) => {
    setActiveLocale(newLocale);
    // Fetch overrides for the new locale
    try {
      const { getContentOverrides } = await import('@/actions/content');
      const newOverrides = await getContentOverrides(newLocale);
      setOverrides(newOverrides);
      setDirtyKeys({});
      setIframeKey((k) => k + 1);
    } catch {
      toast.error('Failed to load content');
    }
  };

  const sectionDirtyCount = (ns: string) => dirtyKeys[ns]?.size ?? 0;

  return (
    <div className="flex gap-6 h-[calc(100vh-10rem)]">
      {/* Editor Panel */}
      <div className="flex-1 min-w-0 overflow-y-auto pr-1">
        {/* Locale Toggle */}
        <div className="flex items-center gap-2 mb-6 sticky top-0 bg-background z-10 py-2">
          <Globe size={16} className="text-muted-foreground" />
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(['en', 'bn'] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleSwitch(loc)}
                className={cn(
                  'px-4 py-1.5 text-sm font-medium transition-colors',
                  activeLocale === loc
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {loc === 'en' ? 'English' : 'Bengali'}
              </button>
            ))}
          </div>
        </div>

        {/* Namespace Sections */}
        <div className="space-y-3">
          {namespaces.map((ns) => {
            const expanded = expandedSections.has(ns.name);
            const dirty = sectionDirtyCount(ns.name);

            return (
              <div
                key={ns.name}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(ns.name)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="font-sans font-semibold text-sm text-foreground">
                      {ns.label}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {ns.keys.length} fields
                    </span>
                    {dirty > 0 && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                        {dirty} unsaved
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-muted-foreground transition-transform',
                      expanded && 'rotate-180',
                    )}
                  />
                </button>

                {/* Section Body */}
                {expanded && (
                  <div className="px-4 pb-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mt-3 mb-4">
                      {ns.description}
                    </p>

                    <div className="space-y-4">
                      {ns.keys.map((keyConfig) => {
                        const overridden = isOverridden(ns.name, keyConfig.key);
                        const currentVal = getValue(ns.name, keyConfig.key);
                        const defaultVal = getDefault(ns.name, keyConfig.key);
                        const displayVal = overridden ? currentVal : '';
                        const isBn = activeLocale === 'bn';

                        return (
                          <div key={keyConfig.key} className="group">
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="text-[11px] tracking-widest uppercase font-semibold text-foreground/60 font-sans">
                                {keyConfig.label}
                              </label>
                              {overridden && (
                                <button
                                  onClick={() => handleResetKey(ns.name, keyConfig.key)}
                                  disabled={isPending}
                                  className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <RotateCcw size={10} />
                                  Reset
                                </button>
                              )}
                            </div>
                            {keyConfig.multiline ? (
                              <textarea
                                value={displayVal}
                                onChange={(e) =>
                                  handleChange(ns.name, keyConfig.key, e.target.value)
                                }
                                placeholder={defaultVal}
                                rows={3}
                                className={cn(
                                  'w-full px-3 py-2 rounded-lg border bg-background text-sm resize-y',
                                  'border-border placeholder:text-muted-foreground/40',
                                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                  'transition-all',
                                  isBn ? 'font-bengali' : 'font-sans',
                                  overridden && 'border-primary/30 bg-primary/5',
                                )}
                              />
                            ) : (
                              <input
                                type="text"
                                value={displayVal}
                                onChange={(e) =>
                                  handleChange(ns.name, keyConfig.key, e.target.value)
                                }
                                placeholder={defaultVal}
                                className={cn(
                                  'w-full h-10 px-3 rounded-lg border bg-background text-sm',
                                  'border-border placeholder:text-muted-foreground/40',
                                  'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                                  'transition-all',
                                  isBn ? 'font-bengali' : 'font-sans',
                                  overridden && 'border-primary/30 bg-primary/5',
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Save Section Button */}
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-end gap-2">
                      <BengalButton
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => handleSaveSection(ns.name)}
                        loading={isPending && savingNs === ns.name}
                        disabled={dirty === 0 && !isPending}
                      >
                        <Save size={14} className="mr-1.5" />
                        Save {ns.label}
                      </BengalButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Panel — desktop only */}
      <div className="hidden xl:flex flex-col w-[480px] shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Live Preview
          </span>
          <a
            href={`/${activeLocale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Open <ExternalLink size={12} />
          </a>
        </div>
        <div className="flex-1 rounded-xl border border-border overflow-hidden bg-white">
          <iframe
            ref={iframeRef}
            key={iframeKey}
            src={`/${activeLocale}`}
            className="w-full h-full border-0"
            title="Site Preview"
          />
        </div>
      </div>

      {/* Mobile preview button */}
      <div className="fixed bottom-20 right-4 xl:hidden z-30">
        <a
          href={`/${activeLocale}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold"
        >
          <ExternalLink size={14} />
          Preview
        </a>
      </div>
    </div>
  );
}
