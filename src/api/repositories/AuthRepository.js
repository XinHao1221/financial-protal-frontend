import BaseRepository from './BaseRepository';
import { endpoint } from '@/common/constant/Endpoints';

const endpointURL = endpoint.AUTH;

class AuthRepository extends BaseRepository {
  async login(payload) {
    return this.post({
      url: `${endpointURL}/login`,
      payload: payload
    });
  }
}

export default AuthRepository;