import { formatDistanceToNow } from "date-fns";
import colors from "colors";
import { getTokenInfo, determineOrderType } from "./token-utils.js";

function formatTokenAmount(amount, decimals) {
  const value = amount / Math.pow(10, decimals);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  }).format(value);
}

export function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatTransaction(tx, address, metadata) {
  const { block_time, value, amount_info, trans_id } = tx;

  const timeAgo = formatDistanceToNow(new Date(block_time * 1000), {
    addSuffix: true,
  });
  const formattedTime = new Date(block_time * 1000).toLocaleString();
  const formattedValue = formatUSD(value);
  const orderInfo = determineOrderType(tx);

  const token1Info = getTokenInfo(amount_info.token1, metadata);
  const token2Info = getTokenInfo(amount_info.token2, metadata);

  const token1Amount = formatTokenAmount(
    amount_info.amount1,
    amount_info.token1_decimals
  );
  const token2Amount = formatTokenAmount(
    amount_info.amount2,
    amount_info.token2_decimals
  );

  const txUrl = `https://solscan.io/tx/${trans_id}`;

  return {
    timestamp: block_time,
    txId: trans_id,
    console: [
      "\n" + "=".repeat(80).gray,
      [
        orderInfo.emoji,
        orderInfo.type[orderInfo.color],
        "🕒",
        timeAgo.yellow,
        `(${formattedTime})`,
      ],
      ["👤", "Account:".cyan, address],
      [
        "💱",
        "Swap:".cyan,
        `${token1Amount} ${token1Info.symbol}`.yellow,
        "for".cyan,
        `${token2Amount} ${token2Info.symbol}`.yellow,
        `(${formattedValue.green})`,
      ],
      ["🔗", "Txid:".cyan, trans_id.gray],
    ],
    telegram:
      `🐋 Whale Transaction Alert!\n\n` +
      `${orderInfo.emoji} <b>${orderInfo.type}</b>\n` +
      `Swap ${token1Amount} ${token1Info.symbol} for ${token2Amount} ${token2Info.symbol}\n` +
      `Value: ${formattedValue}\n` +
      `Account: ${address}\n` +
      `Time: ${timeAgo} (${formattedTime})\n\n` +
      `<a href="${txUrl}">View Transaction</a>`,
  };
}
