---
title: Red/Green Inversion
tags: [cn-crypto-narratives, pattern]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# Red/Green Inversion (红涨绿跌)

## The trap in one line
Mainland and Taiwan stock charts paint **red = up, green = down** — the exact
opposite of Western convention. The idiom layer built on top (飘红, 翻红,
满屏绿) is anchored to *red-is-auspicious culture*, not to any chart palette,
so it keeps A-share polarity **even inside crypto**, where exchange charts
default to Western green-up. Translating 飘红 as "in the red" flips the
meaning of the sentence. This is the single most reliable way to misread CN
market commentary. Parent pattern: [[a-share-inheritance]].

## How the inversion happened (dated)
- **Early 1990s**: the first stock-quote software used by mainland brokerages
  was imported from Taiwan (the 乾隆/钱龙 "Qianlong" lineage, ~1992), carrying
  Taiwan's red-up/green-down scheme; domestic vendors copied the incumbent
  look, and the palette locked in as de-facto standard (光明日报/中国日报
  retrospectives, 2015).
- **1993–94**: two Shanghai TV stations broadcast market tickers in *opposite*
  color schemes — one red-up, one green-up — leaving viewers 心惊肉跳
  ("hearts jumping") until red-up won.
- The popular explanations — red is festive (红包, 开门红), green is the
  cuckold color (戴绿帽子), even "a socialist market should differ from
  capitalist ones" — are post-hoc folk etymology layered onto a software-import
  accident (?).

## East Asia palette map

| Market | Up | Down | Note |
|---|---|---|---|
| Mainland A-shares | red | green | the reference convention for all CN idioms |
| Taiwan | red | green | the original source of the mainland scheme; TW crypto media (BlockTempo) audience reads both conventions |
| Japan | red | green/black | birthplace of candlesticks; kept 阳线-red tradition |
| South Korea | red | **blue** | a third scheme entirely |
| Hong Kong | green | red | HKEX/international convention on terminals — but Chinese-language HK commentary still uses 红=up idioms (红盘, 开门红); mainland-origin broker apps (Futu etc.) ship red-up anyway |
| US/Europe, crypto exchange defaults | green | red | Binance/OKX default green-up, with a settings toggle CN users flip to red-up |

## The three layers (the decoding key)
The hazard is that "red/green" words live on three different layers with
different polarity rules:

1. **Idiom layer — culture-anchored, palette-independent. Red is ALWAYS up.**
   These are congratulation/disaster words, not color descriptions, and they
   survive unchanged in crypto media:

   | Idiom | Pinyin | Literal | Actual meaning |
   |---|---|---|---|
   | 飘红 | piāohóng | floating red | in the green — prices up across the board |
   | 翻红 | fānhóng | flip to red | turn positive intraday; attested in CN crypto headlines; "BTC 短时翻红" (= BTC briefly turned green) as a standard newsflash formula (?) |
   | 收红 / 红盘 | shōuhóng / hóngpán | close red / red board | close up / an up day |
   | 开门红 | kāiménhóng | open-the-door red | strong start (year/session opener gain) |
   | 满屏绿 / 一片绿 / 全线飘绿 | mǎnpíng lǜ / yīpiàn lǜ / quánxiàn piāolǜ | screen full of green | bloodbath — everything down |
   | 绿了 | lǜ le | got greened | it dumped / I'm down — doubled by the 戴绿帽 (cuckold) pun: the market "cheated on you" |
   | 绿油油 | lǜyōuyōu | lush green | sardonic: portfolio verdant with losses |
   | 大红大紫 vs 绿光罩顶 | — | — | riffs: red/purple = glory; "green light crowning the head" = cuckold-crash humiliation — attested in TW stock-media headlines (光通訊「綠光罩頂」…跌停) |

