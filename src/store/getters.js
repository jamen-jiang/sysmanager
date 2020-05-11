const getters = {
  menus: state => state.permission.menus,
  permission: state => state.permission.permission,
  roleMenuIsLoaded: state => state.permission.roleMenuIsLoaded,
  menuIsCollapse: state => state.permission.menuIsCollapse,
  tabs: state => state.tab.tabs,
  currentTab: state => state.tab.currentTab
}
export default getters