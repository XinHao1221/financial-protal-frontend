import { createStore } from 'vuex';
import constants from './modules/constants';
import settings from './modules/settings';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    constants,
    settings
  }
});
