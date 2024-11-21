# 🐋 Solana Whale Transaction Tracker

Track Solana whale wallet transactions in real-time with optional Telegram alerts.

## Features

- 🔍 Monitor multiple whale addresses for token transactions
- 💱 Track token swaps with USD value
- ⏰ Configurable check intervals
- 📱 Optional Telegram notifications
- 🎨 Beautiful colored console output

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `whales.txt` file with one wallet address per line:
   ```
   9xtNwPBdjM8WWmotpkUscwMwWqspggduKvAsHRiYpdkN
   <other addresses>
   ```

3. Configure settings in `src/config.js`:
   - Set check interval (minutes)
   - Configure Telegram bot (optional)
   - Set minimum transaction value

4. Start tracking:
   ```bash
   npm start
   ```

## Telegram Setup (Optional)

1. Create a new bot with [@BotFather](https://t.me/botfather)
2. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
3. Update `config.js` with your bot token and chat ID
4. Set `telegram.enabled` to `true`

## Configuration

Edit `src/config.js` to customize:

```javascript
{
  checkInterval: 5,          // Check interval in minutes
  minTransactionValue: 1000, // Minimum USD value to track
  telegram: {
    enabled: false,          // Enable/disable Telegram alerts
    botToken: '',           // Your Telegram bot token
    chatId: ''             // Your Telegram chat ID
  }
}
```

## Output Format

The tool displays transactions in a clear, formatted way:

- Transaction time
- Wallet address
- Token swap details with amounts
- USD value
- Transaction ID

## License

MIT