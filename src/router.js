import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children:[]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    
  ]
})
