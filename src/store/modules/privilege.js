const state = {
  modules: [],
  moduleId: '',
  currentModule: {},
};

const mutations = {
  modules_set(state, modules) {
    state.modules = modules;
  },
  module_select(state, module) {
    state.currentModule = module;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
