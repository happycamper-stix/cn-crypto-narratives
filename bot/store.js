// Persistent per-account track record. Every analyzed post is logged with its
// verdict, score, and measured timing, so "good account vs slop" becomes an
// accumulated measurement instead of a per-post guess. JSON file storage —
// survives restarts, gitignored.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "data");
const FILE = path.join(DATA_DIR, "history.json");
const MAX = 5000;

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { analyses: [] };
  }
}

function save(db) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(db, null, 1));
}

export function recordAnalysis(entry) {
  const db = load();
  db.analyses.push({ at: new Date().toISOString(), ...entry });
  if (db.analyses.length > MAX) db.analyses = db.analyses.slice(-MAX);
  save(db);
}

export function authorStats(handle) {
  if (!handle) return null;
  const h = handle.toLowerCase();
  const rows = load().analyses.filter((a) => a.author?.toLowerCase() === h);
  if (!rows.length) return null;
  const scored = rows.filter((r) => typeof r.score === "number");
  const timings = {};
  for (const r of rows) if (r.timing) timings[r.timing] = (timings[r.timing] ?? 0) + 1;
  return {
    handle,
    posts_analyzed: rows.length,
    avg_signal_score: scored.length
      ? Math.round((scored.reduce((s, r) => s + r.score, 0) / scored.length) * 10) / 10
      : null,
    timing_outcomes: timings, // e.g. { "EARLY CALL": 3, "FRONT-RAN": 5 }
    last_seen: rows[rows.length - 1].at.slice(0, 10),
    recent_tickers: [...new Set(rows.slice(-8).flatMap((r) => r.tickers ?? []))].slice(0, 8),
  };
}

export function topAccounts(minPosts = 2, limit = 15) {
  const byAuthor = new Map();
  for (const a of load().analyses) {
    if (!a.author) continue;
    const k = a.author.toLowerCase();
    byAuthor.set(k, [...(byAuthor.get(k) ?? []), a]);
  }
  const rows = [];
  for (const [handle] of byAuthor) {
    const s = authorStats(handle);
    if (s && s.posts_analyzed >= minPosts) rows.push(s);
  }
  return rows
    .sort((a, b) => (b.avg_signal_score ?? 0) - (a.avg_signal_score ?? 0))
    .slice(0, limit);
}

// Pull verdict metadata out of the model's plain-text analysis.
export function parseVerdict(text) {
  const score = text.match(/(\d{1,2})\s*\/\s*10/);
  const verdict = text.match(/\b(SIGNAL|MIXED|SLOP)\b/);
  const timing = text.match(/\b(FRONT-RAN|EARLY CALL|EXIT-LIQUIDITY(?: PATTERN)?|NO EDGE)\b/i);
  return {
    score: score ? Math.min(10, parseInt(score[1], 10)) : undefined,
    verdict: verdict?.[1],
    timing: timing ? timing[1].toUpperCase().replace(" PATTERN", "") : undefined,
  };
}
