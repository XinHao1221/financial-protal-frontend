import BaseRepository from './BaseRepository';
import { endpoint } from '@/common/constant/Endpoints';

const endpointURL = endpoint.TRANSACTION;

class TransactionRepository extends BaseRepository {
  async getTransactions() {
    return this.get({
      url: `${endpointURL}?start_date=2022-05-08 00:00:00&end_date=2022-05-10 23:59:59`
    });
  }
}

export default TransactionRepository;
