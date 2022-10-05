import { constantRepo } from '@/api';

const state = {
  constants: null
};

const getters = {
  constants: (state) => state.constants
};

const actions = {
  async getConstant({ commit }) {
    try {
      const response = await constantRepo.getConstant();
      commit('getConstant', response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  getConstant: (state, payload) => {
    state.constants = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
