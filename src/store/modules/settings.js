const state = {
  showLoading: false
};

const getters = {
  showLoading: (state) => state.showLoading
};

const mutations = {
  showLoading: (state, payload) => (state.showLoading = payload)
};

export default {
  state,
  getters,
  mutations
};
