// Provider adapter. Preferred path: the Anthropic API via the official SDK
// (prompt caching on the big system prompt, server-side refusal fallbacks).
// Fallback path: an OpenRouter key (sk-or-v1-…) via their OpenAI-compatible
// API — still Claude models, routed through OpenRouter; no prompt caching, so
// each request re-sends the full system prompt at full price.
import Anthropic from "@anthropic-ai/sdk";

const OR_BASE = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const OR_MODEL = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4.5";
const ANTHROPIC_MODEL = process.env.CLAUDE_MODEL || "claude-opus-5";

export const provider = process.env.ANTHROPIC_API_KEY
  ? "anthropic"
  : process.env.OPENROUTER_API_KEY
    ? "openrouter"
    : "anthropic"; // zero-arg SDK also resolves `ant auth login` profiles

let anthropicClient = null;
if (provider === "anthropic") anthropicClient = new Anthropic();

export function describeProvider() {
  return provider === "anthropic"
    ? `Anthropic API (${ANTHROPIC_MODEL})`
    : `OpenRouter (${OR_MODEL})`;
}

/**
 * Run one completion. systemBlocks: Anthropic-style system array (text blocks,
 * possibly with cache_control). messages: [{role: "user"|"assistant", content: string}].
 * Returns { text, refused }.
 */
export async function complete({ systemBlocks, messages, maxTokens = 8000 }) {
  if (provider === "anthropic") {
    const response = await anthropicClient.beta.messages.create({
      model: ANTHROPIC_MODEL,
      max_tokens: maxTokens,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: systemBlocks,
      messages,
    });
    if (response.stop_reason === "refusal") return { text: "", refused: true };
    return {
      text: response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim(),
      refused: false,
    };
  }

  // OpenRouter (OpenAI-compatible). Flatten system blocks to one system message.
  const systemText = systemBlocks.map((b) => b.text).join("\n\n");
  const res = await fetch(`${OR_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "content-type": "application/json",
      "x-title": "cn-crypto-narratives-bot",
    },
    body: JSON.stringify({
      model: OR_MODEL,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: systemText },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("OpenRouter: invalid API key (401)");
    if (res.status === 404 || body.includes("not a valid model"))
      throw new Error(
        `OpenRouter: model "${OR_MODEL}" not found — set OPENROUTER_MODEL in .env to a current slug from openrouter.ai/models (e.g. an anthropic/claude-* model)`,
      );
    throw new Error(`OpenRouter HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  if (!text && data.error) throw new Error(`OpenRouter error: ${JSON.stringify(data.error).slice(0, 200)}`);
  return { text, refused: false };
}
