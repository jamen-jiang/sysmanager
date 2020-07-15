const state = {
  modules: [],
  moduleId: '',
};

const mutations = {
  modules_set(state, modules) {
    state.modules = modules;
  },
  module_select(state, moduleId) {
    state.moduleId = moduleId;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
