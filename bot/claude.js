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

Your stance: you are a Chinese narrative decoder. Your core job is explaining WHY Chinese-speaking crypto money runs one coin over another — the selection mechanics, not just the vocabulary. When a coin or comparison comes up, reason like the CN market does:
- 板块/龙头 grammar: money rotates into a sector (板块) and concentrates in its dragon-head (龙头); the #2 of a hot sector loses to the #1 of a rotating one. Ask "which 板块 is this, and is it the 龙头?"
- Attention gravity: Binance/CZ/何一 adjacency outranks fundamentals — a 一姐 reply is a listing narrative; anything CZ touches becomes a ticker (BROCCOLI, TST, $4).
- Name mechanics as buy-thesis: a blessing-formula name (币安人生 pattern), a perfect homophone, or lucky numbers IS the thesis — 视觉简洁, 情绪饱和, 语义模糊 names win the attention auction.
- 公平发射 resentment: anti-VC "fair launch" framing (铭文 mania) beats VC-backed tokens when 韭菜 anger at 项目方 is the mood.
- 改变命运 psychology: the destiny-ticket driver — low unit price, fresh narrative, "everyone gets to be early once" — explains why old coins can't re-run.
When comparing two coins, walk these axes explicitly and say which narrative advantages one has over the other in CN eyes.

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

// Full X-post analysis: vault-term matching + author dossier + live price data
// → thesis decode + signal/slop verdict. postData/priceData are pre-fetched by
// the caller; matched terms and the rubric ride in the user turn.
// Head-to-head narrative battle analysis (PvP盘): two coins fighting for the
// same rotation. Lays out each side's stance and calls which is running.
export async function pvpCompare(notes, { a, b, retrieved }) {
  const parts = [
    `Two coins are PvPing (PVP盘 — fighting for the same rotation/attention). Compare them as a Chinese narrative decoder and produce, in plain text for Telegram:`,
    `1. THE BATTLE — what these two are actually fighting over (same 板块? same meta? same exchange gravity?).`,
    `2. STANCE A (${a.name}) — its narrative case in CN eyes: naming mechanics, 板块/龙头 position, Binance/KOL adjacency, 公平发射 story, destiny psychology. What its holders SAY and what the name signals.`,
    `3. STANCE B (${b.name}) — same axes.`,
    `4. WHO'S RUNNING — read the momentum + volume data: which one has the rotation now, is it 吸血 (vampiring liquidity from the other), and what narrative advantage explains it. Quote the numbers.`,
    `5. WHAT FLIPS IT — the event that would rotate money the other way (一姐 reply, listing, 龙头 exhaustion, new 板块).`,
    `Never give buy/sell advice — this is narrative analysis, not a recommendation.`,
    "",
    `<coin-a name="${a.name}">`,
    JSON.stringify({ dex: a.dex, momentum: a.momentum }, null, 1),
    "</coin-a>",
    `<coin-b name="${b.name}">`,
    JSON.stringify({ dex: b.dex, momentum: b.momentum }, null, 1),
    "</coin-b>",
  ];
  if (retrieved.length)
    parts.push(
      "",
      "<vault-notes>",
      ...retrieved.map((h) => `<note path="${h.rel}">\n${h.content}\n</note>`),
      "</vault-notes>",
    );

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: systemBlocks,
    messages: [{ role: "user", content: parts.join("\n") }],
  });
  if (response.stop_reason === "refusal") return "I can't analyze that matchup.";
  return response.content
    .filter((t) => t.type === "text")
    .map((t) => t.text)
    .join("\n")
    .trim();
}

export async function analyzePost(notes, { post, matches, kolRow, priceData, authorHistory }) {
  const rubric = notes.find((n) => n.rel === "references/signal-slop-rubric.md");
  const parts = [
    "Analyze this X post from Chinese crypto Twitter. Produce, in plain text for Telegram:",
    "1. TRANSLATION — natural English (if the post is Chinese).",
    "2. TERMS — each vault term the post uses: characters (pinyin, \"literal\") = actual meaning, and what its presence signals.",
    "3. THESIS — what the author is actually claiming/signaling, decoded (narrative, meta, naming mechanics).",
    "4. PRICE REALITY-CHECK — use the DEX data AND the backtest block (price action measured around the post's actual timestamp). Classify the post's timing:",
    "   - FRONT-RAN: big move INTO the post (before.24h/6h strongly positive) — author is narrating or exiting, not calling.",
    "   - EARLY CALL: flat before, sustained gain after (after.24h+ positive, still holding).",
    "   - EXIT-LIQUIDITY PATTERN: pump within hours of the post then bleed (peak_after early, now_vs_post deeply negative).",
    "   - NO EDGE: noise either side.",
    "   Quote the actual numbers (e.g. '+340% into the post, -62% since'). Note fresh pairs, thin liquidity, and any coverage caveats in the data.",
    "5. VERDICT — SIGNAL / MIXED / SLOP with a 0-10 score and the specific rubric markers that drove it. Always end with a line in exactly this shape: 'VERDICT: <SIGNAL|MIXED|SLOP> <n>/10 | TIMING: <FRONT-RAN|EARLY CALL|EXIT-LIQUIDITY|NO EDGE|N/A>'.",
    "If the post pits two coins against each other (or two are priced below), treat it as a PvP盘 read: give each side's narrative stance and which one currently has the rotation and why.",
    "Weight the author: a measured track record (below) of EARLY CALLs raises credibility; FRONT-RAN/EXIT-LIQUIDITY history or directory flags mean read the post as sentiment/exit-marketing, not information. Slop from many accounts converging on one theme is itself a rotation signal — say so when you see it.",
    "Never give buy/sell advice; the verdict is about information quality, not the token.",
    "",
    `<post url="${post.url ?? ""}" author="@${post.author?.screenName ?? "?"}" followers="${post.author?.followers ?? "?"}" likes="${post.stats?.likes ?? "?"}" retweets="${post.stats?.retweets ?? "?"}" views="${post.stats?.views ?? "?"}" date="${post.date ?? "?"}">`,
    post.text,
    "</post>",
  ];
  if (kolRow) parts.push("", `<author-dossier source="cn-ct-kol-directory">`, kolRow, "</author-dossier>");
  if (authorHistory)
    parts.push(
      "",
      `<author-track-record source="this bot's measured history of @${authorHistory.handle}'s analyzed posts">`,
      JSON.stringify(authorHistory, null, 1),
      "</author-track-record>",
    );
  if (matches.length)
    parts.push(
      "",
      "<matched-vault-terms>",
      ...matches.map((m) => `- ${m.term} — ${m.gloss} [${m.source}]`),
      "</matched-vault-terms>",
    );
  if (priceData?.length)
    parts.push("", "<dex-data source=\"dexscreener\">", JSON.stringify(priceData, null, 1), "</dex-data>");
  if (rubric) parts.push("", "<rubric>", rubric.content, "</rubric>");

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: systemBlocks,
    messages: [{ role: "user", content: parts.join("\n") }],
  });

  if (response.stop_reason === "refusal") {
    return "I can't analyze that one.";
  }
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
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
