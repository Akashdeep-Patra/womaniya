/**
 * MarkdownContent
 *
 * Renders content that may be either:
 *  - TipTap HTML (starts with '<') — rendered directly via dangerouslySetInnerHTML
 *  - Plain markdown text — parsed by `marked` then rendered via dangerouslySetInnerHTML
 *
 * Applies consistent Womaniya prose styles via Tailwind arbitrary-value selectors.
 * All content is admin-authored — no XSS risk from public user input.
 */

import { renderMarkdown, isHtmlContent } from '@/lib/render-markdown';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string | null | undefined;
  className?: string;
}

const PROSE_CLASSES = [
  // Paragraphs
  '[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:text-base [&_p]:sm:text-lg [&_p]:mb-4',
  // Headings
  '[&_h1]:font-editorial [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:text-foreground [&_h1]:tracking-tight [&_h1]:mt-10 [&_h1]:mb-4',
  '[&_h2]:font-editorial [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:text-foreground [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3',
  '[&_h3]:font-editorial [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:text-foreground [&_h3]:tracking-tight [&_h3]:mt-6 [&_h3]:mb-2',
  // Lists
  '[&_ul]:pl-6 [&_ul]:mb-4',
  '[&_ul_li]:text-muted-foreground [&_ul_li]:leading-relaxed [&_ul_li]:mb-1 [&_ul_li]:list-disc',
  '[&_ol]:pl-6 [&_ol]:mb-4',
  '[&_ol_li]:text-muted-foreground [&_ol_li]:leading-relaxed [&_ol_li]:mb-1 [&_ol_li]:list-decimal',
  // Inline
  '[&_strong]:font-semibold [&_strong]:text-foreground',
  '[&_em]:italic',
  // Blockquote
  '[&_blockquote]:border-l-4 [&_blockquote]:border-bengal-sindoor/40 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4',
  // Horizontal rule
  '[&_hr]:border-border [&_hr]:my-6',
  // Links
  '[&_a]:text-bengal-sindoor [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-bengal-sindoor/70',
].join(' ');

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  if (!content?.trim()) return null;

  const html = isHtmlContent(content)
    ? content                   // TipTap HTML — use as-is
    : renderMarkdown(content);  // markdown → HTML

  return (
    <div
      className={cn('font-sans-en', PROSE_CLASSES, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
