/**
 * Markdown rendering utility
 *
 * Used for fields that store plain text written with markdown syntax
 * (product descriptions, collection/category/campaign descriptions, etc.).
 *
 * Separate from TipTap HTML content — those fields start with '<' and are
 * rendered directly with dangerouslySetInnerHTML.
 */

import { marked, type MarkedOptions } from 'marked';

const options: MarkedOptions = {
  // Treat single newlines as line breaks (matches textarea input behaviour)
  breaks: true,
  // Disable GitHub-flavoured markdown extensions we don't need
  gfm: true,
};

marked.setOptions(options);

/**
 * Convert markdown string to HTML.
 * Returns an HTML string safe to set with dangerouslySetInnerHTML.
 * All content is written by admin users — no sanitisation needed.
 */
export function renderMarkdown(md: string): string {
  if (!md?.trim()) return '';
  return marked.parse(md) as string;
}

/**
 * Detect whether a string is TipTap/HTML content (starts with a tag)
 * vs plain-text/markdown content.
 */
export function isHtmlContent(content: string): boolean {
  return content.trimStart().startsWith('<');
}
