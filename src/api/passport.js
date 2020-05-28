import { request } from '@/http/http';

const passport = {
  // 登录
  login(params) {
    let data = {};
    data.Params = params;
    data.Code = 'Login';
    return request(data);
  },
  layout() {
    let data = {};
    data.Code = 'Layout';
    return request(data);
  },
  // 登出
  logout() {},
};
export default passport;
