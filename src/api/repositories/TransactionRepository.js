import BaseRepository from './BaseRepository';
import { endpoint } from '@/common/constant/Endpoints';

const endpointURL = endpoint.TRANSACTION;

class TransactionRepository extends BaseRepository {
  async getTransactions(startDate, endDate) {
    return this.get({
      url: `${endpointURL}?start_date=${startDate}&end_date=${endDate}`
    });
  }

  async addTransaction(payload) {
    return this.post({
      url: endpointURL,
      payload: payload
    });
  }

  async getTransactionSummary(startDate, endDate, timezone = null) {
    let url = `${endpointURL}/summary?start_date=${startDate}&end_date=${endDate}`;
    url += timezone ? `&timezone=${timezone}` : '';

    return this.get({
      url: url
    });
  }
}

export default TransactionRepository;
