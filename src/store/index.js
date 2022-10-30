import { createStore } from 'vuex';
import constants from './modules/constants';
import settings from './modules/settings';
import profile from './modules/profile';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    constants,
    settings,
    profile
  }
});
