import fs from 'fs/promises';
import TelegramBot from 'node-telegram-bot-api';
import { config } from './config.js';
import colors from 'colors';

export async function loadWhaleAddresses() {
  try {
    const content = await fs.readFile('whales.txt', 'utf-8');
    return content.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
  } catch (error) {
    throw new Error('Failed to load whale addresses: ' + error.message);
  }
}

export async function sendTelegramAlert(message) {
  if (!config.telegram.enabled) return;
  
  try {
    const bot = new TelegramBot(config.telegram.botToken);
    await bot.sendMessage(config.telegram.chatId, message, {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });
  } catch (error) {
    console.error('❌ Telegram alert failed:'.red, error.message);
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}