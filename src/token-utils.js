const SOL_ADDRESSES = [
  'So11111111111111111111111111111111111111112', // WSOL
  'So11111111111111111111111111111111111111111'  // SOL
];

export function getTokenInfo(tokenAddress, metadata) {
  const tokenData = metadata?.tokens?.[tokenAddress];
  
  if (SOL_ADDRESSES.includes(tokenAddress)) {
    return {
      symbol: 'SOL',
      name: 'Solana',
      address: tokenAddress
    };
  }

  return {
    symbol: tokenData?.token_symbol?.trim() || tokenAddress.slice(0, 8) + '...',
    name: tokenData?.token_name?.trim() || 'Unknown Token',
    address: tokenAddress
  };
}

export function determineOrderType(tx) {
  const { amount_info } = tx;
  const isSolToken1 = SOL_ADDRESSES.includes(amount_info.token1);
  const isSolToken2 = SOL_ADDRESSES.includes(amount_info.token2);

  if (isSolToken2 && !isSolToken1) {
    return { type: 'SELL', emoji: '🟥', color: 'red' };
  } else if (!isSolToken2 && isSolToken1) {
    return { type: 'BUY', emoji: '🟩', color: 'green' };
  }
  return { type: 'SWAP', emoji: '🔄', color: 'yellow' };
}