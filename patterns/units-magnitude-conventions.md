---
title: Numeric Units & Magnitude Conventions (万/亿/U/刀)
tags: [cn-crypto-narratives, pattern]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# Numeric Units & Magnitude Conventions (万/亿/U/刀)

## Context
Chinese counts in myriads: the native pivot words are 万 (wàn, 10^4) and 亿 (yì,
10^8), and everything else is composed from them. English pivots at thousand /
million / billion (10^3/10^6/10^9) — the two ladders share almost no rungs, so
**misreading 万/亿 by one order of magnitude is the single most common concrete
error when translating CN market chatter**. [[number-slang]] covers what digits
*mean* (8=rich, 94=the ban); this note covers how quantities are *written*: the
magnitude ladder, currency units (U/刀/米), counters (个/枚/颗/张/聪), tenth-steps
(成/点), multiple-grammar (倍/番/折), and U-vs-coin accounting (U本位/币本位).

## The magnitude ladder

| CN | Pinyin | Value | English | Crypto-scale example |
|---|---|---|---|---|
| 千 | qiān | 10^3 | thousand (k) | 3千U = 3,000 USDT |
| 万 | wàn | 10^4 | ten thousand | 3万U = 30,000 USDT (NOT 3,000 or 300,000) |
| 十万 | shíwàn | 10^5 | hundred thousand | BTC 突破10万美元 — first hit Dec 5, 2024 (Xinhua) |
| 百万 | bǎiwàn | 10^6 | million | 百万U = the folk 财富自由 "financial freedom" bar |
| 千万 | qiānwàn | 10^7 | ten million | 千万富翁 = a "10M-aire", not a millionaire |
| 亿 | yì | 10^8 | hundred million | 一个小目标 = ¥100M (see below) |
| 十亿 | shíyì | 10^9 | **billion** | "a $1B raise" = 10亿美元融资 |
| 百亿 | bǎiyì | 10^10 | ten billion | TRUMP 上线两日市值破百亿美元 ≈ $13B (Jan 19, 2025) |
| 万亿 | wànyì | 10^12 | trillion (mainland) | BTC 总市值接近2万亿美元 (Dec 5, 2024, Xinhua) |
| 兆 | zhào | 10^12 | trillion (**Taiwan only**) | TW media: 加密貨幣總市值破2兆美元 (LTN, Apr 2021); 比特幣市值約2.2兆美元 (UDN, May 22, 2025) (?) |

Parsing mechanics:
- Digits group by **four**, not three: 21,000,000,000 is 210亿, not "21 billion"
  read off directly. Decimals attach to the pivot: 3.5万 = 35,000; 1.2亿 = 120M.
- 万亿 is literally 万×亿; but 亿万 in 亿万富翁 (yìwàn fùwēng) is NOT a number —
  it's a set phrase for "mega-rich," roughly "billionaire."
- Traditional forms: 萬 = 万, 億 = 亿 (TW/HK text; see
  [[hk-tw-mainland-divergence]]).
- **兆 trap**: in Taiwan 兆 = 10^12; in mainland technical usage 兆 = mega (10^6:
  兆瓦 megawatt, 网速100兆). Mainland finance writing avoids it and says 万亿; HK
  media mostly writes 萬億 (?). A TW headline's 兆 is trillions, a mainland spec
  sheet's 兆 is millions.

## Typed shorthand: w, k, U-hybrids
- **w** = 万 (from pinyin *wàn* initial; an input-method habit from the late-90s
  (?) Chinese internet): 20w = 200,000. Hybrid forms are everywhere in CN CT:
  **5wU** = 50,000 USDT, 亏了30w = lost 300k (currency from context).
- **k** = thousand, borrowed from English (千 has no k-free native shorthand in
  use; "q" never caught on): 月入5k.
- Both attach to anything: punishment for the unwary is that **10w = 100k**, a
  10x trap for readers pattern-matching on the letter.

## Currency units

