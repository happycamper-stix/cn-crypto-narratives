// Builds a flat term index from the vault's glossary/pattern tables and atomic
// notes, so any X post or message can be scanned for which vault terms it uses.
// Also indexes the KOL directory so post authors can be checked against known
// reputational flags.

const CJK = /[一-鿿]/;

// Extract terms from markdown table rows whose first cell contains Chinese.
// Row shape: | 割韭菜 | gē jiǔcài | cut leeks | dumping on retail | ... |
function termsFromTables(rel, content) {
  const entries = [];
  for (const line of content.split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length < 3 || !CJK.test(cells[0])) continue;
    if (/^[-: ]+$/.test(cells[1])) continue; // separator row
    // First cell may hold variants: 拉盘 / 砸盘, or wikilinked [[x|拉盘]]
    const raw = cells[0].replace(/\[\[([^\]|]*\|)?/g, "").replace(/\]\]/g, "");
    const variants = raw
      .split(/[\/、,，]/)
      .map((v) => v.trim())
      .filter((v) => CJK.test(v) && v.length >= 2 && v.length <= 12);
    const gloss = cells.slice(1, 5).join(" — ");
    for (const term of variants) entries.push({ term, gloss, source: rel });
  }
  return entries;
}

// Atomic notes: title line like "# 割韭菜 (gē jiǔcài) — "Cutting Leeks""
function termsFromTitles(rel, content) {
  const m = content.match(/^# ([^\n(]*[一-鿿][^\n(]*)/m);
  if (!m) return [];
  const term = m[1].trim();
  if (term.length < 2 || term.length > 14) return [];
  const firstPara = content.split(/\n\n/).find((p) => p.startsWith("**")) ?? "";
  return [{ term, gloss: firstPara.slice(0, 200), source: rel }];
}

export function buildLexicon(notes) {
  const byTerm = new Map();
  for (const n of notes) {
    if (n.rel.startsWith("references/")) continue;
    const found = [...termsFromTables(n.rel, n.content), ...termsFromTitles(n.rel, n.content)];
    for (const e of found) if (!byTerm.has(e.term)) byTerm.set(e.term, e);
  }
  return [...byTerm.values()];
}

export function matchTerms(lexicon, text, cap = 30) {
  const hits = [];
  for (const e of lexicon) {
    if (text.includes(e.term)) hits.push(e);
    if (hits.length >= cap) break;
  }
  // Longer terms first (more specific). A shorter term is shadowed only if
  // EVERY occurrence span of it lies inside an occurrence span of some kept
  // longer term (割韭菜 shadows 韭菜 for that span, but a standalone 韭菜
  // elsewhere in the text keeps the entry).
  hits.sort((a, b) => b.term.length - a.term.length);
  const spansOf = (term) => {
    const spans = [];
    for (let i = text.indexOf(term); i !== -1; i = text.indexOf(term, i + 1))
      spans.push([i, i + term.length]);
    return spans;
  };
  const kept = [];
  for (const h of hits) {
    const supers = kept.filter((k) => k.term.includes(h.term));
    const superSpans = supers.flatMap((k) => spansOf(k.term));
    const uncovered = spansOf(h.term).some(
      ([s, e]) => !superSpans.some(([ks, ke]) => ks <= s && e <= ke),
    );
    if (!supers.length || uncovered) kept.push(h);
  }
  return kept;
}

// KOL directory lookup: parse table rows for @handles and keep the whole row
// as the dossier line.
export function buildKolIndex(notes) {
  const dir = notes.find((n) => n.rel === "references/cn-ct-kol-directory.md");
  if (!dir) return new Map();
  const index = new Map();
  for (const line of dir.content.split("\n")) {
    if (!line.startsWith("|")) continue;
    const handles = line.match(/@([A-Za-z0-9_]{2,20})/g);
    if (!handles) continue;
    for (const h of handles) {
      const key = h.slice(1).toLowerCase();
      if (!index.has(key)) index.set(key, line.trim());
    }
  }
  return index;
}
