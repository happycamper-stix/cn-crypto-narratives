---
title: Research Methodology
tags: [cn-crypto-narratives, reference]
created: 2026-08-21
updated: 2026-08-21
status: active
type: reference
---

# Research Methodology

Repeatable playbook for adding a term to this vault.

## 1. Where to search
1. **CN-native first**: search the exact hanzi on Zhihu (`site:zhihu.com "术语" 币圈`), then jb51/tuoluo glossaries, then BlockBeats/Odaily/PANews site search. English sources are translations — use them for framing, not ground truth.
2. **Cross-strait check**: search BlockTempo/動區 (Traditional characters) — TW usage sometimes diverges or predates mainland usage.
3. **Live usage**: X search for the hanzi (filter Chinese-language results); Telegram search in media channels from [[live-feeds]].
4. **Paywalled/dead pages**: Wayback (see §4).

## 2. Verify a term is real, not invented
A term earns a glossary note when at least TWO of:
- appears in ≥2 independent CN-native sources (a Zhihu list copying jb51 = one source; the 黑话大全 posts plagiarize each other heavily)
- used *unglossed* in newsflash headlines (BlockBeats/Odaily 快讯) — the strongest signal it's live vocabulary
- appears in organic CT/Telegram chatter, not only in "slang explainer" listicles
Red flags: term only exists in one listicle; only in EN "Chinese crypto slang" articles; or is a literal translation no CN speaker uses. Note confidence in the glossary entry if borderline.

## 3. Date first usage
- **Zhihu/WeChat articles carry publish dates** — the earliest dated explainer bounds popularization (explainers lag usage by weeks–months).
- **X advanced search**: `"金狗" until:2021-01-01 lang:zh` and bisect on the date to find earliest tweets.
- **Wayback CDX bisect**: first snapshot of a glossary page *containing* the term dates it (see §4).
- **Anchor to market events**: most terms crystallize around an event (韭菜 lineage → 2015 A-share crash; 土狗/金狗 → May 2021 SHIB animal-coin wave; 币安人生 → Feb 2025 Four.meme/CZ season). State the anchor event in the note even when an exact first use is unfindable — "popularized during X" is the honest, citable claim.
- Example finding: earliest located 金狗 usage is a Zhihu post from July 2021 (gdoge, zhuanlan.zhihu.com/p/392524690), consistent with the SHIB-wave origin.

## 4. Archive.org tricks
- `WebFetch` is blocked for web.archive.org here — use `curl` in Bash instead.
- Availability API often lies empty; go straight to **CDX**:
  `curl "https://web.archive.org/cdx/search/cdx?url=DOMAIN/PATH*&limit=20"` — lists every snapshot with timestamp + HTTP status. Pick a 200 with a large byte count (tiny = paywall/redirect shell).
- Fetch: `curl -sL "https://web.archive.org/web/TIMESTAMP/URL"`; append `id_` after the timestamp for the raw un-rewritten page.
- **Page dead in Wayback too?** Search the exact Chinese *title* — CN content farms mirror everything (sohu, read01, chainnews, 163, weixin). That's how the Xuehua article was recovered ([[archived-glossaries]]).
- To date a term via Wayback: CDX-list snapshots of a long-lived glossary page, binary-search snapshots for the first one containing the hanzi.

## 5. Write the note
Follow the glossary format in the vault README: hanzi, pinyin, literal, actual meaning, origin mechanics, example usage, ≥2 wikilinks (term ↔ pattern). Cite the best CN-native source + one EN source if available; log new sources into [[sources]].

## Related links
- [[sources]]
- [[live-feeds]]
- [[archived-glossaries]]
