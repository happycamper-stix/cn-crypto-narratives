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

- `/decode <name|ticker|phrase>` — full naming-mechanics breakdown (e.g. `/decode 币安人生`)
- `/translate <text>` (or reply to a message with `/translate`) — translate + decode
- plain messages — chat about a coin/narrative; per-chat memory (last 12 exchanges)
- `/clear` — forget the conversation · `/reload` — re-read the vault after edits/`git pull`

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
