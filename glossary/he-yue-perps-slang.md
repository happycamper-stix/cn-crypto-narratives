---
title: 合约黑话 — Perps / Contract-Gambler Slang
tags: [cn-crypto-narratives, glossary]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# 合约黑话 (héyuē hēihuà) — The Perps / Contract-Gambler Register

## Context: why 合约 is *the* mainland register
合约 (héyuē, "contract") = futures, and in practice USDT-margined perpetual swaps.
For mainland retail this is the default instrument, for structural reasons:
the 94 (2017) and 924 (2021) bans killed fiat spot rails, so every yuan enters
and exits through OTC with [[dong-ka]] risk — but USDT *already inside* Binance/OKX
moves frictionlessly into the contract casino. Derivatives volume passed spot in
Q4 2020; open interest grew from $3.5B to $17B (+385%) during 2020 alone, with
leverage offered up to 125x (Binance capped new users at 20x only in July 2021,
weeks after state media — Xinhua, 2021-05-29 — ran 百倍杠杆 exposés). Industry
figures quoted in CN press claim "99.5%–99.9% of retail eventually gets 爆仓'd"
(folk statistic, but universally repeated).

The register is openly casino-speak: perps are 炒空气 (chǎo kōngqì, "stir-frying
air" — trading nothing), the lifestyle is 刀尖舔血 (dāojiān tiǎn xiě, "licking
blood off the knife's edge"), and one trade is 一念天堂，一念地狱 (yī niàn
tiāntáng, yī niàn dìyù, "one thought heaven, one thought hell"). It extends the
[[gambling-film-register]] — the exchange is 赌场, the self-label is 赌狗 (dǔgǒu,
"gambling dog," degen) — and it is the water in which [[dai-dan-lao-shi]] scams
swim. General trade verbs live in [[trading-slang]]; this note covers what is
specific to the leveraged-contract world.

## The machine: mechanics vocabulary

| Term | Pinyin | Literal | Actual meaning / notes |
|---|---|---|---|
| 合约 | héyuē | contract | futures/perps as a category; 玩合约 "I play contracts" ≈ "I gamble" |
| 永续合约 | yǒngxù héyuē | perpetual contract | perp swap, no expiry, anchored by funding; vs 交割合约 (jiāogē, "delivery contract") — quarterly futures, the older OKEx-era default |
| U本位 / 币本位 | U-běnwèi / bì-běnwèi | U-standard / coin-standard | USDT-margined vs coin-margined; 币本位 is the 囤币党 (hoarder-faction) choice — win and lose denominated in the coin itself |
| 杠杆 | gànggǎn | lever | leverage; opener question: 开几倍? "how many x?"; 百倍合约 (bǎibèi héyuē) = 100x, the degen benchmark number |
| 保证金 | bǎozhèngjīn | guarantee money | margin; 追加保证金 (zhuījiā —) = margin call, colloquially just 补仓 "feed the position" |
| 全仓 | quáncāng | whole warehouse | **cross margin** — entire account equity backs every position; one bad leg drags down all. Degen default because it delays liquidation |
| 逐仓 | zhúcāng | position-by-position warehouse | **isolated margin** — each position's margin walled off; the "responsible" mode preached and skipped, like 止损 |
| 开多 / 开空 / 平仓 | kāiduō / kāikōng / píngcāng | open long / open empty / flatten | go long / short / close; 多单・空单 = long/short orders (see [[trading-slang]]) |
| 强平 | qiángpíng | forced flatten | forced liquidation (short for 强制平仓); what the *risk engine* does — 爆仓 is what happens *to you* |
| 爆仓 | bàocāng | warehouse explodes | liquidated; 爆仓价 = liquidation price, memorized like a birthday. The register's central word |
| 穿仓 | chuāncāng | pierce the warehouse | loss beyond posted margin — negative balance; exchanges now market 负余额保护 (negative-balance protection) / "穿仓免赔" against it |
| 分摊 | fēntān | apportion | **socialized-loss clawback**: winners' PnL docked to cover 穿仓 holes. Made infamous by OKEx's weekly-settlement clawbacks (see incidents below); "今天周五，你被分摊了吗?" ("It's Friday — were you apportioned?") was a standing joke |
| 自动减仓 | zìdòng jiǎncāng | automatic position reduction | ADL — profitable positions force-closed against bankrupt counterparties when the insurance fund can't absorb losses; obscure jargon until 10·11 (2025) made it a household word overnight |
| 资金费率 | zījīn fèilǜ | funds fee rate | funding rate, settled every 8h (baseline 0.01%); positive = longs pay shorts. 吃费率 "eating the rate" / 费率套利 = delta-neutral funding arb, the institutions' 躺赚 ("earn lying down"); extreme rates read as crowding signals |
| 插针 | chāzhēn | insert a needle | scam wick hunting stops/liq clusters; 天地针 = both directions (see [[trading-slang]]); in the perps register presumed to be *aimed* (below) |
| 多空双爆 | duō kōng shuāng bào | longs and shorts both explode | double liquidation off a 天地针 — pump then dump (or reverse) fast enough to strip both sides |
| 多杀多 | duō shā duō | longs kill longs | long-liquidation cascade — forced sells trigger more forced sells (A-share inherited); mirror 空杀空 |
| 轧空 / 逼空 | gákōng / bīkōng | crush / force the shorts | short squeeze; 爆空军 "blow up the air force" (shorts = 空军, see [[trading-slang]]) |

