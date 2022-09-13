import ApiClient from '@/api/ApiClient';
import { useToast } from 'vue-toastification';

class BaseRepository {
  // constructor(resource) {
  //     this.resource = resource;
  // }

  async post({ url, payload } = {}) {
    try {
      const response = await ApiClient.post(url, payload);
      return response;
    } catch (error) {
      if (!error.response) {
        // network error
        useToast().error('Opps Something went wrong. Please try again.');
      }
      return error;
    }
  }
}

export default BaseRepository;