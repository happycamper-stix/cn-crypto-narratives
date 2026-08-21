---
title: 红涨绿跌 (red up, green down)
tags: [cn-crypto-narratives, glossary]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# 红涨绿跌 — hóng zhǎng lǜ diē

**Characters**: 红涨绿跌 · **Pinyin**: hóng zhǎng lǜ diē · **Literal**: "red
rises, green falls" · **Actual**: the mainland-Chinese chart color convention —
red candles/numbers mean price went UP, green means DOWN — the exact inverse of
the Western convention. The single most consequential gotcha when reading
Chinese trading screenshots.

## Origin
Two braided explanations in the mainland press — the technical one documented
in a 2015 解放日报 explainer (by 马松, 2015-07-27; reprinted by Guangming's
文摘报 and China Daily), the cultural one in later pieces (网易 2022, 南方周末
via 腾讯 2024):

1. **Cultural**: red is auspicious (喜庆) in Chinese culture, so gains are red;
   the West maps red to losses via accounting "red ink" (赤字, chìzì, "red
   characters" — the Chinese word for deficit itself preserves the red-ink
   metaphor). A popular embellishment — that early regulators wanted to
   distinguish the "socialist stock market" from capitalist ones — circulates
   but is the weaker claim (?).
2. **Technical path-dependence** (the better-evidenced story): when Shanghai
   brokerages wired up their first trading halls in the early 1990s, the first
   quote software was 乾隆 (Qiánlóng, "Qianlong") — imported from Taiwan, whose
   market already displayed 红涨绿跌. Later domestic software (通达信, 同花顺
   lineage) copied the Qianlong look, locking the convention in.

So mainland China aligns with Taiwan and Japan (red-up), while Hong Kong
inherited the British/Western green-up convention — a genuine mainland/HK
divergence ([[hk-tw-mainland-divergence]]).

## Convention map

| Market | Up | Down | Notes |
|---|---|---|---|
| Mainland A-shares | red | green | universal; the default in 通达信/同花顺-style apps |
| Taiwan | red | green/black | TW says 红K (red K-bar) = up, 黑K = down candle, 长黑 = big down candle; 收红/收黑 = closed up/down |
| Japan, South Korea | red | blue/black | same family (JP historically red/black, print white/black; KR down is blue) |
| Hong Kong | green | red | follows Western convention; HK crypto media mostly Western-style (?) |
| Western markets | green | red | "red day" = down day |
| Crypto exchanges (Binance, OKX, …) | green (default) | red (default) | international default even in Chinese UI — but both offer a 红涨绿跌 toggle in settings, and mainland users habitually flip it |

## Why it bites analysts
- **CN KOL screenshots come in both conventions.** The exchange default is
  green-up, but A-share-trained users flip the toggle; a Chinese chart
  screenshot alone tells you nothing until you check the price axis against the
  candle colors. Never caption a CN chart "sea of red = crash" unverified.
- **Vocabulary inverts with the pixels.** 收红 (shōuhóng, "close red") = closed
  UP; 翻红/翻绿 (fānhóng/fānlǜ, "flip red/green") = turn positive/negative
  intraday; 飘红 (piāohóng, "floating red") = portfolio in the green (!);
  红盘/绿盘 (hóngpán/lǜpán, "red/green plate") = up/down session. A CN trader's
  今天大红 ("big red today") is celebration, not disaster.
- **Idioms assume the CN mapping.** 绿油油 (lǜyōuyōu, "lush green") = everything
  dumping; 韭菜 jokes lean on green = loss = leek color — the leek metaphor
  ([[jiu-cai]]) quietly encodes 红涨绿跌. 满屏飘绿 "screen full of green" = 
  bloodbath. Pattern names too: 红三兵 "three RED soldiers" is the bullish
  three-white-soldiers.
- **Safe channel: yin/yang words.** 阳线/收阳 (up candle) and 阴线/收阴 (down
  candle) predate color displays and are convention-independent — CN media
  headlines prefer them for exactly this reason. When translating, render
  阳线/阴线 by direction, never by color.
- **Cross-border self-mockery is a genre**: A-share refugees discovering US
  stocks/crypto joke about buying because the screen was "celebratory red";
  绿了 ("went green") doubles as the cuckold pun (戴绿帽, wearing the green hat),
  stacking humiliation onto losses — see [[irony-cope-register]].

## Example usage
- 比特币周线收阳，但今天全场飘绿 — "BTC's weekly closed up (阳), but everything
  is green (down) today": both conventions in one breath; only 阴/阳 keeps it
  parseable.
- A-share explainers were mainstream news in the 2015 crash summer (解放日报
  2015-07-27, reprinted by 文摘报 2015-08-01 and China Daily) — though the
  trigger was a domestic retail reader asking why the mainland inverts the
  "international" convention, not confused foreigners. The walls-of-*green*
  千股跌停 screenshots of that summer still trip up Western readers primed to
  parse green as gains.

## Sources
- 光明日报 文摘报: 中国股市为何"红涨绿跌" (2015-08-01; reprint of 解放日报 2015-07-27, 马松) — https://epaper.gmw.cn/wzb/html/2015-08/01/nw.D110000wzb_20150801_1-05.htm
- 中国日报网: 中国股市为啥"红涨绿跌" 关注权威解答 (2015-07-27; same 解放日报 piece) — http://caijing.chinadaily.com.cn/2015-07/27/content_21415547.htm
- Zhihu: 为什么中国股票用红色代表"涨"…而美国、香港等相反? — https://www.zhihu.com/question/20299569 (?)
- 网易 (沪江英语, 2022-03-29): 为什么美国股票是绿涨红跌，而我国正好相反? — https://www.163.com/dy/article/H3LF156B0516DPPV.html
- 腾讯新闻 (南方周末): 红绿，从交通灯到K线图：股市涨跌与阴阳五行有何关系？ (2024-02-26) — https://news.qq.com/rain/a/20240226A077HJ00
- 理财笔记/币安教程: 币安怎么设置涨跌颜色 (crypto default = 绿涨红跌, toggle exists) — https://www.xmtyy.net/bibaike/251955.html (?)

## Related links
- [[k-line-ta-slang]] — the full chart-reading register this convention colors
- [[hk-tw-mainland-divergence]] — HK green-up vs mainland/TW red-up
- [[jiu-cai]] — green = loss = leek: the color logic under the master metaphor
- [[irony-cope-register]] — 绿了 loss/cuckold pun stack