## How the degen behaves

| Term | Pinyin | Literal | Actual meaning / notes |
|---|---|---|---|
| 满仓干 | mǎncāng gàn | full warehouse, charge! | max-size entry; the perps upgrade of 梭哈/一把梭 ([[gambling-film-register]]) |
| 扛单 | káng dān | shoulder the order | refuse to stop out of a losing leveraged position and "carry" it — the register's canonical named vice; ends in 爆仓 or legend |
| 锁仓 | suǒcāng | lock the warehouse | open an equal opposite position to freeze a loss instead of realizing it — cope-hedging that pays double fees and funding to avoid admitting defeat |
| 翻本 / 回本 | fānběn / huíběn | flip back / return the principal | win back losses — the gambler's engine; post-爆仓 ritual is redepositing at *higher* leverage to 翻本 in 一单 ("one trade") |
| 晒单 | shài dān | sun-dry the order | post PnL screenshots; the recruiting fuel of every 带单群 — profit-screenshot generators are an actual cottage industry |
| 实盘 | shípán | real plate | verified live positions — 币Coin and 合约帝 (Héyuēdì, "Contract Emperor," founded May 2019) built leaderboards where 大V traders' real Binance/OKX positions stream publicly, spawning 跟单 (gēndān, copy-trading) bots |
| 带单 / 喊单 | dàidān / hǎndān | lead / shout orders | see [[dai-dan-lao-shi]] and [[kol-shilling-ecosystem]]; the perps economics run on 返佣 (fǎnyòng, fee kickbacks) — top KOL tiers reportedly rebate up to 85% of followers' trading fees (Jiemian investigation, 2021-03) |
| 赌狗 | dǔgǒu | gambling dog | degen self-label, worn with pride; the 戒赌 ("quit gambling") register from Baidu's 戒赌吧 forum supplies the exit vocabulary — [[shang-an]] |
| 合约一天，人间一年 | héyuē yī tiān, rénjiān yī nián | one day in contracts, one year on earth | perps variant of 币圈一天，人间一年 (popularized via the "3点钟无眠区块链" WeChat group, Spring Festival 2018) — leveraged time dilation |

