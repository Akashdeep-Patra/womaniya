'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useCallback } from 'react';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Minus, Undo, Redo,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  value: string;        // HTML string (or legacy markdown string)
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// ── Toolbar button ────────────────────────────────────────────────
function ToolBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-md text-xs transition-colors cursor-pointer touch-manipulation shrink-0',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted',
        disabled && 'opacity-30 pointer-events-none',
      )}
    >
      {children}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────
function Sep() {
  return <div className="w-px h-5 bg-border shrink-0" />;
}

// ── Main editor ───────────────────────────────────────────────────
export function RichTextEditor({ value, onChange, placeholder = 'Write your content here…', className }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        codeBlock: false,  // not needed in storefront pages
        code: false,
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[160px] px-4 py-3 text-foreground',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.isEmpty ? '' : editor.getHTML();
      onChange(html);
    },
    immediatelyRender: false, // SSR safe
  });

  // Sync external value → editor when the prop changes (e.g. locale tab switch)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.isEmpty ? '' : editor.getHTML();
    if (currentHtml !== value) {
      editor.commands.setContent(value || '', false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const e = editor;

  return (
    <div className={cn('rounded-xl border border-border overflow-hidden bg-background', className)}>
      {/* ── Toolbar ────────────────────────────────────────────── */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-muted/40 flex-wrap">
        {/* History */}
        <ToolBtn title="Undo" onClick={() => e?.chain().focus().undo().run()} disabled={!e?.can().undo()}>
          <Undo size={14} />
        </ToolBtn>
        <ToolBtn title="Redo" onClick={() => e?.chain().focus().redo().run()} disabled={!e?.can().redo()}>
          <Redo size={14} />
        </ToolBtn>

        <Sep />

        {/* Text style */}
        <ToolBtn title="Bold (⌘B)" active={e?.isActive('bold')} onClick={() => e?.chain().focus().toggleBold().run()}>
          <Bold size={14} />
        </ToolBtn>
        <ToolBtn title="Italic (⌘I)" active={e?.isActive('italic')} onClick={() => e?.chain().focus().toggleItalic().run()}>
          <Italic size={14} />
        </ToolBtn>

        <Sep />

        {/* Headings */}
        <ToolBtn
          title="Heading 2"
          active={e?.isActive('heading', { level: 2 })}
          onClick={() => e?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={14} />
        </ToolBtn>
        <ToolBtn
          title="Heading 3"
          active={e?.isActive('heading', { level: 3 })}
          onClick={() => e?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={14} />
        </ToolBtn>

        <Sep />

        {/* Lists */}
        <ToolBtn
          title="Bullet list"
          active={e?.isActive('bulletList')}
          onClick={() => e?.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </ToolBtn>
        <ToolBtn
          title="Numbered list"
          active={e?.isActive('orderedList')}
          onClick={() => e?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </ToolBtn>
        <ToolBtn
          title="Blockquote"
          active={e?.isActive('blockquote')}
          onClick={() => e?.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={14} />
        </ToolBtn>

        <Sep />

        {/* Divider line */}
        <ToolBtn title="Horizontal rule" onClick={() => e?.chain().focus().setHorizontalRule().run()}>
          <Minus size={14} />
        </ToolBtn>
      </div>

      {/* ── Editable area ──────────────────────────────────────── */}
      <EditorContent
        editor={editor}
        className="[&_.ProseMirror]:min-h-[160px] [&_.ProseMirror]:max-h-[480px] [&_.ProseMirror]:overflow-y-auto
          [&_.ProseMirror_h2]:font-editorial [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:text-foreground
          [&_.ProseMirror_h3]:font-editorial [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mb-2 [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:text-foreground
          [&_.ProseMirror_p]:text-sm [&_.ProseMirror_p]:leading-relaxed [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_p]:text-muted-foreground
          [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul]:mb-3 [&_.ProseMirror_ul_li]:text-sm [&_.ProseMirror_ul_li]:text-muted-foreground [&_.ProseMirror_ul_li]:mb-1
          [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol]:mb-3 [&_.ProseMirror_ol_li]:text-sm [&_.ProseMirror_ol_li]:text-muted-foreground [&_.ProseMirror_ol_li]:mb-1
          [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary/40 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:my-3
          [&_.ProseMirror_hr]:border-border [&_.ProseMirror_hr]:my-4
          [&_.ProseMirror_strong]:font-semibold [&_.ProseMirror_strong]:text-foreground
          [&_.ProseMirror_em]:italic
          [&_.ProseMirror.ProseMirror-focused]:outline-none
          [&_.ProseMirror_p.is-editor-empty:first-child:before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child:before]:text-muted-foreground/50 [&_.ProseMirror_p.is-editor-empty:first-child:before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child:before]:pointer-events-none"
      />
    </div>
  );
}