| Term | Pinyin | Literal | Actual |
|---|---|---|---|
| U | — | letter U | USDT, and by extension "dollars." 3万U, 出U/收U (OTC sell/buy), U商 (USDT merchant). The default unit of CN CT accounting; see [[coin-nicknames]] for the 泰达 family |
| 刀 | dāo | knife | US dollar — homophone of *dollar*. 10万刀 = $100k. 美刀 = colloquial 美元; BTC's Dec 2024 milestone was 十万刀 in chat, 10万美元 in headlines |
| 米 | mǐ | rice | money — homophone of English *money* (?); old internet slang canonized by livestream/short-video censorship-anxiety (赚米 for 赚钱, mainstream by ~2022). In crypto chat 几个米 usually means RMB or "money" generically, occasionally USD (?). See [[censorship-evasion-coinage]] |
| 块 / 毛 / 分 | kuài / máo / fēn | lump / hair / part | yuan / 0.1 / 0.01 — the RMB coin ladder, freely reused for U-prices of cheap coins: 三毛五 = $0.35, 几分钱的币 = a sub-cent coin |
| 美金 / 美元 / 美刀 | měijīn / měiyuán / měidāo | US-gold / US-dollar / US-knife | all "USD": 美元 formal, 美金 older/colloquial (esp. TW/HK), 美刀 slangy |

**Bare-number ambiguity heuristic**: an unmarked 万 in mainland A-share-adjacent
chat defaults to RMB (亏了50万 = ¥500k); in exchange/CT context it defaults to U.
万U and 万刀 are explicit; 万块 is always RMB (块 = yuan). When a screenshot
brags "翻到100万" the currency is whatever flatters the poster.

**The 毛比特 re-denomination joke**: when BTC crossed $100k (Dec 5, 2024), CN
posts re-priced BTC as if 1 BTC were ¥1: "1分钱价值1000刀，1毛钱价值1万刀，
1块钱价值10万刀" — "a cent of bitcoin is $1,000, a dime is $10k, a kuai is
$100k" (?) — mock-affordability framing for late retail. The same instinct that
prices things in 聪 (below).

## Counters (量词) for coins and contracts

| Counter | Pinyin | Normal use | Crypto use |
|---|---|---|---|
| 个 | gè | generic counter | the community's BTC/ETH counter: 囤了两个大饼 = holding 2 BTC (see [[da-bing]]); 半个币 = 0.5 BTC. Also appears *inside* numbers: 一个亿 = 100M — 个 here does not mean "one unit" |
| 枚 | méi | small flat objects (coins, medals, rockets) | the **media** counter: 比特币单枚价格首度冲上10万美元 (Xinhua, Dec 5, 2024); "美元/枚" is the standard price-per-coin headline unit. In use since at least 2013 (中国青年报: 一"枚"比特币, Oct 10, 2013) |
| 颗 | kē | small round things (pearls, stars) | TW/HK accent for whole coins: 一颗比特币 — a first-glance origin signal, like 數位/数字 |
| 张 | zhāng | flat sheets (paper, tickets) | perp/futures **contract sheets**: on OKX coin-margined contracts 1张 = $100 face value of BTC ($10 for alts), so 开了100张 = a $10,000 BTC position, not 100 coins |
| 聪 | cōng | — (a given name) | **satoshi**, 1e-8 BTC — named for 中本聪 (Zhōngběn Cōng, Satoshi Nakamoto); the sat = 聪 convention traces to BitcoinTalk, 2011. 囤聪 = stacking sats; BRC-20 mint costs and Ordinals prices were quoted in 聪 during [[inscription-mania]] |
| 手 | shǒu | hand | a "lot" — A-share inheritance (1手 = 100 shares), occasionally used loosely for crypto order sizes (?) |

Colloquial money-talk also uses bare 个 for 万: 亏了30个 = lost ¥300k in
stock/futures chat rooms (?). Context disambiguates — "30个" of a coin whose
price is known vs. "30个" of unlabeled PnL — but this is a genuine reading
hazard in KOL group screenshots.

## Tenth-steps: 成 and 点

| Term | Pinyin | Literal | Actual |
|---|---|---|---|
| 成 | chéng | a tenth | 10% steps, the native position-sizing unit: 三成仓 = 30% position, 五成仓 = half in. 十成 = fully loaded, but traders say 满仓 instead (see [[trading-slang]] for the 仓 warehouse family). Also odds/returns: 胜算七成 = 70% odds; 赚了三成 = +30% |
| 点 | diǎn | point | percentage point in PnL talk: 跌了20个点 = −20%. Trap: in index/price contexts 点 can be literal price points (大饼跌了2000点 = BTC −$2,000); leverage makes chat like 十倍开多，赚50个点 ambiguous between price-% and account-% |
| 基点 | jīdiǎn | base point | basis point (0.01%) — formal register only: funding rates, DeFi yields, Fed cuts (降息25个基点) |

## Multiples: 倍, 番, 折

