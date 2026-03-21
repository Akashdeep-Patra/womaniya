'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Save, Eye, EyeOff, ImageOff, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { BengalButton } from '@/components/bengal';
import { CameraUpload } from '@/components/admin/CameraUpload';
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

// ─── Collage positions — mirrors HeroSection.tsx desktop layout exactly ──
const COLLAGE = [
  { slot: 5, cls: 'top-[12%] left-[2%] w-[38%] h-[55%]',         z: 0,  r: 'rounded-2xl' },
  { slot: 1, cls: 'bottom-[2%] left-[12%] w-[45%] h-[75%]',      z: 20, r: 'rounded-3xl' },
  { slot: 2, cls: 'top-[8%] right-[5%] w-[42%] h-[60%]',         z: 10, r: 'rounded-2xl' },
  { slot: 4, cls: 'bottom-[4%] right-[2%] w-[35%] h-[45%]',      z: 10, r: 'rounded-2xl' },
  { slot: 3, cls: 'bottom-[20%] right-[32%] w-[22%] aspect-4/5', z: 30, r: 'rounded-xl'  },
] as const;

// ─── State ────────────────────────────────────────────────────────
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

// ─── In-place popover for a single card ──────────────────────────
function CardPopover({
  state,
  onChange,
  onSave,
  onClose,
  saving,
}: {
  state: SlotState;
  onChange: (patch: Partial<Omit<SlotState, 'slot' | 'persisted'>>) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Dim backdrop — click to close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
        style={{ zIndex: 50 }}
        onClick={onClose}
      />

      {/* Popover panel — centred in collage */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 8 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(360px,90%)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        style={{ zIndex: 51 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-foreground">Card {state.slot}</span>
            <button
              type="button"
              onClick={() => onChange({ is_active: !state.is_active })}
              className={cn(
                'flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full border transition-colors cursor-pointer',
                state.is_active
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-muted text-muted-foreground border-border hover:text-foreground',
              )}
            >
              {state.is_active ? <Eye size={10} /> : <EyeOff size={10} />}
              {state.is_active ? 'Visible' : 'Hidden'}
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Upload — drag & drop + media library */}
          <CameraUpload
            name={`hero-slot-${state.slot}`}
            initialUrl={state.src || null}
            onUpload={url => onChange({ src: url })}
            pathPrefix="hero"
            enableLibrary
          />

          {/* Alt text */}
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

          {/* Focus point */}
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
            className="w-full"
          >
            <Save size={13} className="mr-1.5" />
            {saving ? 'Saving…' : state.persisted ? 'Update Card' : 'Save Card'}
          </BengalButton>
        </div>
      </motion.div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────
type Props = { initialImages: HeroImage[] };

export function HeroImageManagerClient({ initialImages }: Props) {
  const [slots, setSlots] = useState<SlotState[]>(() => buildInitialSlots(initialImages));
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
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
        setEditingSlot(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Save failed');
      } finally {
        setSavingSlot(null);
      }
    });
  };

  const activeState = slots.find(s => s.slot === editingSlot);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hero Images</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click any card to upload a new image or adjust settings. Drag &amp; drop or pick from the media library.
        </p>
      </div>

      {/* Collage — relative container so the popover can position absolutely inside it */}
      <div className="rounded-2xl overflow-hidden border border-border bg-muted/20 p-3 sm:p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold mb-3">
          Homepage Hero — click any card to edit
        </p>

        <div className="relative w-full" style={{ paddingBottom: '64%' }}>
          <div className="absolute inset-0">

            {/* Cards */}
            {COLLAGE.map(({ slot, cls, z, r }) => {
              const s = slots.find(x => x.slot === slot);
              if (!s) return null;
              const isEditing = editingSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setEditingSlot(slot)}
                  className={cn(
                    'absolute overflow-hidden border-[3px] cursor-pointer transition-all duration-200 bg-muted group',
                    r, cls,
                    isEditing
                      ? 'border-primary shadow-[0_0_0_2px_hsl(var(--primary))] scale-[1.02]'
                      : 'border-background hover:border-primary/60 hover:scale-[1.01]',
                    !s.is_active && 'opacity-40',
                    editingSlot !== null && !isEditing && 'opacity-30',
                  )}
                  style={{ zIndex: isEditing ? 40 : z }}
                  aria-label={`Edit card ${slot}`}
                  aria-haspopup="dialog"
                  aria-expanded={isEditing}
                >
                  {s.src ? (
                    <Image
                      src={s.src}
                      alt={s.alt || `Card ${slot}`}
                      fill
                      className="object-cover"
                      style={{ objectPosition: s.position }}
                      unoptimized={s.src.startsWith('http') && !s.src.includes('vercel-storage.com')}
                      sizes="40vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageOff size={20} className="text-muted-foreground/40" />
                    </div>
                  )}

                  {/* Slot badge */}
                  <div className={cn(
                    'absolute top-1.5 left-1.5 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full transition-colors pointer-events-none',
                    isEditing ? 'bg-primary text-primary-foreground' : 'bg-background/80 text-foreground/70',
                  )}>
                    {slot}
                  </div>

                  {/* Edit hint on hover */}
                  {!isEditing && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="text-white text-[9px] font-bold tracking-[0.2em] uppercase bg-black/60 px-2 py-1 rounded-full">Edit</span>
                    </div>
                  )}

                  {!s.is_active && (
                    <div className="absolute bottom-1.5 right-1.5 bg-background/80 text-[8px] font-semibold uppercase tracking-widest text-muted-foreground px-1.5 py-0.5 rounded-full pointer-events-none">
                      Hidden
                    </div>
                  )}
                </button>
              );
            })}

            {/* In-place popover */}
            <AnimatePresence>
              {editingSlot !== null && activeState && (
                <CardPopover
                  key={editingSlot}
                  state={activeState}
                  onChange={patch => updateSlot(editingSlot, patch)}
                  onSave={() => saveSlot(editingSlot)}
                  onClose={() => setEditingSlot(null)}
                  saving={savingSlot === editingSlot}
                />
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      {/* Slot quick-nav pills */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {slots.map(s => (
          <button
            key={s.slot}
            type="button"
            onClick={() => setEditingSlot(s.slot)}
            className={cn(
              'w-8 h-8 rounded-full text-[11px] font-bold border transition-all cursor-pointer',
              s.slot === editingSlot
                ? 'bg-primary text-primary-foreground border-primary scale-110'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
              !s.is_active && 'opacity-40',
            )}
            aria-label={`Edit card ${s.slot}`}
          >
            {s.slot}
          </button>
        ))}
      </div>
    </div>
  );
}