### 反指 (fǎnzhǐ) — the inverse indicator
Short for 反向指标 (fǎnxiàng zhǐbiāo, "reverse indicator"): a KOL whose calls
are so reliably wrong that the community trades *against* them — 反着开 (fǎnzhe
kāi, "open the opposite") / 喊单必反 ("every shout-out reverses"). It is a
genuine institution of the perps register, not just an insult: a famous 反指 is
*valuable*, their liquidations celebrated as tradable signal, and being crowned
反指 paradoxically grows a KOL's following. The same contrarian logic is applied
to data: extreme 多空比 (long/short ratio) and record 爆仓 totals are read as
bottom/top signals ("散户多空比" as fade material). The patron saint is 凉兮
(Liángxī, see incidents below), whose blowups were public enough to trade
against. Related: 韭菜情绪 as counter-signal — see [[jiu-cai]].

## Exchange-adversarial folklore
The perps register assumes the house is hunting you. Some of it is folk theory,
some documented practice (the Jiemian/EEO investigation of 2021-03-15,
"拔网线、吃客损、回滚交易", is the canonical text; 58Coin was raided by police
in Feb 2021 amid exactly these complaints).

| Term | Pinyin | Literal | Actual meaning / notes |
|---|---|---|---|
| 定点爆破 | dìngdiǎn bàopò | targeted demolition | folk belief (demolition-engineering metaphor) that exchanges/whales aim price at visible liquidation clusters to harvest them; the polite English is "stop hunting," the CN version assumes intent |
| 精准插针 | jīngzhǔn chāzhēn | precision needle | aimed 插针; documented variant: bucket-shop KOLs could see followers' entries via referral dashboards and coordinate wicks to their exact liquidation prices (Jiemian, 2021) |
| 拔网线 | bá wǎngxiàn | pull the network cable | exchange "goes down" precisely during violent moves so you can't close, add margin, or withdraw; quoted insider: "拔网线不是稀罕事…防止获利者套现." Canonical accusations: BitMEX's twin outages during 312 (2020), Binance's freezes during 519 (2021) and 10·11 (2025) |
| 宕机 / 系统维护 | dàngjī / xìtǒng wéihù | system crash / maintenance | the official euphemisms for the above; "又双叒宕机" mockery whenever an exchange freezes at a top or bottom |
| 吃客损 / 吃头寸 | chī kèsǔn / chī tóucùn | eat client losses / eat positions | B-book operation: the platform is your counterparty, so your loss is its revenue — "吃客损的收益比手续费挣钱多了" (insider quote, Jiemian); such a venue is a 对赌盘 (duìdǔ pán, "bet-against-you shop," bucket shop) |
| 貔貅盘 | píxiū pán | Pixiu shop | scam venue you can deposit into but never withdraw from — named for the mythical beast that eats gold and has no anus; overlaps [[pig-butchering-dark-lexicon]] |
| 回滚 | huígǔn | roll back | exchange cancels/rewinds trades after the fact, always in its own favor ("回滚交易") |
| 铁索连舟 | tiěsuǒ lián zhōu | iron chains linking the boats | Red Cliffs metaphor (Cao Cao chaining his fleet — one fire burns all) applied to unified-account/cross-collateral design: when collateral (USDe/wBETH/BNSOL) depegged on 10·11, chained accounts liquidated together; headline coinage from Wallstreetcn's post-mortem |

## 维权 (wéiquán) — the post-blowup campaign
维权 ("defend rights") is the fixed aftermath script: 爆仓/穿仓/frozen-withdrawal
victims form 维权群 (rights-defense groups), collect screenshots, 拉横幅 (lā
héngfú, hang protest banners) at exchange offices, and 围堵 (wéidǔ, besiege)
founders. It is structurally desperate: post-924, mainland courts routinely rule
crypto contract losses 不受法律保护 ("not protected by law"), so pressure and
publicity substitute for legal remedy. The word also names the *scam aftermarket*:
fake 维权律师 harvest victims a second time (see [[pig-butchering-dark-lexicon]]).
- Mar 2018: OKEx futures 维权ers reject the company's "切割徐明星" (severing
  itself from founder Xu Mingxing) — "和他无关你信吗?" (People.cn coverage).
- 2018-09-10: after the 9·5 爆仓 (Sept 5 OKEx crash), losers physically 围堵
  徐明星 in Shanghai; protesters and founder end up at the same police station.
