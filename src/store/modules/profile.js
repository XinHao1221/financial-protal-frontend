import { authRepo } from '@/api';

const state = {
  profile: null
};

const getters = {
  profile: (state) => state.profile
};

const actions = {
  async getProfile({ commit }) {
    try {
      const response = await authRepo.getUserInfo();
      commit('getProfile', response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  getProfile: (state, payload) => (state.profile = payload)
};

export default {
  state,
  getters,
  actions,
  mutations
};