2. **Chart-description layer — palette-dependent.** 红柱/绿柱 ("red/green
   bars"), or any sentence describing an actual screenshot, follows whatever
   the app renders. A Binance default chart's green candle IS the up candle;
   an A-share app's green candle is the down candle. Same words, opposite
   referents, resolved only by knowing which screen the speaker is looking at.

3. **阴阳 layer — polarity-safe.** The candlestick register inherited via
   [[a-share-inheritance]] sidesteps color entirely: 阳线 (yángxiàn, yang
   line) = up candle, 阴线 (yīnxiàn, yin line) = down candle, 大阳线/大阴线 =
   big up/down candle, 收阳/收阴 = close up/down, 阴跌 = grinding bleed.
   Yang is always up, yin always down, on every palette — which is precisely
   why CN financial writing prefers this register for unambiguous statements.

## Live ambiguity inside 币圈
- Two speaker populations coexist: **股民-heritage** traders (red=up wetware,
  often flip their exchange app to red-up via settings) and
  **exchange-native** traders raised on Binance's default green-up, who may
  say 绿了 while pointing at a *positive* PnL screen. Bitget's own explainer
  notes the split: 币民 "绿了" often means up, 股民 "绿了" means down (?).
- Resolution rules used in practice: idiom-register words (飘红/翻红/开门红)
  are always A-share polarity; 阴/阳 words are always safe; bare 红/绿 next to
  a screenshot follows the screenshot; bare 红/绿 in prose from mainland
  media follows A-share polarity.
- The mainland-normie interference goes the other way too: during COVID the
  健康码 (health code) made green=safe/red=blocked, prompting a standing joke
  that stock apps are the one place a mainlander wants to see red.
- English↔Chinese translation traps: "in the red" (losing) ≠ 飘红 (gaining);
  "green candle" ≠ 红盘; "seeing red" ≠ bearish. Machine translation of CN
  crypto headlines routinely inverts market direction — verify against the
  number, never the color word.

## Decoding heuristic
Ask *which layer* the color word lives on before assigning direction. If it is
an idiom (飘/翻/满屏/开门), red means up, full stop. If it describes pixels,
find out whose pixels. If you can get the speaker onto 阴/阳 vocabulary, the
ambiguity disappears.

## Related links
- [[a-share-inheritance]]
- [[trading-slang]]
- [[hk-tw-mainland-divergence]]
- [[irony-cope-register]]
- [[number-slang]]

## Sources
- Origin retrospectives (Taiwan software import, 1994 two-TV-stations story): https://epaper.gmw.cn/wzb/html/2015-08/01/nw.D110000wzb_20150801_1-05.htm (文摘报/光明日报 2015-08-01) · http://caijing.chinadaily.com.cn/2015-07/27/content_21415547.htm · https://sh.qq.com/a/20150727/008889.htm
- Zhihu thread on why CN red-up vs US/HK: https://www.zhihu.com/question/20299569
- East Asia palette comparison (JP keeps red-up, KR red/blue): https://www.cnblogs.com/ls1519/p/14365084.html · https://www.163.com/dy/article/H3LF156B0516DPPV.html
- K线/阳线/阴线 etymology (罫線 keisen → "K"): https://m.thepaper.cn/newsDetail_forward_16484951 · https://zh.wikipedia.org/zh-hans/K%E7%BA%BF
- Exchange/app color-setting toggles (first link: Binance app K线 colors; second link: stock-app 红涨绿跌 how-to, not crypto): https://m.bimy.com.cn/zxdt/hydt/34867.html · https://licai.cofool.com/ask/qa_7324655.html
- 股民 vs 币民 "绿了" split: https://www.bitget.com/zh-TC/wiki/1376801 (dead link as of 2026-08-21, no archive found; live successor https://www.bitget.com/zh-TC/wiki/1458533 covers the TW-vs-US/crypto palette split but does not confirm the 绿了 claim)
- 绿光罩顶 attested in TW stock media: https://tw.stock.yahoo.com/news/%E5%85%89%E9%80%9A%E8%A8%8A%E3%80%8C%E7%B6%A0%E5%85%89%E7%BD%A9%E9%A0%82%E3%80%8D%E8%81%AF%E4%BA%9E%E5%85%89%E8%81%96%E8%8F%AF%E6%98%9F%E5%85%89%E4%B8%80%E5%BA%A6%E8%B7%8C%E5%81%9C-%E6%B3%A2%E8%8B%A5%E5%A8%81%E4%B9%9F%E6%8C%AB9-025045966.html
- Health-code red/green joke: https://cloud.kepuchina.cn/newSearch/imgText?id=6908526806471479296
