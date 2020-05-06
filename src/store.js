import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus:[],
    permission:{},
    roleMenuIsLoaded:false,
    tabs:[{route:'/',name:'首页'}],
    currentTab:'/',
    menuIsCollapse:true
  },
  mutations: {
    setPermission(state,permission){
      state.permission = permission
    },
    select_modules(state,moduleId){
      state.moduleId = moduleId
    },
    setRoloMenu(state,roleMenu){
      state.roleMenu = roleMenu;
    },
    setroleMenuIsLoaded(state,roleMenuIsLoaded){
      state.roleMenuIsLoaded = roleMenuIsLoaded;
    },
    get_menus(state,menus){
      state.menus = menus;
    },
    set_MenuCollapse(state,menuIsCollapse){
      state.menuIsCollapse = menuIsCollapse;
    },
    //添加tab
    tab_add(state, tab) {
      state.tabs.push(tab);
    },
    // 删除tabs
    tab_remove(state, route) {
        let index = 0;
        for (let tab of state.tabs) {
            if (tab.route === route) {
                break;
            }
            index++;
        }
        state.tabs.splice(index, 1);
    },
    // 设置当前激活的tab
    tab_active(state, index) {
        state.currentTab = index;
    }
  },
  actions: {

  }
})
