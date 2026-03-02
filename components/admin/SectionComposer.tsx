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
        <div className="text-center py-12 border border-dashed border-bengal-kansa/30 rounded-2xl bg-white/50">
          <p className="text-sm text-bengal-kajal/50 mb-4">No sections added yet. Build your page by adding sections.</p>
          <BengalButton type="button" variant="outline" onClick={() => setShowAddMenu(true)}>
            Add First Section
          </BengalButton>
        </div>
      ) : (
        <Reorder.Group axis="y" values={sections} onReorder={onChange} className="flex flex-col gap-4">
          {sections.map((section) => (
            <Reorder.Item key={section.id} value={section} className="bg-white rounded-xl border border-bengal-kansa/20 p-4 shadow-sm relative group cursor-grab active:cursor-grabbing">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-bengal-kansa/10">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-bengal-kajal/20" />
                  <span className="text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/60 bg-bengal-mati px-2 py-1 rounded">
                    {section.type.replace('_', ' ')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="p-1.5 text-bengal-kajal/30 hover:text-bengal-alta transition-colors"
                >
                  <X size={16} />
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
          className="flex items-center justify-center gap-2 w-full py-4 border border-dashed border-bengal-kansa/30 rounded-xl text-bengal-kajal/50 hover:bg-bengal-mati/50 hover:text-bengal-kajal transition-colors text-sm"
        >
          <Plus size={16} /> Add Section
        </button>
      )}

      {showAddMenu && (
        <div className="bg-white p-4 rounded-xl border border-bengal-kansa/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-bengal-kajal">Select Section Type</h4>
            <button type="button" onClick={() => setShowAddMenu(false)} className="text-bengal-kajal/40 hover:text-bengal-kajal"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['hero', 'richtext', 'image_text', 'product_grid', 'quote', 'cta', 'gallery', 'testimonial'] as SectionType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => addSection(type)}
                className="p-3 text-left border border-bengal-kansa/10 rounded-lg hover:border-bengal-kansa/40 hover:bg-bengal-mati/50 transition-colors"
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
          <input type="text" placeholder="Hero Title" value={section.content.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full text-lg font-editorial p-2 border-b border-bengal-kansa/20 focus:outline-none" />
          <input type="text" placeholder="Subtitle" value={section.content.subtitle || ''} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full text-sm p-2 border-b border-bengal-kansa/20 focus:outline-none" />
          <div className="mt-2">
            <label className="text-[10px] uppercase mb-1 block">Background Image</label>
            <CameraUpload onUpload={(url) => handleChange('image_url', url)} initialUrl={section.content.image_url} />
          </div>
        </div>
      );
    case 'richtext':
      return (
        <div className="flex flex-col gap-3">
          <textarea placeholder="Write your content here (Markdown supported)..." value={section.content.content_en || ''} onChange={(e) => handleChange('content_en', e.target.value)} rows={6} className="w-full text-sm p-3 border border-bengal-kansa/20 rounded focus:outline-none resize-y" />
        </div>
      );
    case 'image_text':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase mb-1 block">Image</label>
            <CameraUpload onUpload={(url) => handleChange('image_url', url)} initialUrl={section.content.image_url} />
          </div>
          <div className="flex flex-col gap-2">
            <select value={section.content.layout || 'image_left'} onChange={(e) => handleChange('layout', e.target.value)} className="w-full text-sm p-2 border border-bengal-kansa/20 rounded focus:outline-none">
              <option value="image_left">Image Left</option>
              <option value="image_right">Image Right</option>
            </select>
            <input type="text" placeholder="Title" value={section.content.title || ''} onChange={(e) => handleChange('title', e.target.value)} className="w-full text-sm font-semibold p-2 border-b border-bengal-kansa/20 focus:outline-none" />
            <textarea placeholder="Text content..." value={section.content.text || ''} onChange={(e) => handleChange('text', e.target.value)} rows={4} className="w-full text-sm p-2 border border-bengal-kansa/20 rounded focus:outline-none resize-none" />
          </div>
        </div>
      );
    default:
      return <div className="text-sm text-bengal-kajal/50 py-4 italic">Editor for {section.type} coming soon. You can still reorder this block.</div>;
  }
}
