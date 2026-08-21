---
title: Code-Switching Mechanics
tags: [cn-crypto-narratives, pattern]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# English–Chinese Code-Switching Mechanics (中英夹杂)

## Context
中英夹杂 (zhōng-yīng jiāzá, "Chinese-English intermixing" = code-switching) is
the layer where raw English words sit *inside* Chinese grammar: 被rug了, gas费,
mint一下, 冲alpha. After [[pinyin-initialisms]], it is the layer that most
reliably defeats machine translation — an MT engine sees "rug" and translates a
carpet, missing that 被 has already marked it as a verb of misfortune.

The layer is not random sprinkling. Chinese is always the **matrix language**:
every piece of grammar — aspect particles, the passive marker, measure words,
resultative and directional complements, negation — stays Chinese, and English
supplies only content morphemes (verbs, nouns, acronyms) that snap into Chinese
slots. Crypto inherited the template ready-made from the wider Chinese internet:
打call (dǎ call, "hit call" = cheer for someone; from Japanese idol culture
コール, mainstreamed mid-2017), hold住 (hold-zhù, "hold-firm" = keep it
together; viral Aug 2011 via TW variety-show line 整个场面我要hold住), 立flag
(lì flag, "erect a flag" = jinx oneself by declaring a goal). 光明网 called
these 混合词 — "mixed-blood words" — in a Feb 2019 column. Crypto just runs the
machine at industrial speed.

**Core thesis**: which language a term surfaces in dates it. Slang from the
CEX/gambling era (pre-2021: 爆仓, 梭哈, 割韭菜, 拉盘/砸盘) is Chinese; slang
from the on-chain era (NFT summer 2021 onward: mint, gas, rug, fomo, alpha,
degen) embeds English — because the dApp buttons, Discords, and metas were
English-first. The Nov 2021 wave of Zhihu explainers ("玩转海外加密世界，这22个
行话你必须知道！") is the datable import moment: gm, wagmi, ape, rekt, fren
were introduced to CN readers untranslated, as vocabulary to *use*, not
translate. By Jan 13, 2025, KOL 小塞 (@EvanCrypto17) was posting a 《币圈英语
黑话大全》 ("complete dictionary of crypto English black-speak") for Chinese
newcomers — the community formally curating its own English layer.

## The four grammatical slots

| Slot | Frame | Example | Gloss |
|---|---|---|---|
| Adversative passive | 被 + Eng.V + (了) | 被rug了 | bèi rug le — "suffered a rug" = got rug-pulled |
| Verb + aspect/complement | Eng.V + 了/一下/住/成/过去 | mint了两张 | mint-le liǎng zhāng — "minted two [flat-object MW]" = minted two NFTs |
| Hybrid compound noun | Eng.N + Chinese morpheme | gas费 | gas-fèi — "gas fee" = on-chain transaction fee |
| Measure-word assignment | 一 + MW + Eng.N | 一枚token | yī méi token — "one [coin-MW] token" |

The fourth slot is the subtlest: assigning a Chinese measure word is the moment
a loan becomes grammatically Chinese. NFTs take 张 (zhāng, the measure word for
flat things like paper and photos — 两张NFT "two sheets of NFT"), tokens take
枚 (méi, coins/badges) or plain 个, chains take 条 (tiáo, long things), a swap
takes 笔 (bǐ, transactions). No English plural ever survives.

## Slot 1: 被 + English verb — grammar that encodes misfortune
The Mandarin 被 (bèi) passive classically carries **adversative semantics**: it
is preferred when the subject is a victim. English disaster-verbs therefore
embed frictionlessly — the grammar itself supplies "…and it was bad":

| Form | Pinyin/gloss | What happened to you | Register note |
|---|---|---|---|
| 被rug了 | bèi rug le, "got rugged" | dev/team pulled liquidity and ran | on-chain era; the English keeps the technical DeFi sense |
| 被割了 | bèi gē le, "got cut" | harvested by *anyone* — KOL, exchange, whale | native, CEX-era generic; see [[ge-jiu-cai]] |
| 被套了 | bèi tào le, "got trapped" | bought high, can't sell without loss | native, inherited from A-share stock slang |
| 被夹了 | bèi jiā le, "got pinched/sandwiched" | MEV bot sandwich-attacked your DEX swap (三明治攻击 sānmíngzhì gōngjī, "sandwich attack") | on-chain era but *calqued* — the metaphor translated, the verb went native |
| 被dump了 | bèi dump le, "got dumped on" | insider/whale market-sold into your entry | (?) less lexicalized than 被rug; 被砸盘 competes |
| 被爆仓 / 被清算 | bèi bàocāng / bèi qīngsuàn | position liquidated (futures / DeFi lending) | native won — liquidation predates the import era; "被liquidate" is vanishingly rare |

The division of labor is diagnostic: **the verb's language tells you where the
disaster happened**. On-chain-native disasters (rug, dump-on) take the English
loan; CEX-era and TradFi-inherited disasters (爆仓, 套牢, 割) stay Chinese.
被夹 shows the third path — a new on-chain concept young enough to be coined
directly in Chinese because the *metaphor* (sandwich) translated perfectly.

Related irony: the wider Chinese internet's 新被字句 ("new bèi construction" —
被就业 "been employed", 被自杀 "been suicided", ca. 2008–09) sarcastically marks
things done *to* you while claimed voluntary. 被rug inherits that smirk: you
didn't sell, the selling was done unto you.

