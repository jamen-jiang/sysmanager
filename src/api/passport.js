import { request } from '@/http/http';

const passport = {
  // 登录
  login(params) {
    params.Code = 'Login';
    return request(params);
  },
  home() {
    let params = {};
    params.Code = 'Home';
    return request(params);
  },
  // 登出
  logout() {},
};
export default passport;
