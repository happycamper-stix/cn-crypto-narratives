// Loads the Obsidian vault into memory and retrieves the notes most relevant
// to a message. Chinese terms match by exact CJK bigram overlap (characters are
// information-dense, so substring matching works well); English/tickers match
// by word overlap.
import fs from "node:fs";
import path from "node:path";

// Always present in the system prompt (the core lexicon); everything else is
// retrieved per-message.
export const CORE_FILES = [
  "README.md",
  "glossary/trading-slang.md",
  "glossary/coin-nicknames.md",
  "glossary/community-roles.md",
  "glossary/narrative-terms.md",
];

const SKIP_DIRS = new Set([".obsidian", ".git", "node_modules", "bot", "logs"]);

export function loadVault(vaultDir) {
  const notes = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name));
      } else if (entry.name.endsWith(".md")) {
        const abs = path.join(dir, entry.name);
        const rel = path.relative(vaultDir, abs);
        notes.push({ rel, content: fs.readFileSync(abs, "utf8") });
      }
    }
  };
  walk(vaultDir);
  return notes;
}

function cjkBigrams(text) {
  const chars = text.match(/[一-鿿]/g) ?? [];
  const grams = new Set();
  for (let i = 0; i < chars.length - 1; i++) grams.add(chars[i] + chars[i + 1]);
  for (const c of chars) grams.add(c); // single chars too (e.g. 冲, 割)
  return grams;
}

function latinTokens(text) {
  return new Set(
    (text.toLowerCase().match(/[a-z][a-z0-9]{2,}|\$[a-z0-9]+/g) ?? []).filter(
      (w) => !STOPWORDS.has(w),
    ),
  );
}

const STOPWORDS = new Set([
  "the", "and", "for", "what", "does", "mean", "this", "that", "with", "coin",
  "token", "crypto", "chinese", "china", "translate", "translation", "please",
  "can", "you", "about", "meaning", "narrative", "why", "how", "who",
]);

export function retrieve(notes, query, { limit = 5, maxChars = 3500 } = {}) {
  const qGrams = cjkBigrams(query);
  const qWords = latinTokens(query);
  const core = new Set(CORE_FILES);

  const scored = notes
    .filter((n) => !core.has(n.rel))
    .map((n) => {
      let score = 0;
      for (const g of qGrams) {
        if (n.content.includes(g)) score += g.length > 1 ? 3 : 1;
      }
      if (qWords.size) {
        const lower = n.content.toLowerCase();
        for (const w of qWords) if (lower.includes(w)) score += 2;
      }
      return { note: n, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map(({ note }) => ({
    rel: note.rel,
    content:
      note.content.length > maxChars
        ? note.content.slice(0, maxChars) + "\n…(truncated)"
        : note.content,
  }));
}
