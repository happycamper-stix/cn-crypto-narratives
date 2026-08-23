// CN Crypto Narratives Telegram bot.
// DM it, or @mention / reply to it in a group, to decode Chinese crypto
// lingo, coin names, tickers, and narratives — grounded in the Obsidian vault.
import "dotenv/config";
import { Bot } from "grammy";
import os from "node:os";
import path from "node:path";
import { loadVault } from "./knowledge.js";
import { buildSystem, answer, analyzePost } from "./claude.js";
import { buildLexicon, matchTerms, buildKolIndex } from "./lexicon.js";
import { fetchPost, extractXUrl } from "./xpost.js";
import { extractTickerCandidates, lookupAll, lookupToken } from "./prices.js";
import { backtestAll } from "./backtest.js";

const VAULT_DIR =
  process.env.VAULT_DIR || path.join(os.homedir(), "cn-crypto-narratives");

if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set. Copy .env.example to .env first.");
  process.exit(1);
}

let notes = loadVault(VAULT_DIR);
let lexicon = buildLexicon(notes);
let kolIndex = buildKolIndex(notes);
buildSystem(VAULT_DIR, notes);
console.log(
  `Loaded ${notes.length} vault notes, ${lexicon.length} lexicon terms, ${kolIndex.size} KOL handles from ${VAULT_DIR}`,
);

// Per-chat rolling history (in-memory; cleared on restart or /clear).
const histories = new Map();
const HISTORY_MAX = 24; // 12 exchanges

function pushHistory(chatId, role, content) {
  const h = histories.get(chatId) ?? [];
  h.push({ role, content });
  while (h.length > HISTORY_MAX) h.shift();
  histories.set(chatId, h);
}

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Telegram caps messages at 4096 chars — split on line boundaries.
async function replyChunked(ctx, text) {
  const chunks = [];
  let current = "";
  for (const line of text.split("\n")) {
    if (current.length + line.length + 1 > 3900) {
      chunks.push(current);
      current = line;
    } else {
      current = current ? current + "\n" + line : line;
    }
  }
  if (current) chunks.push(current);
  for (const chunk of chunks) {
    await ctx.reply(chunk, {
      reply_parameters:
        ctx.chat.type === "private"
          ? undefined
          : { message_id: ctx.message.message_id },
    });
  }
}

function isAddressedToBot(ctx) {
  if (ctx.chat.type === "private") return true;
  const text = ctx.message.text ?? "";
  if (ctx.me.username && text.includes(`@${ctx.me.username}`)) return true;
  if (ctx.message.reply_to_message?.from?.id === ctx.me.id) return true;
  return false;
}

function stripMention(ctx, text) {
  return ctx.me.username
    ? text.replaceAll(`@${ctx.me.username}`, "").trim()
    : text.trim();
}

async function handle(ctx, userText) {
  const chatId = ctx.chat.id;
  await ctx.replyWithChatAction("typing");
  try {
    const history = histories.get(chatId) ?? [];
    const { text, retrieved } = await answer(notes, history, userText);
    pushHistory(chatId, "user", userText);
    pushHistory(chatId, "assistant", text);
    if (retrieved.length) console.log(`[${chatId}] retrieved: ${retrieved.join(", ")}`);
    await replyChunked(ctx, text);
  } catch (err) {
    console.error(err);
    await ctx.reply("Something went wrong talking to the model — try again in a moment.");
  }
}

bot.command("start", (ctx) =>
  ctx.reply(
    "I decode Chinese crypto lingo and narratives into English.\n\n" +
      "- Drop an X/Twitter link and I'll fetch it, translate it, match it against my slang database, price-check the tickers, and score it SIGNAL vs SLOP\n" +
      "- /analyze <link or pasted text> — same pipeline on anything\n" +
      "- /decode <name or ticker> — full naming-mechanics breakdown\n" +
      "- /price <ticker or 中文 name> — quick DEX lookup\n" +
      "- Or just chat about a coin, term, or narrative\n" +
      "- /clear — forget this conversation, /reload — re-read the vault\n\n" +
      "In groups: @mention me or reply to my messages.",
  ),
);

