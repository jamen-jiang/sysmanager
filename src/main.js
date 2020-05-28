import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';
import '@/icons/iconfont/iconfont.css';
import api from './api'; // 导入api接口
//import { setRouter } from './utils/common';
// 组件
import '@/components';

Vue.prototype.HOST = '/api';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$api = api; // 将api挂载到vue的原型上

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.path == '/login') {
    if (token) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    if (!token) {
      next({
        path: '/login',
      });
    } else {
      //动态生成路由
      if (store.state.permission.permission != {}) {
        api.passport.layout().then(res => {
          store.commit('permission/setPermission', res.Data);
        });
        //setRouter(store.state.permission.menus);
      } else {
        let flag = false; //判断是否页面中是否已经存在该路由下的tab页
        //options记录当前页面中已存在的tab页
        for (let tab of store.state.tab.tabs) {
          //用名称匹配，如果存在即将对应的tab页设置为active显示桌面前端
          if (tab.name === to.name) {
            flag = true;
            store.commit('tab/tab_active', to.path);
            break;
          }
        }
        //如果不存在，则新增tab页，再将新增的tab页设置为active显示在桌面前端
        if (!flag) {
          store.commit('tab/tab_add', {
            route: to.path,
            name: to.name,
          });
          store.commit('tab/tab_active', to.path);
        }
      }
      next();
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
