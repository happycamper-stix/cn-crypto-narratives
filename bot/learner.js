// Persistent learning: after a substantive exchange, ask the model whether the
// conversation surfaced a NEW Chinese-crypto term/fact worth keeping. If yes,
// write it into the vault's learned/ folder (marked unverified), where it
// immediately joins the live lexicon and retrieval.
//
// Guardrails: dedupe against everything already in the vault, a daily cap so
// one chatty day can't flood the vault, throttling between checks, and the
// caller restricts learning to private chats (group members must not be able
// to teach the bot).
import fs from "node:fs";
import path from "node:path";
import { complete } from "./llm.js";

const DAILY_CAP = 10;
const MIN_INTERVAL_MS = 120_000;
let lastCheck = 0;

const LEARN_SYSTEM = [
  {
    type: "text",
    text: `You curate a knowledge vault decoding Chinese crypto slang and narratives into English. Given one exchange from a chat, decide if it surfaced a SPECIFIC NEW piece of durable knowledge worth saving: a Chinese term/phrase with its real meaning, a naming-mechanics fact, a narrative/meta fact, or a correction to existing knowledge. General chat, opinions, price talk, or anything vague: not worth saving. Be strict — most exchanges contain nothing new; reply with exactly NOTHING for those.

If (and only if) there is something, reply in EXACTLY this format, nothing else:
TITLE: <short English title, include the Chinese term if there is one>
TERM: <the Chinese term/phrase, or ->
NOTE:
<5-15 lines of markdown: the term glossed as characters (pinyin, "literal") = actual meaning, the mechanics/context, and an example if one appeared. Mark anything uncertain with (?).>`,
  },
];

function slugify(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9一-鿿]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "note"
  );
}

function parseLearning(reply) {
  if (!reply || /^\s*NOTHING\b/.test(reply)) return null;
  const title = reply.match(/^TITLE:\s*(.+)$/m)?.[1]?.trim();
  const term = reply.match(/^TERM:\s*(.+)$/m)?.[1]?.trim();
  const note = reply.split(/^NOTE:\s*$/m)[1]?.trim();
  if (!title || !note || note.length < 40) return null;
  return { title, term: term === "-" ? null : term, note };
}

export function writeLearnedNote(vaultDir, { title, term, note }) {
  const dir = path.join(vaultDir, "learned");
  fs.mkdirSync(dir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(dir, `${date}-${slugify(title)}.md`);
  if (fs.existsSync(file)) return null;
  const todayCount = fs.readdirSync(dir).filter((f) => f.startsWith(date)).length;
  if (todayCount >= DAILY_CAP) return null;
  const h1 = term ? `${term} — ${title.replace(term, "").trim() || title}` : title;
  fs.writeFileSync(
    file,
    `---
title: ${title.replaceAll(":", " —")}
tags: [cn-crypto-narratives, learned]
created: ${date}
updated: ${date}
status: unverified
type: learned
---

# ${h1}

${note}

## Provenance
Learned from a bot conversation on ${date}. Unverified (?) — needs research
confirmation before promotion into the curated glossary.

## Related links
- [[research-methodology]]
- [[sources]]
`,
  );
  return file;
}

/**
 * Fire-and-forget learning check. Returns the saved note's filename (or null).
 * notes/lexicon are the CURRENT in-memory vault, used for dedupe.
 */
export async function maybeLearn({ vaultDir, notes, lexicon, userText, botText }) {
  const now = Date.now();
  if (now - lastCheck < MIN_INTERVAL_MS) return null;
  lastCheck = now;

  const { text: reply } = await complete({
    systemBlocks: LEARN_SYSTEM,
    messages: [
      {
        role: "user",
        content: `<user-message>\n${userText.slice(0, 1500)}\n</user-message>\n\n<bot-reply>\n${botText.slice(0, 2500)}\n</bot-reply>`,
      },
    ],
    maxTokens: 800,
  });
  const learning = parseLearning(reply);
  if (!learning) return null;

  // Dedupe: term already in the lexicon, or already discussed in the vault.
  if (learning.term) {
    if (lexicon.some((e) => e.term === learning.term)) return null;
    const inVault = notes.filter((n) => n.content.includes(learning.term)).length;
    if (inVault >= 2) return null; // already covered in multiple notes
  } else if (notes.some((n) => n.content.toLowerCase().includes(learning.title.toLowerCase()))) {
    return null;
  }

  return writeLearnedNote(vaultDir, learning);
}
