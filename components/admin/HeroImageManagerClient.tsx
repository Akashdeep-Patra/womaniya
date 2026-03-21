'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Save, Eye, EyeOff, ImageOff } from 'lucide-react';
import { toast } from 'sonner';
import { BengalButton } from '@/components/bengal';
import { upsertHeroImage } from '@/actions/hero-images';
import type { HeroImage } from '@/db/schema';

// Default fallback data matching the current hardcoded IMAGES const in HeroSection
const SLOT_DEFAULTS = [
  { slot: 1, src: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',  alt: 'Ikkat Rupkotha — Blue Pochampally handloom bustier dress editorial portrait', position: '50% 10%', is_active: true },
  { slot: 2, src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',  alt: 'Red handloom Jamdani patchwork skirt against heritage red wall',              position: '50% 20%', is_active: true },
  { slot: 3, src: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',  alt: 'Meher — spinning in Ikkat Pochampally dress, capturing movement and craft',    position: '50% 15%', is_active: true },
  { slot: 4, src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',  alt: 'Womaniya handloom editorial — artisan weave detail',                          position: '50% 30%', is_active: true },
  { slot: 5, src: '/instagram/2026-02-02_12-37-01_UTC_6.jpg',  alt: 'Close-up of Ikkat Pochampally handwoven textile pattern',                      position: '30% 50%', is_active: true },
] as const;

type SlotState = {
  slot: number;
  src: string;
  alt: string;
  position: string;
  is_active: boolean;
  /** true = row exists in DB; false = using hardcoded fallback */
  persisted: boolean;
};

function buildInitialSlots(dbImages: HeroImage[]): SlotState[] {
  return SLOT_DEFAULTS.map((def) => {
    const dbRow = dbImages.find(r => r.slot === def.slot);
    if (dbRow) {
      return { slot: dbRow.slot, src: dbRow.src, alt: dbRow.alt, position: dbRow.position, is_active: dbRow.is_active, persisted: true };
    }
    return { slot: def.slot, src: def.src, alt: def.alt, position: def.position, is_active: def.is_active, persisted: false };
  });
}

type SlotEditorProps = {
  state: SlotState;
  onChange: (patch: Partial<Omit<SlotState, 'slot' | 'persisted'>>) => void;
  onSave: () => void;
  saving: boolean;
};

function SlotEditor({ state, onChange, onSave, saving }: SlotEditorProps) {
  const [imgError, setImgError] = useState(false);

  const handleSrcChange = (v: string) => {
    setImgError(false);
    onChange({ src: v });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Preview */}
      <div className="relative w-full aspect-3/4 bg-muted">
        {state.src && !imgError ? (
          <Image
            src={state.src}
            alt={state.alt || `Hero slot ${state.slot}`}
            fill
            className="object-cover"
            style={{ objectPosition: state.position }}
            onError={() => setImgError(true)}
            unoptimized={state.src.startsWith('http')}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff size={32} strokeWidth={1.5} />
            <span className="text-xs">No preview</span>
          </div>
        )}

        {/* Slot badge */}
        <div className="absolute top-2 left-2 bg-background/90 text-foreground text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border border-border">
          Card {state.slot}
        </div>

        {/* Active toggle overlay */}
        <button
          type="button"
          onClick={() => onChange({ is_active: !state.is_active })}
          className="absolute top-2 right-2 bg-background/90 text-foreground p-1.5 rounded-full border border-border cursor-pointer hover:bg-background transition-colors"
          aria-label={state.is_active ? 'Deactivate slot' : 'Activate slot'}
        >
          {state.is_active ? <Eye size={14} /> : <EyeOff size={14} className="text-muted-foreground" />}
        </button>

        {!state.is_active && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Hidden</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold" htmlFor={`src-${state.slot}`}>
            Image URL / Path
          </label>
          <input
            id={`src-${state.slot}`}
            type="text"
            value={state.src}
            onChange={e => handleSrcChange(e.target.value)}
            placeholder="/instagram/photo.jpg or https://..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold" htmlFor={`alt-${state.slot}`}>
            Alt Text
          </label>
          <input
            id={`alt-${state.slot}`}
            type="text"
            value={state.alt}
            onChange={e => onChange({ alt: e.target.value })}
            placeholder="Describe the image..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold" htmlFor={`pos-${state.slot}`}>
            Object Position
          </label>
          <input
            id={`pos-${state.slot}`}
            type="text"
            value={state.position}
            onChange={e => onChange({ position: e.target.value })}
            placeholder="50% 50%"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-[10px] text-muted-foreground">CSS <code>object-position</code> — e.g. <code>50% 20%</code>, <code>30% top</code></p>
        </div>

        <BengalButton
          variant="primary"
          size="sm"
          onClick={onSave}
          disabled={saving || !state.src.trim()}
          className="w-full flex items-center justify-center gap-2"
        >
          <Save size={14} />
          {saving ? 'Saving…' : state.persisted ? 'Update' : 'Save'}
        </BengalButton>
      </div>
    </div>
  );
}

type Props = { initialImages: HeroImage[] };

export function HeroImageManagerClient({ initialImages }: Props) {
  const [slots, setSlots] = useState<SlotState[]>(() => buildInitialSlots(initialImages));
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
        await upsertHeroImage({
          slot: s.slot,
          src: s.src.trim(),
          alt: s.alt.trim(),
          position: s.position.trim() || '50% 50%',
          is_active: s.is_active,
        });
        setSlots(prev => prev.map(st => st.slot === slot ? { ...st, persisted: true } : st));
        toast.success(`Hero card ${slot} saved`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Save failed';
        toast.error(msg);
      } finally {
        setSavingSlot(null);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hero Images</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage the 5 editorial photo cards displayed in the homepage hero. Paste a Vercel Blob URL or a public path (e.g. <code className="text-xs bg-muted px-1 py-0.5 rounded">/instagram/photo.jpg</code>). Changes are applied site-wide immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {slots.map(s => (
          <SlotEditor
            key={s.slot}
            state={s}
            onChange={patch => updateSlot(s.slot, patch)}
            onSave={() => saveSlot(s.slot)}
            saving={savingSlot === s.slot}
          />
        ))}
      </div>
    </div>
  );
}
