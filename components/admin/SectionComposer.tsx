'use client';

import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, X, Plus } from 'lucide-react';
import { BengalButton } from '@/components/bengal';
import { CameraUpload } from './CameraUpload';

export type SectionType = 'hero' | 'richtext' | 'image_text' | 'product_grid' | 'quote' | 'cta' | 'gallery' | 'testimonial';

export type SectionData = {
  id: string; // temp id for drag/drop
  type: SectionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
};

type Props = {
  sections: SectionData[];
  onChange: (sections: SectionData[]) => void;
};

export function SectionComposer({ sections, onChange }: Props) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addSection = (type: SectionType) => {
    const newSection: SectionData = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
    };
    onChange([...sections, newSection]);
    setShowAddMenu(false);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter(s => s.id !== id));
  };

  const updateSectionContent = (id: string, newContent: Record<string, unknown>) => {
    onChange(sections.map(s => s.id === id ? { ...s, content: newContent } : s));
  };

  return (
    <div className="flex flex-col gap-6">
      {sections.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-sm text-muted-foreground mb-4">No sections added yet. Build your page by adding sections.</p>
          <BengalButton type="button" variant="outline" onClick={() => setShowAddMenu(true)}>
            Add First Section
          </BengalButton>
        </div>
      ) : (
        <Reorder.Group axis="y" values={sections} onReorder={onChange} className="flex flex-col gap-4">
          {sections.map((section) => (
            <Reorder.Item key={section.id} value={section} className="bg-card rounded-xl border border-border p-4 shadow-sm relative group cursor-grab active:cursor-grabbing">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-muted-foreground" />
                  <span className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {section.type.replace('_', ' ')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors touch-manipulation -mr-2"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Dynamic Editor based on type */}
              <div className="cursor-auto">
                <SectionEditor section={section} onChange={(content) => updateSectionContent(section.id, content)} />
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {sections.length > 0 && !showAddMenu && (
        <button
          type="button"
          onClick={() => setShowAddMenu(true)}
          className="flex items-center justify-center gap-2 w-full py-4 border border-dashed border-border rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-sm"
        >
          <Plus size={16} /> Add Section
        </button>
      )}

      {showAddMenu && (
        <div className="bg-card p-4 rounded-xl border border-border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-foreground">Select Section Type</h4>
            <button type="button" onClick={() => setShowAddMenu(false)} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground touch-manipulation -mr-2"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['hero', 'richtext', 'image_text', 'product_grid', 'quote', 'cta', 'gallery', 'testimonial'] as SectionType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => addSection(type)}
                className="p-3 min-h-[44px] text-left border border-border rounded-lg hover:border-primary/40 hover:bg-muted active:bg-muted/80 transition-colors touch-manipulation text-foreground"
              >
                <span className="text-xs capitalize">{type.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getDefaultContent(type: SectionType) {
  switch (type) {
    case 'hero': return { title: '', subtitle: '', image_url: '', cta_text: '', cta_url: '' };
    case 'richtext': return { content_en: '', content_bn: '' };
    case 'image_text': return { layout: 'image_left', title: '', text: '', image_url: '' };
    case 'product_grid': return { title: '', collection_id: '' };
    case 'quote': return { text: '', author: '' };
    case 'cta': return { title: '', text: '', button_text: '', button_url: '' };
    case 'gallery': return { images: [] };
    case 'testimonial': return { quote: '', author: '', role: '', image_url: '' };
    default: return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SectionEditor({ section, onChange }: { section: SectionData; onChange: (content: any) => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (key: string, value: any) => {
    onChange({ ...section.content, [key]: value });
  };

  switch (section.type) {
    case 'hero':
      return (
        <div className="flex flex-col gap-3">
          <input type="text" placeholder="Hero Title" value={section.content.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full text-lg font-sans font-semibold tracking-tight p-2 border-b border-border bg-transparent focus:outline-none text-foreground" />
          <input type="text" placeholder="Subtitle" value={section.content.subtitle || ''} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full text-sm p-2 border-b border-border bg-transparent focus:outline-none text-foreground" />
          <div className="mt-2">
            <label className="text-[10px] uppercase mb-1 block text-muted-foreground">Background Image</label>
            <CameraUpload onUpload={(url) => handleChange('image_url', url)} initialUrl={section.content.image_url} />
          </div>
        </div>
      );
    case 'richtext':
      return (
        <div className="flex flex-col gap-3">
          <textarea placeholder="Write your content here (Markdown supported)..." value={section.content.content_en || ''} onChange={(e) => handleChange('content_en', e.target.value)} rows={6} className="w-full text-sm p-3 border border-border bg-transparent rounded focus:outline-none resize-y text-foreground" />
        </div>
      );
    case 'image_text':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase mb-1 block text-muted-foreground">Image</label>
            <CameraUpload onUpload={(url) => handleChange('image_url', url)} initialUrl={section.content.image_url} />
          </div>
          <div className="flex flex-col gap-2">
            <select value={section.content.layout || 'image_left'} onChange={(e) => handleChange('layout', e.target.value)} className="w-full text-sm p-2 border border-border bg-transparent rounded focus:outline-none text-foreground">
              <option value="image_left">Image Left</option>
              <option value="image_right">Image Right</option>
            </select>
            <input type="text" placeholder="Title" value={section.content.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full text-sm font-semibold p-2 border-b border-border bg-transparent focus:outline-none text-foreground" />
            <textarea placeholder="Text content..." value={section.content.text || ''} onChange={(e) => handleChange('text', e.target.value)} rows={4} className="w-full text-sm p-2 border border-border bg-transparent rounded focus:outline-none resize-none text-foreground" />
          </div>
        </div>
      );
    default:
      return <div className="text-sm text-muted-foreground py-4 italic">Editor for {section.type} coming soon. You can still reorder this block.</div>;
  }
}
