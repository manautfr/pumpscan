# 🐋 PumpScan - Catch pump.fun whales with ease

Track Solana whale wallet transactions in real-time with optional Telegram alerts. Especially useful for catching Pump.fun snipes. It utilizes solscan API, API key is not required.

![Screenshot](https://s3.amazonaws.com/i.snag.gy/yPb1OI.jpg)

## Installation

## 1) Quick start for Windows users:
1. Download and install [Nodejs](https://nodejs.org/) if you don't have.

2. Download the repository (Click green **Code** button on this page and **Download ZIP** )

3. Extract the archive, double click `start.bat`


## 2) Advanced users
**Prerequisites:**
1. Download and install [Nodejs](https://nodejs.org/) if you don't have.


2. Clone the repo and navigate to it:
   ```bash
   git clone https://github.com/manautfr/pumpscan
   cd pumpscan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (optional) Modify `whales.txt` file with one wallet address per line you want to track:
   ```
   9xtNw....
   EH2aU....
   ...
   ```

4. (optional) Configure settings in `src/config.js`:
   - Set check interval (minutes, default every 5 minutes)
   - Configure Telegram bot (optional, if you want to get notifications for new alerts)
   - Set minimum transaction value to be notified (default 1000 usd)

5. Run the tool:
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

## Contribute?
Feel free to open a pull request if you would like to help develop this tool further.

## Donations
Solana:
`JBQKGGUg1M8Nnsfh5NVs7tDrmdfoUVbiLwCwUFkZoGdA`