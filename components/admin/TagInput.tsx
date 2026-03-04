import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function TagInput({ tags, onChange, placeholder = 'Type and press enter...', label }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1.5 bg-bengal-mati text-foreground rounded-full border border-bengal-kansa/30 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-foreground/50 hover:text-bengal-alta touch-manipulation min-h-[24px] min-w-[24px] flex items-center justify-center -mr-1"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-sm border bg-bengal-cream text-foreground text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors border-bengal-kansa/30"
      />
    </div>
  );
}