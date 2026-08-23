// Price reality-check via the free DexScreener search API. Given tickers or
// coin names (Chinese names work — DexScreener indexes 币安人生-style tokens),
// returns the top pairs by liquidity with price + momentum data.

const CJK_RUN = /[一-鿿]{2,8}/g;
const CASHTAG = /\$[A-Za-z][A-Za-z0-9]{1,14}/g;

// Candidate queries from a post: $cashtags plus CJK runs that are NOT vault
// slang (those runs are likely coin names, e.g. 币安人生, 我踏马来了).
export function extractTickerCandidates(text, matchedTerms, cap = 5) {
  const slang = new Set(matchedTerms.map((m) => m.term));
  const tags = (text.match(CASHTAG) ?? []).map((t) => t.slice(1));
  const clean = [];
  const mixed = [];
  for (const run of text.match(CJK_RUN) ?? []) {
    // A run that IS slang (or a fragment of one) is vocabulary, not a name.
    if (slang.has(run) || [...slang].some((s) => s.includes(run))) continue;
    // A run merely CONTAINING slang (币安人生 ⊃ 币安) may be a coin name OR a
    // phrase (最后上车机会) — rank it below slang-free runs; DexScreener
    // returning no pairs is the final filter either way.
    if ([...slang].some((s) => run.includes(s))) mixed.push(run);
    else clean.push(run);
  }
  return [...new Set([...tags, ...clean, ...mixed])].slice(0, cap);
}

export async function lookupToken(query) {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!res.ok) return { query, error: `HTTP ${res.status}` };
    const data = await res.json();
    const pairs = (data.pairs ?? [])
      .filter((p) => p.liquidity?.usd > 1000)
      .sort((a, b) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0))
      .slice(0, 2)
      .map((p) => ({
        symbol: p.baseToken?.symbol,
        name: p.baseToken?.name,
        chain: p.chainId,
        dex: p.dexId,
        priceUsd: p.priceUsd,
        change: p.priceChange, // { m5, h1, h6, h24 } in %
        volume24h: p.volume?.h24,
        liquidityUsd: p.liquidity?.usd,
        marketCap: p.marketCap ?? p.fdv,
        pairCreatedAt: p.pairCreatedAt
          ? new Date(p.pairCreatedAt).toISOString().slice(0, 10)
          : null,
      }));
    return { query, pairs };
  } catch (e) {
    return { query, error: String(e.message ?? e) };
  }
}

export async function lookupAll(queries) {
  return Promise.all(queries.map(lookupToken));
}
