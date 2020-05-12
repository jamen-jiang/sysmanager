import { request } from "@/http/http";

const passport = {
  // 登录
  login(params) {
    params.code = "Login";
    return request(params);
  },
  // 登出
  logout() {}
};
export default passport;