The 倍-suffix genre words:
- **百倍币** (bǎibèibì, "hundred-times coin") — the canonical shill noun; 下一个
  百倍币 "the next 100x" is the [[kol-shilling-ecosystem]] hook phrase. Mainstream
  financial press was already warning about the 百倍/千倍 "myth" by Jul 2018
  (每日经济新闻, Jul 2018: 警惕"百倍"、"千倍"的币圈神话; Jiemian, Aug 2019:
  区块链毒药"百倍币").
- **千倍币 / 万倍币** — escalation tiers; 万倍 attaches to 土狗 casino culture
  (36kr, 2023: 币圈"土狗"万倍狂欢). Real referents exist just often enough to keep
  the genre alive: 币安人生 (Binance Life) was reported up ~6000倍 in 4 days
  (2025) (?); TRUMP did +300% overnight at launch (Jan 17–18, 2025) and hit a
  ~$13B circulating market cap within two days.
- **十倍币** — the "reasonable" version, said with a straight face.

Grammar traps inside 倍:
- **涨了 vs 涨到**: 涨了两倍 = rose *by* 2x = **3x** the original; 涨到两倍 =
  rose *to* 2x. Colloquial usage is sloppy, so translate from the price data, not
  the sentence.
- **番 doubles, 倍 adds**: 翻一番 = 2x, 翻两番 = **4x** (2^n; official-statistics
  grammar), while 增长两倍 = 3x. A KOL's 翻两番 is 4x, not "up two times."
- **Leverage vs return**: 开100倍 = 100x *leverage* (百倍合约, 百倍杠杆);
  百倍币 = 100x *return*. 百倍战神 "100x war-god" challenge accounts (e.g. the
  100U挑战赛 genre: run 100 USDT to 100x on perps) deliberately blur the two.
- **折 counts what REMAINS**: 打三折 = selling at 30% of the old price (70% off).
  A coin 现在是两折的价格 has lost 80%, not 20%. Sits beside 腰斩 (−50%) and
  脚踝斩 (−90%) in [[trading-slang]].

## U本位 vs 币本位 — which unit is "real" money

| Term | Pinyin | Literal | Actual |
|---|---|---|---|
| U本位 | U běnwèi | U-standard | USDT-denominated: margined, settled, and *mentally accounted* in USDT ("正向合约", linear contracts) |
| 币本位 | bì běnwèi | coin-standard | coin-denominated: BTC/ETH-margined inverse contracts ("反向合约", 1张 = $100 face), and the hodler worldview that gains are counted in coins |
| 金本位 | jīn běnwèi | gold standard | the monetary-history source word 本位 borrows from |