bot.command("decode", async (ctx) => {
  const arg = (ctx.match ?? "").trim();
  if (!arg) return ctx.reply("Usage: /decode <coin name, ticker, or phrase> — e.g. /decode 币安人生");
  await handle(
    ctx,
    `Decode this coin name / ticker / phrase for an English reader — naming mechanics, homophones, number slang, cultural references, and what narrative it plugs into: ${arg}`,
  );
});

bot.command("translate", async (ctx) => {
  const quoted = ctx.message.reply_to_message?.text;
  const arg = (ctx.match ?? "").trim();
  const target = arg || quoted;
  if (!target)
    return ctx.reply("Reply to a message with /translate, or use /translate <text>.");
  await handle(
    ctx,
    `Translate this to natural English, then decode any slang/wordplay the literal translation loses:\n\n${target}`,
  );
});

// Full analysis pipeline: fetch post (or use pasted text) → match vault terms
// → author dossier → DEX price data → Claude verdict.
async function runAnalysis(ctx, input) {
  await ctx.replyWithChatAction("typing");
  try {
    let post;
    if (extractXUrl(input)) {
      post = await fetchPost(input);
      if (post?.error) return ctx.reply(post.error);
    } else {
      post = { text: input, author: {}, stats: {} };
    }
    const matches = matchTerms(lexicon, post.text);
    const kolRow = post.author?.screenName
      ? kolIndex.get(post.author.screenName.toLowerCase())
      : undefined;
    const candidates = extractTickerCandidates(post.text, matches);
    const priceData = candidates.length ? await lookupAll(candidates) : [];
    // If the post has a timestamp, measure price action before/after it.
    const postDateMs = post.date ? new Date(post.date).getTime() : NaN;
    if (priceData.length && !Number.isNaN(postDateMs)) {
      await ctx.replyWithChatAction("typing");
      await backtestAll(priceData, postDateMs);
    }
    await ctx.replyWithChatAction("typing");
    const text = await analyzePost(notes, { post, matches, kolRow, priceData });
    pushHistory(ctx.chat.id, "user", `[analyzed post] ${post.text.slice(0, 500)}`);
    pushHistory(ctx.chat.id, "assistant", text);
    await replyChunked(ctx, text);
  } catch (err) {
    console.error(err);
    await ctx.reply("Analysis failed — try again, or paste the post text directly.");
  }
}

bot.command("analyze", async (ctx) => {
  const arg = (ctx.match ?? "").trim();
  const quoted = ctx.message.reply_to_message?.text;
  const target = arg || quoted;
  if (!target)
    return ctx.reply(
      "Usage: /analyze <X post link or pasted text> — or reply to a forwarded post with /analyze.",
    );
  await runAnalysis(ctx, target);
});