- 2020-10-16: OKEx suspends all withdrawals (~200k BTC, ≈¥15B inside) because
  徐明星 was 配合调查 ("cooperating with an investigation") — five weeks of
  维权群 panic; "私钥负责人失联" became a meme excuse.
- 2021-05-19: 519 outage 维权 against Binance — users liquidated while the app
  froze organize cross-border complaint groups.
- 2025-10: after 10·11, Binance pays ~$283M compensation in two batches for
  USDe/wBETH/BNSOL depeg liquidations — 维权 that, for once, paid out.

## Canonical blowups (the folklore corpus)

| Date | Event | What it added to the lexicon |
|---|---|---|
| 2018-07-31 | OKEx whale's ~4.17M-contract BTC quarterly long (~$416M notional) force-liquidated; insurance fund pierced; OKEx claws back from profitable accounts (reported ~2,500 BTC self-injection to soften it) | made 穿仓 and 分摊 infamous; "你被分摊了吗?" |
| 2018-09-05 | OKEx 9·5 crash liquidations → 围堵徐明星 | 维权 script standardized |
| 2019-06-05 | 惠轶 (Huì Yì), founder of 比特易 (BiTeYi), dies by suicide; reportedly 100x short BTC, losing ~2,000 BTC incl. client funds (details unconfirmed) (?) | the register's darkest cautionary tale; cited in every 珍爱生命，远离合约 sermon |
| 2020-03-12 | 312 / 黑色星期四: BTC −~50% in two legs, ~$3B liquidated; BitMEX "DDoS" outages mid-cascade | 拔网线 goes mainstream; 312 joins [[number-slang]] date canon |
| 2021-05-19 | 519: BTC −30% intraday, exchanges freeze; 凉兮 turns ¥1,000 into ¥10M+ shorting it | 519 date-name; birth of a folk hero |
| 2021–2025 | 凉兮 (Liángxī) saga: serial 万倍 runs and blowups, ¥25M profit screenshot followed by −¥12.5M the next day, 8M USDT debt to an exchange, livestream vows to "用合约让交易所破产" and calling CZ "美联储的狗" ("the Fed's dog") | the archetype of 赌狗 livestream culture and weaponized 反指 fame |
| 2025-10-11 | 10·11: $19.1B liquidated across 1.62M accounts in 24h (all-time record); USDe prints $0.65 on Binance; ADL fires on Binance/Bybit/BitMEX; market makers report −50% or bankruptcy | 自动减仓/ADL enters common speech; 铁索连舟; 1011 date-name ([[meme-season-aftermath]]) |

## Gallows humor: the 爆仓 cope register
- **天台见** (tiāntái jiàn, "see you on the rooftop") — the liquidation suicide
  joke, with etiquette about VIP floors by loss size; full etymology in
  [[tian-tai-jian]].
- **关灯吃面** — lights-off noodles after a loss (inherited from A-share forums;
  glossed in [[trading-slang]]); perps chats ritually ask 今晚吃肉还是吃面?
- **重开** (chóngkāi, "restart") — gaming slang for rerolling a save file,
  applied to one's life after 爆仓: "下辈子重开" — nominally a suicide joke,
  functionally a sigh.