## Slot 2: English verbs under Chinese aspect — the button-verb rule
The English verbs that entered Chinese are almost exactly **the words printed
on dApp buttons**: mint, swap, bridge, claim, stake, approve, list. You click
"Mint", so you say mint. Actions with no button stay Chinese: 冲 (chōng,
"charge" = ape in), 撸 (lū, "stroke/pluck" = farm, see [[lumao-industrial-complex]]),
埋伏 (máifú, "ambush" = position early), 抄底 (chāodǐ, "scoop the bottom"),
跑路 (pǎolù, "run away" = the *team's* act behind your 被rug).

- **mint一下** (mint yīxià, "mint a bit") — delimitative 一下 softens it to a
  casual flex; **mint了两张** takes perfective 了 plus measure word.
- **fomo了** (fomo le) — the acronym FOMO (Fear Of Missing Out) verbifies and
  takes aspect: 我fomo了 "I fomo-bought". Native near-synonym 追高 (zhuīgāo,
  "chase the high") describes the act; fomo names the *emotion driving it*.
  踏空 (tàkōng, "step into emptiness" = miss the pump entirely) is FOMO's
  trigger, not its translation.
- **swap成U** (swap-chéng U, resultative 成 "into") = swap into USDT;
  **bridge过去** (bridge guòqu, directional 过去 "over") = bridge funds across.
- **hold住** (hold-zhù, resultative 住 "firm") = hold and don't fold — the 2011
  loan recycled; competes with native 拿住 (názhù) and calque 钻石手 (zuànshíshǒu,
  "diamond hands").
- **All in了** — alternates with 梭哈 (suōhā, from HK God-of-Gamblers "show
  hand", see [[gambling-film-register]]); All in reads younger/CT-native,
  梭哈 reads old-guard gambler.
- Question formation: English verbs take the 吗 question ("mint吗？") but
  resist A-not-A reduplication in Mandarin (*mint不mint is jocular at best);
  Cantonese HK chat does allow the pattern (hold唔hold得住) (?).

**The counter-example that proves the rule**: when the meta itself is
Chinese-led, the community coins a Chinese verb instead. BRC-20 inscription
mania (2023) — a CN-retail-dominated meta — produced 打铭文 (dǎ míngwén, "strike
inscriptions"), with 打 the piecework-labor verb of 打工, *not* "mint铭文". The
verb's language tracks who owns the narrative. See [[inscription-mania]].

## Slot 3: hybrid nouns and the loan-vs-calque ledger
For each imported concept there was a three-way race: raw loan (keep English),
calque (translate the metaphor), or transliteration. The winner is telling:

| Concept | Loan form | Calque/native | Who won (mainland) | Notes |
|---|---|---|---|---|
| gas | gas费 (gas-fèi) | 矿工费 "miner fee" / 燃料费 "fuel fee" | **loan** — gas费 everywhere incl. TechFlow/Odaily prose | wallets' UI text says Gas |
| rug pull | rug / 被rug | 跑路 "flee", 卷款 "roll up the money" | **split** — rug for the on-chain act, 跑路 for the humans | |
| airdrop | airdrop | 空投 (kōngtóu, "air-drop", military calque) | **calque** — 空投 fully nativized by 2018 | older euphemism 糖果 "candy", see [[censorship-evasion-coinage]] |
| whale | whale | 巨鲸 (jùjīng, "giant whale") | **calque** | early enough (2017–18) for media to translate |
| diamond hands | — | 钻石手 (zuànshíshǒu) | **calque** | TW: 鑽石手; paper hands = 纸手 (zhǐshǒu) |
| pump/dump | pump/dump | 拉盘/砸盘 (lāpán/zápán, "pull/smash the plate") | **native** — predates import era | see [[suffix-morphology]] for 盘 |
| honeypot token | honeypot | 貔貅盘 (píxiū pán, "Pixiu scheme" — mythical beast that eats and never excretes: you can buy, never sell) | **native metaphor** — 貔貅盘 dominant | the best CN-side coinage in the ledger |
| memecoin | Meme币 (Meme-bì) | 迷因币 (míyīnbì, transliteration) | **loan hybrid** on mainland; TW prefers 迷因幣 (BlockTempo, May 2024) | mainland also 土狗 for the degen tier |
| alpha | alpha / 冲alpha | 内幕 "inside info" ≠ (carries illegality) | **loan** — alpha群 "alpha groups", 冲alpha "ape the alpha" | Binance Alpha (launched Dec 2024) hardened it into a proper noun; 2025's grind was 刷Alpha分 (shuā Alpha fēn, "grind Alpha points" — 腾讯新闻, Sept 2025) |
| testnet | 撸testnet / testnet交互 | 测试网 (cèshìwǎng) | **both** — 撸测试网 and 撸testnet free-vary | 交互 (jiāohù, "interact") is itself a calque of "interactions" as an airdrop-farming unit |
| whitelist | WL | 白名单 (báimíngdān) | **both** — 白名单 in prose, WL in chat | |
| KYC | KYC | 身份验证 | **loan** — even TechFlow glosses it parenthetically | |

Heuristic emerging from the ledger: **concepts that arrived pre-2021 got
calqued by media; concepts that arrived via dApp UI stayed English; concepts
where a Chinese metaphor outperformed the English one went native** (貔貅盘 >
honeypot, 三明治/被夹 > sandwich).

## Ticker vs nickname vs translation — the three-register system
Every major coin has three names, and the choice is a register signal:

| Register | BTC example | ETH example | Signals |
|---|---|---|---|
| Official translation | 比特币 (bǐtèbì) | 以太坊 (yǐtàifāng) | media, regulators, newbies, out-group explanation |
| Latin ticker | BTC | ETH / E | trader default: keyboard-cheap, chart-language, censor-resistant |
| Chinese nickname | 大饼 (dàbǐng, "big flatbread") | 姨太 (yítài, "concubine") / 二饼 | in-group veteran, affective, pre-2021 币圈 cohort marker |

- **Censorship gradient**: on WeChat/Weibo, 比特币 and 卖币 are the filterable
  keywords; Latin "BTC" breaks naive matching (same logic as 币→B, U for USDT —
  see [[censorship-evasion-coinage]]); 大饼 is invisible — a breakfast word.
  English embedding is thus partly a *censorship technology*: the mixed
  sentence 出了点BTC换U reads as noise to a keyword filter.
- **Cohort marker**: 大饼/姨太 date a speaker to the mainland CEX era; a
  Solana-degen CT native says SOL, not 索拉纳. Using 以太坊 in a trading chat
  marks you as a journalist or a 小白 (xiǎobái, "little white" = newbie).
- **Sentiment channel**: the nickname layer, not the ticker, carries mood —
  索拉纳 → 傻拉纳 (shǎlānà, "stupid-lana") when SOL dumps. Tickers are
  emotionally flat; see [[transliteration-mechanics]] and [[coin-nicknames]].
- **Reverse flow (2025–26)**: CN-native token names now go out *untranslated*
  (币安人生 "Binance Life", minted from CZ's May 2025 reply 祝你币安人生), with
  pinyin tickers — English CT doing the decoding for once. See
  [[launchpad-naming-meta]].

## Why the English survives untranslated
1. **UI determinism** — the button is the verb (mint/swap/claim/stake).
2. **Efficiency** — gas费 is two syllables; 区块链交易手续费 is eight.
3. **Semantic precision** — rug ≠ 跑路 exactly; fomo ≠ 追高 exactly; the loan
   preserves the imported concept's edges.
4. **In-group signaling** — same dynamic 网易 documented for 国贸 white-collar
   code-switching: the mix marks you as operating in the bilingual arena.
   Overdoing it draws the same mockery (装逼 zhuāngbī, "acting pretentious").
5. **Filter evasion** — Latin strings degrade keyword censorship (above).

## Decoding heuristic
Treat any Latin string in CN crypto text as one of four things, tested in
order: (1) a ticker; (2) a pinyin initialism — expand to a stock phrase, see
[[pinyin-initialisms]]; (3) an English *verb* if it follows 被 or precedes
了/一下/成/过去 — read the surrounding Chinese grammar for voice, aspect, and
victimhood; (4) an English *noun* if it carries a measure word or a Chinese
suffix (费/币/盘/群/分). Then date the term: English root → post-2021 on-chain
era; Chinese root → CEX/gambling era or a Chinese-led meta.

## Related links
- [[pinyin-initialisms]] — the other Latin-alphabet layer, and rule (2) above
- [[censorship-evasion-coinage]] — why Latin strings are safer strings
- [[transliteration-mechanics]] — what happens when English *is* translated
- [[coin-nicknames]] · [[da-bing]] · [[da-yi-tai]] — the nickname register
- [[suffix-morphology]] — the Chinese morphemes that hybridize (费/盘/圈/党)
- [[inscription-mania]] — 打铭文, the native-verb counter-example
- [[lumao-industrial-complex]] — 撸testnet's home ecosystem
- [[ge-jiu-cai]] — 被割, the native adversative baseline

## Sources
- Zhihu, 玩转海外加密世界，这22个行话你必须知道！ (Nov 2021, the import moment): https://zhuanlan.zhihu.com/p/431565983
- 小塞 @EvanCrypto17, 《币圈英语黑话大全》 X thread (Jan 13, 2025): https://x.com/EvanCrypto17/status/1878768728512553403
- 深潮 TechFlow, 不炒币只做币圈生意，95后们的撸毛生意经 (Jun 21, 2024 — gas费/KYC/女巫 in professional prose): https://www.techflowpost.com/article/detail_18576.html
- Odaily, 2025撸毛还值得吗？专访6位"空投学家" (Feb 20, 2025): https://finance.sina.com.cn/blockchain/roll/2025-02-20/doc-inemawir9383383.shtml
- BlockTempo (TW), 2024幣圈術語大全 (May 2, 2024 — 迷因幣/土狗幣/金狗幣): https://www.blocktempo.com/a-summary-of-common-terms-in-the-crypto-circle/
- MaiCoin (TW), 幣圈新手必讀大全 60+術語 (Jan 5, 2026): https://blog.maicoin.com/2026/01/05/maicoin-crypto-beginners-60-cryptocurrency-terms-dyor-fomo-dao/
- Web3小白科普系列：加密社区行业黑话全解 第一弹 (2023 — LFG = "冲TMD"): https://zhuanlan.zhihu.com/p/632485164
- 光明网, 混合词：词语中的"混血儿" (Feb 16, 2019 — 打call/hold住/立flag as a word-class): https://news.gmw.cn/2019-02/16/content_32512575.htm
- 百度百科, 打call (origin in Japanese idol culture, mainstreamed 2017): https://baike.baidu.com/item/%E6%89%93call/22064311
- China Daily, 2011年网络流行语你"hold住"吗？ (Dec 31, 2011): https://www.chinadaily.com.cn/dfpd/shehui/2011-12/31/content_14364880.htm
- 网易, 国贸er聊天儿常中英混杂 (code-switching motives among CN professionals): https://m.163.com/dy/article/D2HRQUCT05149OCI.html
- 知乎, MEV 三明治攻击全解析 (被夹/三明治攻击 usage): https://zhuanlan.zhihu.com/p/31309794028
- 腾讯新闻, 「超级加倍」规则来袭 年度Web3爆品Binance Alpha何处去 (Sept 5, 2025 — 刷Alpha分 era): https://news.qq.com/rain/a/20250905A04KLS00
- 非小号, 币圈「噜空投」全攻略 (Gas Fee/DYOR embedded in prose): https://www.feixiaohao.com/news/12275396.html
- East Asia Student, Mandarin passive voice 被 (adversative semantics): https://eastasiastudent.net/china/mandarin/passive-voice/
