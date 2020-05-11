const state = {
  menus: [],
  permission: {},
  roleMenuIsLoaded: false,
  menuIsCollapse: true
}

const mutations = {
  setPermission(state, permission) {
    state.permission = permission
  },
  select_modules(state, moduleId) {
    state.moduleId = moduleId
  },
  setRoloMenu(state, roleMenu) {
    state.roleMenu = roleMenu;
  },
  setroleMenuIsLoaded(state, roleMenuIsLoaded) {
    state.roleMenuIsLoaded = roleMenuIsLoaded;
  },
  get_menus(state, menus) {
    state.menus = menus;
  },
  set_MenuCollapse(state, menuIsCollapse) {
    state.menuIsCollapse = menuIsCollapse;
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}