import BaseRepository from './BaseRepository';
import { endpoint } from '@/common/constant/Endpoints';

const endpointURL = endpoint.CONSTANT;

class ConstantRepository extends BaseRepository {
  async getConstant() {
    return this.get({
      url: `${endpointURL}`
    });
  }
}

export default ConstantRepository;
