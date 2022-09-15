import ApiClient from '@/api/ApiClient';

class BaseRepository {
  // constructor(resource) {
  //     this.resource = resource;
  // }

  async post({ url, payload } = {}) {
    try {
      const response = await ApiClient.post(url, payload);
      return response;
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  handleErrors(error) {
    let errorMessage = 'Opps Something went wrong. Please try again.';

    if (error.response) {
      errorMessage = error.response.data.message;
    }

    return Promise.reject({
      message: errorMessage
    });
  }
}

export default BaseRepository;