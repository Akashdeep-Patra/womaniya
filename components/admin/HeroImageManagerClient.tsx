'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Save, Eye, EyeOff, ImageOff, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { BengalButton } from '@/components/bengal';
import { upsertHeroImage } from '@/actions/hero-images';
import { cn } from '@/lib/utils';
import type { HeroImage } from '@/db/schema';

// ─── Fallback data matching HeroSection.tsx hardcoded IMAGES ──────
const SLOT_DEFAULTS = [
  { slot: 1, src: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',  alt: 'Ikkat Rupkotha — Blue Pochampally handloom bustier dress editorial portrait', position: '50% 10%', is_active: true },
  { slot: 2, src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',  alt: 'Red handloom Jamdani patchwork skirt against heritage red wall',              position: '50% 20%', is_active: true },
  { slot: 3, src: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',  alt: 'Meher — spinning in Ikkat Pochampally dress, capturing movement and craft',    position: '50% 15%', is_active: true },
  { slot: 4, src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',  alt: 'Womaniya handloom editorial — artisan weave detail',                          position: '50% 30%', is_active: true },
  { slot: 5, src: '/instagram/2026-02-02_12-37-01_UTC_6.jpg',  alt: 'Close-up of Ikkat Pochampally handwoven textile pattern',                      position: '30% 50%', is_active: true },
] as const;

// ─── Collage positions — mirrors HeroSection.tsx desktop layout ───
const COLLAGE = [
  { slot: 5, style: 'top-[12%] left-[2%] w-[38%] h-[55%]',              zIndex: 0,  rounded: 'rounded-2xl' },
  { slot: 1, style: 'bottom-[2%] left-[12%] w-[45%] h-[75%]',           zIndex: 20, rounded: 'rounded-3xl' },
  { slot: 2, style: 'top-[8%] right-[5%] w-[42%] h-[60%]',              zIndex: 10, rounded: 'rounded-2xl' },
  { slot: 4, style: 'bottom-[4%] right-[2%] w-[35%] h-[45%]',           zIndex: 10, rounded: 'rounded-2xl' },
  { slot: 3, style: 'bottom-[20%] right-[32%] w-[22%] aspect-4/5',      zIndex: 30, rounded: 'rounded-xl'  },
] as const;

// ─── State shape ──────────────────────────────────────────────────
type SlotState = {
  slot: number;
  src: string;
  alt: string;
  position: string;
  is_active: boolean;
  persisted: boolean;
};

function buildInitialSlots(dbImages: HeroImage[]): SlotState[] {
  return SLOT_DEFAULTS.map((def) => {
    const dbRow = dbImages.find(r => r.slot === def.slot);
    if (dbRow) return { slot: dbRow.slot, src: dbRow.src, alt: dbRow.alt, position: dbRow.position, is_active: dbRow.is_active, persisted: true };
    return { slot: def.slot, src: def.src, alt: def.alt, position: def.position, is_active: def.is_active, persisted: false };
  });
}

// ─── Collage Preview ──────────────────────────────────────────────
function CollagePreview({
  slots,
  selectedSlot,
  onSelect,
}: {
  slots: SlotState[];
  selectedSlot: number;
  onSelect: (slot: number) => void;
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '64%' }}>
      <div className="absolute inset-0">
        {COLLAGE.map(({ slot, style, zIndex, rounded }) => {
          const s = slots.find(x => x.slot === slot);
          if (!s) return null;
          const isSelected = selectedSlot === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              className={cn(
                'absolute overflow-hidden border-[3px] cursor-pointer transition-all duration-200 bg-muted group',
                rounded,
                style,
                isSelected
                  ? 'border-primary shadow-[0_0_0_2px_hsl(var(--primary))] scale-[1.02]'
                  : 'border-background hover:border-primary/60 hover:scale-[1.01]',
                !s.is_active && 'opacity-40',
              )}
              style={{ zIndex }}
              aria-label={`Select card ${slot}`}
              aria-pressed={isSelected}
            >
              {s.src ? (
                <Image
                  src={s.src}
                  alt={s.alt || `Card ${slot}`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: s.position }}
                  unoptimized={s.src.startsWith('http')}
                  sizes="40vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageOff size={20} className="text-muted-foreground/40" />
                </div>
              )}

              {/* Card number badge */}
              <div className={cn(
                'absolute top-1.5 left-1.5 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full transition-colors',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background/80 text-foreground/70 group-hover:bg-background',
              )}>
                {slot}
              </div>

              {/* Hidden badge */}
              {!s.is_active && (
                <div className="absolute bottom-1.5 right-1.5 bg-background/80 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground px-1.5 py-0.5 rounded-full">
                  Hidden
                </div>
              )}

              {/* Selected ring indicator */}
              {isSelected && (
                <div className="absolute inset-0 ring-inset ring-2 ring-primary/40 pointer-events-none rounded-[inherit]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Single Slot Editor ───────────────────────────────────────────
function SlotEditor({
  state,
  onChange,
  onSave,
  onPrev,
  onNext,
  saving,
  canPrev,
  canNext,
}: {
  state: SlotState;
  onChange: (patch: Partial<Omit<SlotState, 'slot' | 'persisted'>>) => void;
  onSave: () => void;
  onPrev: () => void;
  onNext: () => void;
  saving: boolean;
  canPrev: boolean;
  canNext: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const handleSrcChange = (v: string) => { setImgError(false); onChange({ src: v }); };

  return (
    <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary/5">
        <div className="flex items-center gap-3">
          <button onClick={onPrev} disabled={!canPrev} className="p-1 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors" aria-label="Previous card">
            <ChevronLeft size={16} />
          </button>
          <span className="font-bold text-sm text-foreground tracking-wide">Card {state.slot}</span>
          <button onClick={onNext} disabled={!canNext} className="p-1 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors" aria-label="Next card">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {state.persisted && (
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={11} /> Saved
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange({ is_active: !state.is_active })}
            className={cn(
              'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1.5 rounded-full border transition-colors cursor-pointer',
              state.is_active
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-muted text-muted-foreground border-border hover:text-foreground',
            )}
            aria-label={state.is_active ? 'Hide this card' : 'Show this card'}
          >
            {state.is_active ? <Eye size={11} /> : <EyeOff size={11} />}
            {state.is_active ? 'Visible' : 'Hidden'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0">
        {/* Thumbnail preview */}
        <div className="relative md:w-40 md:shrink-0 aspect-3/4 md:aspect-auto md:h-auto bg-muted border-r border-border/50">
          {state.src && !imgError ? (
            <Image
              src={state.src}
              alt={state.alt || `Card ${state.slot}`}
              fill
              className="object-cover"
              style={{ objectPosition: state.position }}
              onError={() => setImgError(true)}
              unoptimized={state.src.startsWith('http')}
              sizes="160px"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
              <ImageOff size={28} strokeWidth={1.5} />
              <span className="text-[10px]">No image</span>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex-1 p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor={`src-${state.slot}`} className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">
              Image URL / Path
            </label>
            <input
              id={`src-${state.slot}`}
              type="text"
              value={state.src}
              onChange={e => handleSrcChange(e.target.value)}
              placeholder="/instagram/photo.jpg or https://..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={`alt-${state.slot}`} className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">
              Alt Text
            </label>
            <input
              id={`alt-${state.slot}`}
              type="text"
              value={state.alt}
              onChange={e => onChange({ alt: e.target.value })}
              placeholder="Describe the image for accessibility..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={`pos-${state.slot}`} className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">
              Focus Point <span className="text-muted-foreground/50 font-normal normal-case tracking-normal">(object-position)</span>
            </label>
            <input
              id={`pos-${state.slot}`}
              type="text"
              value={state.position}
              onChange={e => onChange({ position: e.target.value })}
              placeholder="50% 50%"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors font-mono"
            />
            <p className="text-[10px] text-muted-foreground">
              e.g. <code className="bg-muted px-1 rounded">50% 20%</code> · <code className="bg-muted px-1 rounded">center top</code> · <code className="bg-muted px-1 rounded">30% 50%</code>
            </p>
          </div>

          <BengalButton
            variant="primary"
            size="sm"
            onClick={onSave}
            disabled={saving || !state.src.trim()}
            className="w-full mt-1"
          >
            <Save size={13} className="mr-1.5" />
            {saving ? 'Saving…' : state.persisted ? 'Update Card' : 'Save Card'}
          </BengalButton>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
type Props = { initialImages: HeroImage[] };

export function HeroImageManagerClient({ initialImages }: Props) {
  const [slots, setSlots] = useState<SlotState[]>(() => buildInitialSlots(initialImages));
  const [selectedSlot, setSelectedSlot] = useState(1);
  const [savingSlot, setSavingSlot] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const updateSlot = (slot: number, patch: Partial<Omit<SlotState, 'slot' | 'persisted'>>) => {
    setSlots(prev => prev.map(s => s.slot === slot ? { ...s, ...patch } : s));
  };

  const saveSlot = (slot: number) => {
    const s = slots.find(st => st.slot === slot);
    if (!s) return;
    setSavingSlot(slot);
    startTransition(async () => {
      try {
        await upsertHeroImage({ slot: s.slot, src: s.src.trim(), alt: s.alt.trim(), position: s.position.trim() || '50% 50%', is_active: s.is_active });
        setSlots(prev => prev.map(st => st.slot === slot ? { ...st, persisted: true } : st));
        toast.success(`Card ${slot} saved`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Save failed');
      } finally {
        setSavingSlot(null);
      }
    });
  };

  const activeSlot = slots.find(s => s.slot === selectedSlot) ?? slots[0];
  const slotNums = slots.map(s => s.slot);
  const currentIdx = slotNums.indexOf(selectedSlot);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hero Images</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click any card in the collage to select and edit it. Changes are applied site-wide immediately.
        </p>
      </div>

      {/* Collage preview — mirrors homepage hero layout */}
      <div className="mb-4 rounded-2xl overflow-hidden border border-border bg-muted/30 p-3 sm:p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3">Live Layout Preview</p>
        <CollagePreview slots={slots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
      </div>

      {/* Edit panel for selected card */}
      <SlotEditor
        state={activeSlot}
        onChange={patch => updateSlot(activeSlot.slot, patch)}
        onSave={() => saveSlot(activeSlot.slot)}
        onPrev={() => setSelectedSlot(slotNums[Math.max(0, currentIdx - 1)])}
        onNext={() => setSelectedSlot(slotNums[Math.min(slotNums.length - 1, currentIdx + 1)])}
        saving={savingSlot === activeSlot.slot}
        canPrev={currentIdx > 0}
        canNext={currentIdx < slotNums.length - 1}
      />

      {/* Slot mini-nav */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {slots.map(s => (
          <button
            key={s.slot}
            type="button"
            onClick={() => setSelectedSlot(s.slot)}
            className={cn(
              'w-8 h-8 rounded-full text-[11px] font-bold border transition-all cursor-pointer',
              s.slot === selectedSlot
                ? 'bg-primary text-primary-foreground border-primary scale-110'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
              !s.is_active && 'opacity-40',
            )}
            aria-label={`Select card ${s.slot}`}
            aria-current={s.slot === selectedSlot}
          >
            {s.slot}
          </button>
        ))}
      </div>
    </div>
  );
}
