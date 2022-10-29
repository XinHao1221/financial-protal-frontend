import ApiClient from '@/api/ApiClient';

class BaseRepository {
  endPointURL;

  constructor(endPointURL) {
    this.endPointURL = endPointURL;
  }

  async get({ url, params }) {
    try {
      const response = await ApiClient.get(url ?? this.endPointURL, {
        params
      });
      return response.data;
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  async getById({ url, id }) {
    try {
      const response = await ApiClient.get(
        `${url ?? `${this.endPointURL}`}/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async post({ url, payload }) {
    try {
      const response = await ApiClient.post(url ?? this.endPointURL, payload);
      return response.data;
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  async update({ url, id, payload }) {
    try {
      const response = await ApiClient.put(
        `${url ?? `${this.endPointURL}`}/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      return this.handleErrors(error);
    }
  }

  async delete({ url, id }) {
    try {
      const response = await ApiClient.delete(
        `${url ?? `${this.endPointURL}`}/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleErrors(error);
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