本位 is simultaneously a **product spec** (Binance/OKX list U本位合约 and
币本位合约 as separate venues) and an **ideology marker**: 囤币党 ("coin-hoarder
faction") measure wealth 币本位 — "I still have my 2 BTC" — while traders measure
U本位, and bear markets convert believers from one accounting standard to the
other. The [[yi-bi-yi-bie-shu]] dream is 币本位 accounting taken to its poetic
conclusion: the unit of account is villas per coin.

## The 一个亿 register: 小目标

先定一个能达到的小目标，比方说我先挣它一个亿 (xiān dìng yī gè néng dádào de
xiǎo mùbiāo, bǐfāng shuō wǒ xiān zhèng tā yī gè yì — "first set an achievable
small goal — say, first make 100 million"; folk-shortened to 先定一个小目标，
先挣它一个亿) — Wanda's 王健林 (Wang Jianlin) on 《鲁豫有约大咖一日行》, aired
Aug 26, 2016; voted a top-10 internet phrase of 2016. In
crypto chat **一个小目标 = ¥100M** (occasionally 1亿 U for the truly delusional),
used with the same sincerity gradient as [[yi-bi-yi-bie-shu]]: bull-market goal,
bear-market punchline. Note the grammar: 一个亿 (numeral + 个 + 亿) is the
colloquial form — 个 is not "one unit of coin" here, a small trap for parsers.

## Translator's checklist (the 10x traps)

| You see | Wrong reading | Right reading |
|---|---|---|
| 3万U | $3,000 / $300,000 | **30,000 USDT** |
| 5亿美元 | $5 billion | **$500 million** |
| a $2B raise (EN→CN) | 2亿美元 | **20亿美元** |
| 10w | 10,000 | **100,000** |
| 2.2兆美元 (TW media) | $2.2M / 2.2亿 | **$2.2 trillion** |
| 涨了两倍 | 2x | **3x** (by the book; verify against chart) |
| 翻两番 | 2x / 3x | **4x** |
| 现在两折 | −20% | **−80%** |
| 开100倍 | expects 100x return | **100x leverage** |
| 三成仓 | 3% / 30 units | **30% position** |
| 跌了20个点 | 20 price ticks | usually **−20%** |
| 100张 (coin-margined) | 100 coins | **$10,000 face value** (BTC, OKX spec) |
| 亏了30个 (chat) | 30 coins | often **¥300k** (?) — check context |

## Related links
- [[number-slang]] — digit meanings; this note is the magnitude grammar it omits
- [[trading-slang]] — the 仓 position family, 腰斩, 满仓
- [[coin-nicknames]] — U/泰达, 大饼
- [[hk-tw-mainland-divergence]] — 兆 vs 万亿, 颗 vs 枚/个, traditional forms
- [[inscription-mania]] — 聪-denominated pricing in the BRC-20 mania
- [[kol-shilling-ecosystem]] — 百倍币 as shill-genre noun
- [[yi-bi-yi-bie-shu]] — 币本位 accounting as dream logic
- [[censorship-evasion-coinage]] — 米/赚米 euphemism pressure
- [[da-bing]] — 两个大饼 counter usage

## Sources
- U as unit/USDT: https://www.wenlian123.com/baike/35712.html · https://www.jb51.net/blockchain/931806.html
- 刀 = dollar homophone: https://www.zhihu.com/question/641432069 · https://www.sohu.com/a/701336054_120695217
- 米 = money (赚米 euphemism): https://www.zhihu.com/question/408759335 · https://news.qq.com/rain/a/20220715A08VQE00 · https://news.qq.com/rain/a/20250111A05N9300
- w = 万 origin: https://news.qq.com/rain/a/20250315A07LJ200 · https://www.163.com/dy/article/JRJ0EV3B0511DFSC.html
- 王健林 一个亿 小目标 (2016-08-26): https://www.guancha.cn/economy/2016_08_29_372783.shtml · https://baike.baidu.com/item/%E4%B8%80%E4%B8%AA%E4%BA%BF%E5%B0%8F%E7%9B%AE%E6%A0%87/19950313
- BTC $100k, CN coverage (2024-12-05): http://www.news.cn/20241205/19d91d08e07f46b190365600b429514b/c.html (单枚价格首度冲上10万美元; 总市值接近2万亿美元) · https://www.guancha.cn/economy/2024_12_05_757791.shtml (美元/枚 headline) (?)
- 毛比特 re-denomination joke: https://www.gobinance.cc/archives/1455 (link dead as of 2026-08-21) (?)
- TW 兆 usage: https://ec.ltn.com.tw/article/breakingnews/3490516 (2021-04-06, 比特幣領頭 加密貨幣總市值破2兆美元) · https://udn.com/news/story/6811/8760454 (2025-05-22; link now 404) (?)
- 百倍币/千倍币 warnings (2018): https://www.nbd.com.cn/articles/2018-07-24/1238272.html · https://www.jiemian.com/article/3420469.html
- 万倍 土狗 (2023): https://www.36kr.com/p/2251412499181187
- 100U挑战赛: https://zhuanlan.zhihu.com/p/661458898
- U本位/币本位: https://www.mexc.com/zh-MY/learn/article/the-differences-between-usdt-m-and-coin-m-futures/1 · https://www.coinglass.com/zh/learn/guide10-coin-usdt-margin-contract-zh
- OKX 张 face value: https://www.okx.com/api/v5/public/instruments?instType=SWAP&instFamily=BTC-USD (ctVal=100 USD; ETH-USD ctVal=10 USD)
- 聪 = satoshi (BitcoinTalk 2011 convention): https://zhuanlan.zhihu.com/p/357274117 · https://www.btcfans.com/article/27730
- 枚 for BTC since 2013: http://zqb.cyol.com/html/2013-10/10/nw.D110000zgqnb_20131010_1-12.htm
- 番 vs 倍 grammar: https://www.zhihu.com/question/267574702 · 国家统计局 "番"与"倍" (stats.gov.cn)
- 仓位/成 usage: https://zhuanlan.zhihu.com/p/52334194
- TRUMP launch figures: https://en.wikipedia.org/wiki/Official_Trump (+300% overnight; ~$13B by Jan 19, 2025) · 币安人生 multiple unsourced (?)