- **珍爱生命，远离合约** (zhēn'ài shēngmìng, yuǎnlí héyuē) — "cherish life, stay
  away from contracts": riff on the national anti-drug PSA 珍爱生命，远离毒品,
  posted by the same people opening 100x the next morning. Compare 十赌九输 in
  [[gambling-film-register]] — quoting the warning *is* part of continuing to play
  ([[irony-cope-register]]).
- **一夜暴富 / 一夜归零** — overnight rich / overnight zero: the register's two
  admissible endings; 上岸 ([[shang-an]]) is the mythical third.

## Related links
- [[trading-slang]] — the general trade-verb table this note extends
- [[tian-tai-jian]] — 天台见 atomic note
- [[dai-dan-lao-shi]] · [[kol-shilling-ecosystem]] — who profits from this register
- [[gambling-film-register]] · [[irony-cope-register]] — the registers it blends
- [[meme-season-aftermath]] · [[cn-crypto-eras-timeline]] · [[number-slang]] — 312/519/1011 date canon
- [[binance-gravity-well]] · [[pig-butchering-dark-lexicon]] · [[jiu-cai]] · [[shang-an]] · [[dong-ka]]

## Sources
- Jiemian/EEO investigation 拔网线、吃客损、回滚交易 (2021-03-15): https://www.jiemian.com/article/5802762_toutiao.html · http://www.eeo.com.cn/2021/0315/478200.shtml
- OKEx 穿仓/分摊 official announcement (2018-08-03, via Sina): https://finance.sina.cn/blockchain/2018-08-03/detail-ihhehtqh5136891.d.html · OKX help mirror: https://www.okx.com/zh-hans/help/announcement-on-the-investigation-and-handling-of-btc-contract-abnormality-warehouse-crossing-receipt
- 邢不行, "今天周五，你被分摊了吗 | OKEx穿仓机制详解" (Zhihu, 2018): https://zhuanlan.zhihu.com/p/47073214
- Sina Finance, 疯狂的币圈合约：杠杆最高达125倍 一夜爆仓20亿美金 (2020-04-02): https://finance.sina.com.cn/blockchain/coin/2020-04-02/doc-iimxxsth3252117.shtml
- Xinhua, 百倍杠杆！疯狂的"币圈"带来"暴富"还是"爆仓"？ (2021-05-29): http://www.xinhuanet.com/fortune/2021-05/29/c_1127507606.htm
- Huxiu, 刀尖舔血的币圈合约有多疯狂 (2021): https://m.huxiu.com/article/428437.html
- 网易, 从天堂到天台，为什么币圈总在爆仓 (rooftop-VIP joke, 炒空气): https://www.163.com/dy/article/KH35KB980512JILG.html
- 惠轶 death coverage: https://www.thepaper.cn/newsDetail_forward_3661689 · https://www.zhihu.com/question/328851449 · http://capital.people.com.cn/n1/2019/0612/c405954-31132275.html
- 凉兮: TechFlow, 币圈万倍交易员的互联网流量实验: https://www.techflowpost.com/article/25096 · Sohu, 合约天才凉兮 (2025): https://www.sohu.com/a/887130251_121949984
- OKEx 2018 维权/围堵徐明星: https://tech.sina.com.cn/i/2018-09-12/doc-ihiycyfx6392371.shtml · http://capital.people.com.cn/n1/2018/0326/c405954-29888542.html
- Caixin, OKEx暂停提币 (2020-10-16): https://finance.caixin.com/2020-10-16/101615507.html
- 519 exchange outages: https://www.bilibili.com/read/cv11381622 · https://xnews.jin10.com/details/74713
- 10·11 (2025): Wallstreetcn 铁索连舟 post-mortem: https://wallstreetcn.com/articles/3757039 · Zhihu 调查报道: https://zhuanlan.zhihu.com/p/81932943804 · $19.1B liquidation thread: https://www.zhihu.com/question/1960291273849139598 · Marsbit ADL 亲历者回顾 (2025-12-11): https://news.marsbit.co/20251211102206803707.html
- Funding rate: Wu Blockchain, 永续合约资金费率全解析 (2025-09): https://www.wublock123.com/articles/article-49463 · 腾讯新闻, 资金费率套利 (2025-03-28): https://news.qq.com/rain/a/20250328A04MQJ00
- 币Coin/合约帝 实盘 culture: https://cryptotradingcafe.com/bicoin/ · https://zhuanlan.zhihu.com/p/62227497
- 多空双爆 explainer: https://www.120btc.com/baike/btc/500927020.html
- 插针/宕机 申诉 explainer: https://www.jb51.net/blockchain/1026558bvqi.html
- 币圈一天，人间一年 origin: https://zhuanlan.zhihu.com/p/94749559
