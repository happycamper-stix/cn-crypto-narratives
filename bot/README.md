# CN Crypto Narratives — Telegram bot

Telegram bot that answers in DMs or when @mentioned/replied-to in groups. It
translates Chinese crypto text to natural English AND decodes the wordplay the
literal translation loses (homophones, number slang, kinship/food metaphors),
grounded in this vault's notes.

## One-time setup

1. **Create the bot** (your Telegram account, ~1 minute):
   - Message [@BotFather](https://t.me/BotFather) → `/newbot` → pick a display
     name and a username ending in `bot` (e.g. `cn_narratives_bot`).
   - Copy the token BotFather gives you.
   - Optional, for groups: BotFather's default *privacy mode is ON*, which is
     what you want — the bot only sees messages that @mention it or reply to it.
2. **Configure**:
   ```bash
   cd ~/cn-crypto-narratives/bot
   cp .env.example .env    # paste TELEGRAM_BOT_TOKEN (and ANTHROPIC_API_KEY if not using `ant auth login`)
   npm install
   ```
3. **Run**:
   ```bash
   npm start
   ```
   DM the bot on Telegram, or add it to a group and @mention it.

## Commands

- **Drop an X/Twitter link** (or `/analyze <link|text>`, or reply `/analyze` to a
  forwarded post) — full pipeline: fetches the post, translates it, matches it
  against every vault term, checks the author against the KOL directory's
  reputational flags, pulls live DEX data for mentioned tickers/names, compares
  the thesis against actual price action, and scores it SIGNAL / MIXED / SLOP
  (0–10) using [references/signal-slop-rubric.md](../references/signal-slop-rubric.md)
- `/pvp <coin A> vs <coin B>` — head-to-head narrative battle (PVP盘 read):
  each side's stance in CN eyes (naming mechanics, 板块/龙头 position, Binance
  adjacency), live momentum + volume comparison, who currently has the rotation
  and whether it's 吸血 (vampiring the other), and what event would flip it
- `/accounts` — measured leaderboard of every author the bot has analyzed:
  avg signal score and how their calls actually timed against price
  (EARLY CALL vs FRONT-RAN counts). Every `/analyze` feeds it; author track
  records are automatically injected into future analyses of the same account,
  so credibility is accumulated measurement, not vibes
- `/decode <name|ticker|phrase>` — full naming-mechanics breakdown (e.g. `/decode 币安人生`)
- `/translate <text>` (or reply to a message with `/translate`) — translate + decode
- `/price <ticker or 中文 name>` — quick DexScreener lookup (price, 1h/24h, liquidity, mcap, pair age)
- `/backtest <X link> [ticker]` — pure numbers, no narrative: fetches OHLCV
  around the post's actual timestamp (GeckoTerminal, free) and reports price
  into the post (24h/6h), after it (1h/6h/24h/3d/7d), peak/trough since, and
  now-vs-post. `/analyze` runs the same measurement automatically and feeds it
  to the verdict (FRONT-RAN / EARLY CALL / EXIT-LIQUIDITY / NO EDGE)
- plain messages — chat about a coin/narrative; the bot's stance is *why CN money
  runs one coin over another* (板块/龙头 rotation, Binance adjacency, naming
  mechanics, 改变命运 psychology); per-chat memory (last 12 exchanges)
- `/clear` — forget the conversation · `/reload` — re-read the vault after edits/`git pull`

## Analysis stack (no paid APIs)

- X posts: fxtwitter/vxtwitter public mirrors (public posts only)
- Prices: DexScreener free search API (works with Chinese token names)
- Backtests: GeckoTerminal free OHLCV API. Candle tier auto-scales to post age
  (15m ≤48h, hourly ≤40d, daily beyond). Measurement guards: no look-ahead (the
  baseline never samples a close from the candle containing the post),
  sub-candle windows reported as unavailable rather than 0.0%, staleness-bounded
  sampling so dead/sparse pools can't mislabel windows, and peak/trough include
  the post's own candle so same-hour pump-and-dumps stay visible
- Term matching: ~500-term lexicon auto-built from the vault's glossary/pattern
  tables; ~87 KOL handles indexed from the CT directory

## How it works

- Loads every vault note at startup. The core lexicon (README + the four big
  glossary tables) lives in a cached system prompt; the rest is retrieved
  per-message by CJK-bigram + keyword matching and injected into the turn.
- Claude Opus 5 via the official SDK, with server-side refusal fallbacks
  enabled (`fallbacks: "default"`), so a safety decline reroutes instead of
  dead-ending.
- Conversation history is in-memory only; restart or `/clear` resets it.

## Keep it running (macOS)

```bash
cat > ~/Library/LaunchAgents/com.cn-crypto-bot.plist <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.cn-crypto-bot</string>
  <key>WorkingDirectory</key><string>/Users/joshandrews/cn-crypto-narratives/bot</string>
  <key>ProgramArguments</key><array>
    <string>/usr/local/bin/node</string><string>index.js</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>/tmp/cn-crypto-bot.log</string>
  <key>StandardErrorPath</key><string>/tmp/cn-crypto-bot.log</string>
</dict></plist>
EOF
launchctl load ~/Library/LaunchAgents/com.cn-crypto-bot.plist
```

(Check `which node` and fix the path in `ProgramArguments` if it differs.)
