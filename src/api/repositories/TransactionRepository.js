import BaseRepository from './BaseRepository';
import { endpoint } from '@/common/constant/Endpoints';

const endpointURL = endpoint.TRANSACTION;

class TransactionRepository extends BaseRepository {
  constructor() {
    super(endpointURL);
  }

  async getTransactions(startDate, endDate) {
    return this.get({
      url: `${endpointURL}`,
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
  }

  async getTransactionSummary(startDate, endDate, timezone = null) {
    let params = {
      start_date: startDate,
      end_date: endDate
    };

    // If timezone exists
    if (timezone) {
      params['timezone'] = timezone;
    }

    return this.get({
      url: `${endpointURL}/summary`,
      params: params
    });
  }
}

export default TransactionRepository;
