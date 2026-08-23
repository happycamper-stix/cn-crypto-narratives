// Post-timestamp-vs-price-history backtesting.
// Given a pair (from DexScreener) and a post's timestamp, fetch OHLCV candles
// around the timestamp from GeckoTerminal's free API and measure what the price
// did BEFORE the post (front-running / narrating detection) and AFTER it
// (follow-through, peak, drawdown).
//
// Measurement rules (each prevents a specific bias):
// - GeckoTerminal candle timestamps are period-START. Sampling "price at ts"
//   uses the CLOSE of the last candle that fully ended at-or-before ts, falling
//   back to the OPEN of the candle containing ts — never the containing
//   candle's close, which would leak post-publication price into the baseline.
// - Sub-candle windows are not reported (daily candles can't measure a 6h move;
//   they'd read as a fake 0.0%).
// - A sampled candle older than 2 candle-widths before its target time returns
//   null (sparse pools would otherwise mislabel a 3-day-old price as "6h ago").
// - Peak/trough include the candle containing the post (a pump-and-dump that
//   completes within the post's own candle must not vanish).

const GT = "https://api.geckoterminal.com/api/v2";

// DexScreener chainId → GeckoTerminal network id (differing ones only).
const NETWORK_MAP = {
  ethereum: "eth",
  polygon: "polygon_pos",
  avalanche: "avax",
  pulsechain: "pulsechain",
  hyperliquid: "hyperevm",
};

export function toNetwork(chainId) {
  return NETWORK_MAP[chainId] ?? chainId;
}

async function fetchOhlcv(network, pool, timeframe, { beforeTs, limit = 1000, aggregate = 1 }) {
  const url =
    `${GT}/networks/${network}/pools/${pool}/ohlcv/${timeframe}` +
    `?aggregate=${aggregate}&limit=${limit}&currency=usd` +
    (beforeTs ? `&before_timestamp=${beforeTs}` : "");
  const res = await fetch(url, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) throw new Error(`GeckoTerminal HTTP ${res.status}`);
  const data = await res.json();
  const list = data?.data?.attributes?.ohlcv_list ?? [];
  // [[unixSeconds(period start), open, high, low, close, volume], ...]
  return list.sort((a, b) => a[0] - b[0]);
}

// Price at ts without look-ahead or unbounded staleness. dur = candle seconds.
export function priceAt(candles, ts, dur, maxAgeSec = 2 * dur) {
  let closed = null;
  let containing = null;
  for (const c of candles) {
    if (c[0] + dur <= ts) closed = c;
    else if (c[0] <= ts) { containing = c; break; }
    else break;
  }
  if (closed && ts - (closed[0] + dur) <= maxAgeSec) return closed[4];
  if (containing) return containing[1]; // open = price at boundary ≤ ts
  return null; // no candle, or only a stale one — window not measurable
}

const pct = (from, to) =>
  from && to ? Math.round(((to - from) / from) * 1000) / 10 : null;

// Timeframe tiers: finest granularity whose 1000-candle window covers the post.
function pickTier(ageHours) {
  if (ageHours <= 48) return { timeframe: "minute", aggregate: 15, dur: 900 };
  if (ageHours <= 24 * 40) return { timeframe: "hour", aggregate: 1, dur: 3600 };
  return { timeframe: "day", aggregate: 1, dur: 86400 };
}

/**
 * Backtest one pair against a post timestamp.
 * Returns % moves keyed to the post time, or { error } / { note } when the
 * data can't support the measurement.
 */
export async function backtestPair({ chainId, pairAddress }, postDateMs) {
  const network = toNetwork(chainId);
  const postTs = Math.floor(postDateMs / 1000);
  const nowTs = Math.floor(Date.now() / 1000);
  const ageHours = (nowTs - postTs) / 3600;
  if (ageHours < 0.5) return { note: "post is <30min old — nothing to backtest yet" };

  const { timeframe, aggregate, dur } = pickTier(ageHours);
  try {
    const candles = await fetchOhlcv(network, pairAddress, timeframe, {
      beforeTs: nowTs,
      limit: 1000,
      aggregate,
    });
    if (!candles.length) return { error: "no OHLCV data for this pool" };
    const windowStart = candles[0][0];
    const lastCandleEnd = candles[candles.length - 1][0] + dur;
    const base = priceAt(candles, postTs, dur);
    if (base == null)
      return {
        error: `pool has no candles at post time (pool history starts ${new Date(windowStart * 1000).toISOString().slice(0, 16)}Z)`,
      };

    const H = 3600;
    const result = {
      network,
      candle: aggregate > 1 ? `${aggregate}${timeframe.slice(0, 1)}` : timeframe,
      postTimeUtc: new Date(postTs * 1000).toISOString().slice(0, 16) + "Z",
      priceAtPost: base,
      before: {},
      after: {},
    };

    // Windows narrower than one candle are unmeasurable, not zero.
    for (const [label, hours] of [["6h_move_into_post", 6], ["24h_move_into_post", 24]]) {
      if (hours * H >= dur)
        result.before[label] = pct(priceAt(candles, postTs - hours * H, dur), base);
    }
    for (const [label, hours] of [["1h", 1], ["6h", 6], ["24h", 24], ["3d", 72], ["7d", 168]]) {
      if (hours * H < dur) continue; // below candle resolution
      if (ageHours < hours) continue; // hasn't elapsed
      if (postTs + hours * H > lastCandleEnd + 2 * dur) continue; // beyond data coverage
      const v = pct(base, priceAt(candles, postTs + hours * H, dur));
      if (v != null) result.after[label] = v;
    }
    if (dur > H) result.granularity_note = `daily candles — sub-daily windows unavailable`;

    // Extremes: include the candle containing the post (its high/low may partly
    // predate the post by up to one candle — resolution limit).
    const overlap = candles.filter((c) => c[0] + dur > postTs);
    result.peak_after_pct = overlap.length ? pct(base, Math.max(...overlap.map((c) => c[2]))) : null;
    result.trough_after_pct = overlap.length ? pct(base, Math.min(...overlap.map((c) => c[3]))) : null;

    result.now_vs_post_pct = pct(base, candles[candles.length - 1][4]);
    result.hours_of_coverage = Math.max(0, Math.round((lastCandleEnd - postTs) / H));
    result.hours_elapsed = Math.round(ageHours);
    if (nowTs - lastCandleEnd > 2 * dur)
      result.staleness_note = `no trades since ${new Date(lastCandleEnd * 1000).toISOString().slice(0, 16)}Z — pool may be inactive or rugged; "now" = last trade`;
    if (windowStart > postTs - 24 * H)
      result.coverage_note = "pre-post window partially outside available history";
    return result;
  } catch (e) {
    return { error: String(e.message ?? e) };
  }
}

// Backtest the most liquid pair of each priced candidate (bounded, sequential —
// GeckoTerminal free tier is ~30 calls/min).
export async function backtestAll(priceData, postDateMs, cap = 2) {
  if (!postDateMs || Number.isNaN(postDateMs)) return priceData;
  let done = 0;
  for (const entry of priceData) {
    if (done >= cap) break;
    const top = entry.pairs?.[0];
    if (!top?.pairAddress) continue;
    entry.backtest = await backtestPair(top, postDateMs);
    done++;
  }
  return priceData;
}
