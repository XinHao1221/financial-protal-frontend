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

  async logout() {
    return this.post({
      url: `${endpointURL}/logout`
    });
  }

  async getUserInfo() {
    return this.get({
      url: `${endpointURL}/me`
    });
  }
}

export default AuthRepository;