// /backtest <X link> [ticker] — measurement-focused: skips the full decode and
// reports the post-vs-price numbers for the post's tickers (or the given one).
bot.command("backtest", async (ctx) => {
  const arg = (ctx.match ?? "").trim();
  const quoted = ctx.message.reply_to_message?.text;
  const target = arg || quoted;
  if (!target || !extractXUrl(target))
    return ctx.reply("Usage: /backtest <X post link> [ticker] — measures price action around the post's timestamp.");
  await ctx.replyWithChatAction("typing");
  try {
    const post = await fetchPost(target);
    if (post?.error) return ctx.reply(post.error);
    const postDateMs = post.date ? new Date(post.date).getTime() : NaN;
    if (Number.isNaN(postDateMs)) return ctx.reply("Couldn't read the post's timestamp.");
    // Ticker override only from the explicit command argument (never quoted
    // text), and only when it's a single ticker-shaped token — commentary or
    // forwarded prose falls through to extraction.
    const rawOverride = arg.replace(/https?:\/\/\S+/g, "").trim();
    const override = /^\$?[A-Za-z0-9]{1,15}$|^[一-鿿]{2,8}$/.test(rawOverride)
      ? rawOverride.replace(/^\$/, "")
      : "";
    const matches = matchTerms(lexicon, post.text);
    const candidates = override
      ? [override]
      : extractTickerCandidates(post.text, matches);
    if (!candidates.length)
      return ctx.reply("No tickers/coin names found in that post — add one: /backtest <link> <ticker>.");
    const priceData = await lookupAll(candidates);
    await ctx.replyWithChatAction("typing");
    await backtestAll(priceData, postDateMs);
    const lines = [`Post by @${post.author?.screenName} at ${new Date(postDateMs).toISOString().slice(0, 16)}Z`];
    for (const entry of priceData) {
      if (!entry.pairs?.length) {
        lines.push(`\n${entry.query}: no liquid pairs found`);
        continue;
      }
      const p = entry.pairs[0];
      const b = entry.backtest;
      lines.push(`\n${p.symbol} (${p.chain}, pair since ${p.pairCreatedAt ?? "?"})`);
      if (!b || b.error || b.note) {
        lines.push(`  backtest: ${b?.error ?? b?.note ?? "not run"}`);
        continue;
      }
      lines.push(
        `  at post: $${b.priceAtPost}`,
        `  into post: 24h ${fmt(b.before["24h_move_into_post"])} | 6h ${fmt(b.before["6h_move_into_post"])}`,
        `  after: ${Object.entries(b.after).map(([k, v]) => `${k} ${fmt(v)}`).join(" | ") || "(too recent)"}`,
        `  peak after ${fmt(b.peak_after_pct)} | trough ${fmt(b.trough_after_pct)} | now vs post ${fmt(b.now_vs_post_pct)}`,
      );
      if (b.coverage_note) lines.push(`  note: ${b.coverage_note}`);
    }
    await replyChunked(ctx, lines.join("\n"));
  } catch (err) {
    console.error(err);
    await ctx.reply("Backtest failed — try again in a moment.");
  }
});

const fmt = (v) => (v == null ? "n/a" : `${v > 0 ? "+" : ""}${v}%`);

bot.command("price", async (ctx) => {
  const arg = (ctx.match ?? "").trim();
  if (!arg) return ctx.reply("Usage: /price <ticker or name> — e.g. /price 币安人生");
  await ctx.replyWithChatAction("typing");
  const { pairs, error } = await lookupToken(arg);
  if (error || !pairs?.length)
    return ctx.reply(error ? `Lookup failed: ${error}` : `No liquid pairs found for "${arg}".`);
  const lines = pairs.map(
    (p) =>
      `${p.symbol} (${p.name}) on ${p.chain}/${p.dex}\n` +
      `  $${p.priceUsd} | 1h ${p.change?.h1 ?? "?"}% | 24h ${p.change?.h24 ?? "?"}%\n` +
      `  liq $${Math.round(p.liquidityUsd ?? 0).toLocaleString()} | mcap $${Math.round(p.marketCap ?? 0).toLocaleString()} | pair since ${p.pairCreatedAt ?? "?"}`,
  );
  await ctx.reply(lines.join("\n\n"));
});

bot.command("clear", (ctx) => {
  histories.delete(ctx.chat.id);
  return ctx.reply("Conversation cleared.");
});

bot.command("reload", (ctx) => {
  notes = loadVault(VAULT_DIR);
  lexicon = buildLexicon(notes);
  kolIndex = buildKolIndex(notes);
  buildSystem(VAULT_DIR, notes);
  return ctx.reply(
    `Reloaded ${notes.length} vault notes (${lexicon.length} lexicon terms, ${kolIndex.size} KOL handles).`,
  );
});

bot.on("message:text", async (ctx) => {
  if (!isAddressedToBot(ctx)) return;
  const text = stripMention(ctx, ctx.message.text);
  if (!text) return;
  // An X/Twitter link (bare, or with a short comment) triggers full analysis.
  if (extractXUrl(text) && text.length < 400) return runAnalysis(ctx, text);
  // If they replied to someone else's message while mentioning the bot,
  // include the quoted text as the thing to discuss.
  const quoted =
    ctx.message.reply_to_message?.from?.id !== ctx.me.id
      ? ctx.message.reply_to_message?.text
      : undefined;
  const userText = quoted ? `Regarding this message:\n"""${quoted}"""\n\n${text}` : text;
  await handle(ctx, userText);
});

bot.catch((err) => console.error("Bot error:", err));

bot.start({
  onStart: (me) => console.log(`Bot running as @${me.username}`),
});
