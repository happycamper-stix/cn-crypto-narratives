---
title: Emoji, Sticker & Image-Substitution Codes
tags: [cn-crypto-narratives, pattern]
created: 2026-08-21
updated: 2026-08-21
status: active
type: permanent
---

# Emoji, Sticker & Image-Substitution Codes (视觉黑话)

## Context
[[censorship-evasion-coinage]] covers the *textual* replacement lexicon (大饼, 上车,
出U). But mainland narratives actually form inside WeChat 微信群 and Telegram
groups, where a large share of the discourse is not text at all: emoji strings,
sticker packs (表情包 biǎoqíngbāo, "expression packs"), K-line screenshots, PnL
share cards, and QR codes. This is the visual layer of the same evasion system —
and the layer a keyword-based monitoring pipeline misses entirely. 视觉黑话
(shìjué hēihuà, "visual black-speech") is not a native term of art (?); the
community just calls all of it 表情包/梗图 (gěngtú, "meme images") and 截图
(jiétú, "screenshots").

## Why images: the filtering machinery being evaded
Citizen Lab's reverse-engineering of WeChat (2018–2019) explains the incentive
structure precisely:

| Channel | How WeChat polices it | Latency | Practical consequence |
|---|---|---|---|
| Text in chats | keyword/combination blacklists | real-time | 币/卖币/交易所 talk risks flags → replaced by slang or moved to images |
| Images in chats | MD5 hash index of known-bad images | real-time | only *already-indexed* images blocked; a fresh screenshot always passes |
| Images (deferred) | OCR (grayscale + blob merging) + visual-similarity fingerprinting, feeding new hashes into the index | minutes–later | a viral sensitive image dies after first circulation; slightly-edited copies revive it |
| Group chat vs 1-to-1 | separate hash indexes; groups filtered more heavily | — | sensitive material moves to DMs or offshore Telegram |
| Account type | filtering applies to mainland-registered accounts | — | overseas-registered members become a group's "image mules" (?) |

Key detail: changing metadata or a few pixels changes the MD5, so re-encoded,
cropped, or watermark-stamped copies of a blocked image pass again — which is
exactly what sticker re-sharing and screenshot-of-a-screenshot chains do
naturally. Political enforcement is the priority of these systems; ordinary
price talk inside an image is, in practice, invisible. Hence the core analyst
problem: **the alpha is in the JPEGs.**

## Emoji substitution table
Emoji do to the lexicon what food words did in the text layer: an unfilterable
surface. Read them as vocabulary, not decoration.

| Emoji | Stands for | Gloss | Actual meaning in feed |
|---|---|---|---|
| 🥬 / 🌱 / 🌿 | 韭菜 (jiǔcài, "chives") | Unicode has **no leek/chive emoji**, so bok-choy or seedling substitute | retail bagholders; self-mocking "I'm the exit liquidity" — see [[jiu-cai]] |
| 🥬🔪 / ✂️ | 割韭菜 (gē jiǔcài, "cut chives") | vegetable + blade | a dump on retail just happened / is coming — see [[ge-jiu-cai]] |
| 🧅 | 韭菜 variant (?) | onion-as-leek | same as 🥬; rarer, mostly on X |
| 🚀 🌕 | 冲 (chōng, "charge") / 登月 (dēngyuè, "moon landing") | rocket + full moon | "to the moon", imported EN convention; 冲🚀 is the standard CN bullish reply |
| 🐂 / 🐮 | 牛市 (niúshì, "bull market") | ox | bullish; also first half of the rebus 🐂🍺 = 牛逼 (niúbī, lit. "cow's genitals" = "awesome") |
| 🐻 | 熊市 (xióngshì, "bear market") | bear | bearish |
| 💎🙌 | 钻石手 (zuànshí shǒu, "diamond hands") | diamond + raised hands | hold through anything; entered CN discourse ~2021-05-20 when Sina Finance glossed Musk's "Tesla has 💎🙌" tweet for mainland readers, the day after the 519 crash |
| 🧻🙌 | 纸手 (zhǐshǒu, "paper hands") | toilet paper + hands | weak seller; the mocking antonym |
| 🕯️ | 点蜡 (diǎnlà, "light a candle") | candle | mourning someone's liquidation (爆仓 bàocāng) or a token's 归零 (guīlíng, "return to zero"); inherited from 股吧 stock-forum mourning ritual. Precedent: Sina Weibo silently removed its candle emote before the June-4 anniversary in 2012 — proof platforms police emoji, which is why substitutes rotate |
| 🪦 | 归零 / 死了 | gravestone | project dead; often 🪦 + ticker |
| 🍜 | 关灯吃面 (guāndēng chīmiàn, "turn off the lights and eat noodles") | noodles | catastrophic loss borne alone; A-share forum classic (c. 2011) fully inherited by 币圈 |
| 🤡 | 小丑 (xiǎochǒu, "clown") | clown | "小丑竟是我自己" self-mockery after being dumped on — register of [[irony-cope-register]] |
| 🐕 / 🐶 | 土狗 (tǔgǒu, "dirt dog") / Doge | dog | memecoin; 金狗 (jīngǒu, "golden dog" = 100x winner) sometimes 🐕💰 (?) |
| 🐋 / 🐳 | 巨鲸 (jùjīng, "giant whale") | whale | whale wallet |
| 🧱 | 搬砖 (bānzhuān, "moving bricks") | brick | cross-exchange arbitrage |
| ⛏️ | 挖矿 (wākuàng, "digging mines") | pick | mining / farming yield |
| 🧧 | 红包 (hóngbāo, "red packet") | red envelope | airdrop/giveaway culture; concretely, Binance 口令红包 (kǒulìng hóngbāo, "password red packets") — KOLs post a code word on X/Binance Square, users redeem in-app (flow documented by 币安华语, 2024-02) |
| 4️⃣ | CZ's "4" | digit four | "ignore FUD" — the inverted-luck 4 meme; see [[number-slang]] and the Four.meme naming chain |
| 📈 📉 🎢 | 拉盘 (lāpán, "pull the plate") / 砸盘 (zápán, "smash the plate") / 过山车 (guòshānchē, "roller coaster") | charts, coaster | pump / dump / violent chop |
| 🅱️ | 币 (bì, "coin") (?) | B button | occasional visual swap in the same spirit as 出B/屯B letter-shielding — see [[homophone-wordplay]] |

