export const config = {
  // Default interval in minutes
  checkInterval: 5,

  // Telegram settings (optional)
  telegram: {
    enabled: false,
    botToken: '',
    chatId: ''
  },

  // API settings
  api: {
    endpoint: 'https://api-v2.solscan.io/v2/account/activity/dextrading',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Origin': 'https://solscan.io',
      'Referer': 'https://solscan.io/'
    },
    pageSize: 10 // last 10 transactions
  },

  // Minimum transaction value in USD to track
  minTransactionValue: 100
}