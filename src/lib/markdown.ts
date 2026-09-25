// Small, dependency-free markdown renderer for post & case-study bodies:
// headings, bold/italic, inline code, links, lists, blockquotes, paragraphs.

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(s: string) {
  return escapeHtml(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>');
}

export function renderMarkdown(md: string): string {
  const lines = (md || '').replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(' '))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      closeList();
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushPara();
      closeList();
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      flushPara();
      closeList();
      out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`);
      continue;
    }
    const ul = line.match(/^[-*]\s+(.*)$/);
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const want = ul ? 'ul' : 'ol';
      if (listType !== want) {
        closeList();
        listType = want;
        out.push(`<${want}>`);
      }
      out.push(`<li>${inline(ul ? ul[1] : ol![1])}</li>`);
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara();
  closeList();
  return out.join('\n');
}
