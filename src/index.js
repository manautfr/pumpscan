import colors from 'colors';
import { watchTransactions } from './watcher.js';
import { loadWhaleAddresses } from './utils.js';
import { config } from './config.js';

colors.enable();

async function main() {
  console.log('\n🐋 '.blue.bold + 'Solana Whale Transaction Tracker'.bold + ' 🐋\n'.blue.bold);
  
  try {
    const addresses = await loadWhaleAddresses();
    console.log('📋 Loaded'.green, addresses.length.toString().yellow.bold, 'whale addresses\n');
    
    await watchTransactions(addresses);
  } catch (error) {
    console.error('❌ Error:'.red, error.message);
    process.exit(1);
  }
}

main();