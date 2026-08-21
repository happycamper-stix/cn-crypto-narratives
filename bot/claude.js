// Claude API wrapper: builds the cached system prompt from the vault's core
// lexicon and answers with per-message retrieved notes injected into the turn.
import Anthropic from "@anthropic-ai/sdk";
import path from "node:path";
import { CORE_FILES, retrieve } from "./knowledge.js";

const MODEL = process.env.CLAUDE_MODEL || "claude-opus-5";

// Zero-arg client: resolves ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN, or an
// `ant auth login` profile from the environment.
const client = new Anthropic();

const PERSONA = `You are the CN Crypto Narratives bot — a bilingual decoder of Chinese crypto lingo, coin names, tickers, and narratives, speaking to English readers on Telegram.

Your knowledge base is an Obsidian vault (notes are included below and per-message). Ground your answers in it; when a vault note covers the topic, use its framing and mention the note name (e.g. "see homophone-wordplay"). Knowledge-base content marked "(?)" means checked-but-unattested — keep that caveat when repeating it.

Rules:
- Always gloss Chinese terms as: characters (pinyin, "literal") = actual meaning. Example: 割韭菜 (gē jiǔcài, "cut leeks") = dumping on retail.
- When asked to translate Chinese text (a tweet, a message, a coin name), give: (1) natural English translation, (2) a decode of slang/wordplay the literal translation loses — homophones, number codes, kinship/food metaphors, censorship euphemisms.
- When asked about a coin/ticker with a Chinese name, decode the naming mechanics: read it aloud in pinyin, check homophones, number slang, blessing formulas, CZ/Binance adjacency, and say what a Chinese reader sees that an English reader doesn't.
- You are an analyst, not a financial advisor: never recommend buying/selling, never predict prices. Naming a coin's narrative mechanics is fine; investment advice is not.
- Telegram output: plain text only — no markdown headers, no tables, no asterisks. Short paragraphs and simple dashes for lists. Keep replies under ~300 words unless the user asks for depth. Chinese characters always accompanied by pinyin + meaning.
- If something isn't in the knowledge base and you aren't confident, say so plainly rather than inventing an etymology.`;

let systemBlocks = null;

export function buildSystem(vaultDir, notes) {
  const coreSet = new Map(notes.map((n) => [n.rel, n.content]));
  const coreText = CORE_FILES.filter((f) => coreSet.has(f))
    .map((f) => `<note path="${f}">\n${coreSet.get(f)}\n</note>`)
    .join("\n\n");
  systemBlocks = [
    {
      type: "text",
      text: `${PERSONA}\n\n# Core knowledge base (vault: ${path.basename(vaultDir)})\n\n${coreText}`,
      cache_control: { type: "ephemeral" },
    },
  ];
}

export async function answer(notes, history, userText) {
  const hits = retrieve(notes, userText);
  const contextBlock = hits.length
    ? `<retrieved-notes>\n${hits
        .map((h) => `<note path="${h.rel}">\n${h.content}\n</note>`)
        .join("\n\n")}\n</retrieved-notes>\n\n`
    : "";

  const messages = [
    ...history,
    { role: "user", content: contextBlock + userText },
  ];

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: systemBlocks,
    messages,
  });

  if (response.stop_reason === "refusal") {
    return {
      text: "I can't help with that one — try rephrasing, or ask about the lingo/narrative side.",
      retrieved: hits.map((h) => h.rel),
    };
  }

  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  return { text: text || "(empty response)", retrieved: hits.map((h) => h.rel) };
}
