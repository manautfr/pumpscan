import { config } from './config.js';
import { fetchTransactions } from './api.js';
import { formatTransaction } from './formatters.js';
import { sendTelegramAlert, sleep } from './utils.js';
import colors from 'colors';
import cliProgress from 'cli-progress';

// Track processed transactions
const processedTxIds = new Set();
let isInitializing = true;

// Store initial transactions for sorting
let initialTransactions = [];
let progressBar = null;

export async function watchTransactions(addresses) {
  console.log(`🔍 Checking recent transactions for ${addresses.length} addresses...`.cyan);
  
  while (true) {
    try {
      if (isInitializing) {
        initializeProgressBar(addresses.length);
        initialTransactions = [];
      }

      await processAllAddresses(addresses);
      
      if (isInitializing) {
        await handleInitialTransactions();
      }
      
      await sleep(config.checkInterval * 60 * 1000);
    } catch (error) {
      console.error('❌ Watch error:'.red, error.message);
      await sleep(30000);
    }
  }
}

function initializeProgressBar(totalAddresses) {
  progressBar = new cliProgress.SingleBar({
    format: 'Fetching data from solscan |' + '{bar}'.cyan + '| {percentage}% | {value}/{total} addresses',
    barCompleteChar: '=',
    barIncompleteChar: ' ',
  });
  progressBar.start(totalAddresses, 0);
}

async function processAllAddresses(addresses) {
  let addressCount = 0;
  
  for (const address of addresses) {
    addressCount++;
    const { transactions, metadata } = await fetchTransactions(address, 1);
    
    if (isInitializing) {
      progressBar.update(addressCount);
      storeInitialTransactions(transactions, address, metadata);
    } else {
      await processTransactions(transactions, address, metadata);
    }
  }
}

function storeInitialTransactions(transactions, address, metadata) {
  transactions
    .filter(tx => tx.value >= config.minTransactionValue)
    .forEach(tx => {
      initialTransactions.push({
        tx,
        address,
        metadata
      });
    });
}

async function handleInitialTransactions() {
  progressBar.stop();
  
  initialTransactions
    .sort((a, b) => a.tx.block_time - b.tx.block_time)
    .forEach(({ tx, address, metadata }) => {
      if (!processedTxIds.has(tx.trans_id)) {
        const formatted = formatTransaction(tx, address, metadata);
        processedTxIds.add(formatted.txId);
        
        displayTransaction(formatted);
      }
    });

  isInitializing = false;
  console.log('\n✅ Recent transactions loaded. Watching for new transactions...'.green);
}

function displayTransaction(formatted) {
  formatted.console.forEach(line => {
    if (Array.isArray(line)) {
      console.log(...line);
    } else {
      console.log(line);
    }
  });
}

async function processTransactions(transactions, address, metadata) {
  if (!Array.isArray(transactions)) return;

  const formattedTransactions = transactions
    .filter(tx => {
      return tx.value >= config.minTransactionValue && !processedTxIds.has(tx.trans_id);
    })
    .map(tx => formatTransaction(tx, address, metadata))
    .sort((a, b) => b.timestamp - a.timestamp);

  for (const formatted of formattedTransactions) {
    processedTxIds.add(formatted.txId);
    displayTransaction(formatted);
    
    if (config.telegram.enabled && !isInitializing) {
      await sendTelegramAlert(formatted.telegram);
    }
  }
}