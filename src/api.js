import axios from 'axios';
import { config } from './config.js';

export async function fetchTransactions(address, page = 1) {
  try {
    const response = await axios.get(config.api.endpoint, {
      params: {
        address,
        page,
        page_size: config.api.pageSize
      },
      headers: config.api.headers
    });

    if (!response.data.success) {
      throw new Error('API request failed');
    }

    return {
      transactions: response.data.data,
      metadata: response.data.metadata
    };
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
}