## The emoji rebus register (抽象话)
抽象话 (chōuxiànghuà, "abstract speech") — from the 抽象工作室 ("abstract
studio") livestream culture, formed 2015 by 李赣 (Lǐ Gàn) with 孙笑川
(Sūn Xiàochuān) as its eventual figurehead — converts each syllable to a
homophone/pictograph emoji: 真的厉害 "truly impressive" → 针 (needle) 💧 (drop
= 的/滴) 💪 (力) ⛵ (害/海). Web generators automated it (one-click converters
covered by tech media 2020-04; open-source NMSL converter on GitHub), and the
register was explicitly noted to slip profanity and sensitive words past
keyword filters. In crypto chats it appears as seasoning rather than full
sentences — 🐂🍺, 🍋 (柠檬 níngméng "lemon" = 酸了 "I'm envious" of someone
else's 100x), plus the table above. Treat any string of nonsense emoji in a CN
chat as candidate rebus: read each emoji's *Chinese name* aloud —
the same decoding move as [[homophone-wordplay]], one modality over.

## Sticker packs (表情包) as standard vocabulary
- WeChat custom stickers (自定义表情) are user-uploaded images — they carry
  text *inside the image*, so a sticker saying 梭哈 (suōhā, "all-in") or
  割韭菜 travels where the typed phrase might trip filters, and re-encoding on
  each save/forward churns the MD5.
- Dedicated crypto packs are a genre: 金色财经 ran "币圈新老韭菜必备表情包"
  ("essential stickers for new and old leeks", 2019-03); download-site compilations of
  炒币专用微信表情包 ("WeChat stickers for coin speculation", e.g. 2021-10-25);
  a 2022-03 developer-shared 区块链暨炒币表情包 pack contained 60 stickers
  (38 with captions, 22 without). Standard templates are the 熊猫头
  (xióngmāotóu, "panda head") and 蘑菇头 (mógutóu, "mushroom head") macro
  faces with captions like 梭哈 / 冲 / 稳住 / 心态崩了 (?)
- Finance platforms mint their own bracket-emotes that become vocabulary:
  雪球 (Xueqiu) and moomoo expose custom emotes like [韭菜] and [惊恐]
  ("terror") (?) — a platform-native emoji layer invisible off-platform.
- Telegram sticker culture loops back into WeChat: tutorials for batch-exporting
  TG stickers to WeChat (and building packs via @Stickers bot) circulate in CN
  channels, making stickers the lexicon's cross-platform carrier between the
  offshore (TG) and onshore (WeChat) halves of a community.
- Sticker literacy is also *social* proof: posting the right 割韭菜 panda at the
  right moment marks you as 老韭菜 (lǎo jiǔcài, "old leek", cycle veteran), the
  same status work as slang fluency in text.

## The screenshot channel (截图 alpha)
The single most important habit for a feed analyst: **price talk rides inside
images.**

- **快讯 cards / long images (长图)** — CN crypto media and apps ship
  share-as-image buttons; newsflash headlines circulate in groups as rendered
  cards, not links (links can be domain-blacklisted; JPEGs cannot).
- **PnL share posters (收益分享卡片 / 交割单 jiāogēdān, "settlement slip")** —
  exchange apps generate stylized profit-screenshot posters with an embedded
  referral QR. These are the currency of credibility: 晒单 (shàidān, "sunning
  one's orders" = posting your fills) is how a KOL recruits.
- **Paid-group leakage** — calls from 付费群 (paid groups) circulate outward as
  screenshots into free groups; the paid-community platforms themselves (知识星球
  "Knowledge Planet", 芥末圈 "Mustard Circle") were built on 荐币/喊单/行情预测
  ("coin-shilling, call-shouting, price prediction"). Dated anchor: 2018-02,
  易理华's 杰克船长 ("Captain Jack") circle raised entry fees 300→500→888→2,888
  yuan within one day and took in 4M+ yuan — all marketed via screenshot relays.
  See [[kol-shilling-ecosystem]] and [[dai-dan-lao-shi]].
- **Screenshot theater** — the scam-side mirror: 带单 groups run hired shills
  posting fabricated profit screenshots on schedule ("跟着大佬就是有肉吃" —
  "follow the boss and you eat meat"), with P图 (P-tú, "Photoshopped image")
  收益截图 as the core prop; losing groups are silently dissolved so only
  winning screenshots survive (People's Daily exposé of the parallel stock-group
  playbook). A screenshot in a CN feed is *evidence-shaped*, not evidence.
- **QR codes as image-borne hyperlinks** — group invites (群二维码), exchange
  APK downloads (documented in 带单老师 investigations), and referral codes all
  travel as QR images, defeating URL blacklists; the QR is the load-bearing
  pixel block in most recruitment images.
- **OCR arms race** — WeChat's deferred OCR (grayscale conversion + blob
  merging; 309 of 876 tested keyword combos triggered image censorship in 2018)
  can eventually read captions, so persistent evaders rotate text angle, split
  characters, or restyle stickers — the visual cousin of homophone rotation.

## Pressure timeline (what pushed discourse image-ward)
| Date | Event |
|---|---|
| 2012-06 (pre-June 4) | Sina Weibo removes candle emote, blocks 蜡烛 searches — emoji itself shown to be censorable |
| 2017-09-04 | 九四 ICO/exchange ban: crypto talk becomes a filtered category — see [[censorship-evasion-coinage]] |
| 2018-08-21 | First WeChat 公众号 purge: 金色财经, 深链财经, 火币资讯, 大炮评级, TokenClub, 币世界快讯 et al. banned overnight |
| 2019-11-20 | Second wave: 深链Deepchain, 币圈邦德, 壹块硬币, 炒币学堂 banned; accounts respawn as 马甲 (mǎjiǎ, "vest" = sockpuppet) |
| 2019-12-12 | Weibo bans 孙宇晨 (Justin Sun) and 币安一姐 何一 (He Yi) |
| 2020-03-10 | 发哨子的人 ("The Whistle-Giver", 人物 magazine) censored in 3 hours; netizens relay it in emoji, Morse, seal script, Braille, even DNA-sequence encodings — the canonical demonstration of the image/encoding relay playbook crypto groups inherit |
| 2021-05-19/20 | 519 crash; Musk's 💎🙌 tweet glossed into 钻石手 by mainland finance media — EN emoji idiom formally imported |
| 2021-06-05 | Weibo purges 34+ crypto 大V; survivors deploy backup accounts, drop 比特币/区块链 from names, some ironically rebrand as *food or photography bloggers* — evasion by innocuous-surface, the account-level twin of food-word slang |

## Decoding heuristic
1. **OCR everything**: run every image in a monitored feed through OCR *and* QR
   decoding; the caption text and the QR payload are the message.
2. **Read emoji as Chinese words**: expand each emoji to its Mandarin name and
   listen for homophones (🐂🍺 → niú bī), then map market metaphors
   (vegetables → retail, blades → dumps, candles → mourning).
3. **Date the sticker**: a suddenly-ubiquitous new sticker template is a
   narrative event, same as a new coinage in text.
4. **Distrust screenshots by default**: classify as (a) leaked paid-group call,
   (b) self-promotional 晒单, or (c) scam theater — the P图 rate is high in all
   three.
5. **Watch the substitution frontier**: when a platform starts catching one
   emoji/sticker (or removes it, as Weibo did the candle), the community rotates
   to an adjacent one; the rotation itself flags which topic is hot.

## Sources
- Citizen Lab — [(Can't) Picture This: image filtering on WeChat Moments (2018-08)](https://citizenlab.ca/2018/08/cant-picture-this-an-analysis-of-image-filtering-on-wechat-moments/) · [(Can't) Picture This 2: realtime image filtering in WeChat chats (2019-07)](https://citizenlab.ca/2019/07/cant-picture-this-2-an-analysis-of-wechats-realtime-image-filtering-in-chats/) · [OCR test corpus](https://github.com/citizenlab/chat-censorship/blob/master/wechat/image-filtering/ocr.html)
- CDT — [六四周年临近 新浪微博悄然撤下"蜡烛"表情 (2012)](https://chinadigitaltimes.net/chinese/228756.html)
- 界面 — [微博大规模封禁"币圈大V" (2021-06)](https://www.jiemian.com/article/6200616.html) · 腾讯新闻 [mirror](https://news.qq.com/rain/a/20210607A06QKP00)
- 21财经 — [币圈微信公号被屏蔽 (2018-08-21)](https://m.21jingji.com/article/20180821/herald/9fdbed4d300b2f8ff26a2a7f57d1dd16.html) · 知乎 [当晚记录](https://zhuanlan.zhihu.com/p/42672941) · 新京报 [2019年11月第二波 (2019-11-20)](https://m.bjnews.com.cn/detail/157425923415788.html) · 澎湃 [区块链媒体被封](https://m.thepaper.cn/newsDetail_forward_5034325)
- 新浪财经 — [马斯克发个表情为何让比特币大反弹？一文读懂美国币圈黑话 (2021-05-20)](https://finance.sina.com.cn/roll/2021-05-20/doc-ikmyaawc6452340.shtml)
- 未央网 — [芥末圈："知识付费"面具下的币圈割韭菜大本营](https://www.weiyangx.com/338244.html)
- 网易 — [币圈幻影（一）"带单老师"与交易所返佣](https://c.m.163.com/news/a/H2HH0RT50519DFFO.html) · 人民日报客户端 — [亲历炒股群套路：每天晒账户收益](https://www.peopleapp.com/column/30037713289-500002744637)
- 金色财经 — [币圈新老韭菜必备表情包](https://www.jinse.com/blockchain/331424.html) *(unreachable at research time; title attested via search index)* · [炒币专用微信表情包合集 (2021-10-25)](https://www.xitong520.com/xtjc/20211025/1635154320.html) · [区块链暨炒币表情包 (CSDN, 2022-03)](https://blog.csdn.net/xiqiao_ce/article/details/123568840)
- 抽象话 — [萌娘百科条目](https://zh.moegirl.org.cn/抽象话) · [一键生成抽象话 (2020-04-26)](https://t.cj.sina.com.cn/articles/view/5836457170/15be144d201900qvs2) · [NMSL 转换器 (GitHub)](https://github.com/gaowanliang/NMSL)
- Wikipedia — [Ai Fen / 发哨子的人 censorship relay](https://en.wikipedia.org/wiki/Ai_Fen)
- 币安华语 — [红包口令领取流程 (X, 2024-02)](https://x.com/binancezh/status/1755799485114900594)
- 雪球 — [[韭菜]表情建议收入emoji](https://xueqiu.com/1755110761/102583037) · moomoo — [快跑割韭菜来了[惊恐]](https://www.moomoo.com/403)
- Telegram↔WeChat sticker tooling — [毒奶：TG贴纸批量导出至微信](https://limbopro.com/archives/4710.html)

## Related links
- [[censorship-evasion-coinage]] — the textual layer this note extends
- [[homophone-wordplay]] — the decoding move shared by the emoji rebus
- [[food-metaphors]] · [[jiu-cai]] · [[ge-jiu-cai]] — what 🥬🔪 encodes
- [[number-slang]] — 4️⃣ and the digit layer
- [[irony-cope-register]] — 🤡/🕯️/🍜 as cope
- [[kol-shilling-ecosystem]] · [[dai-dan-lao-shi]] — who produces the screenshots
- [[pinyin-initialisms]] — the other machine-translation-proof layer
