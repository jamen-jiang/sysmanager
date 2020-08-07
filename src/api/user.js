import request from '@/utils/request';

const user = {
  // 登录
  login(data) {
    let url = '/user/login';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 登出
  logout() {},
  // 用户列表列表
  query(data) {
    let url = '/User/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 用户详情
  detail(params) {
    let url = '/User/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getRoles(data) {
    let url = '/User/GetRoles';
    return request({
      url: url,
      method: 'Post',
      data,
    });
  },
  getUserRoles(params) {
    let url = '/User/GetUserRoles';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getModuleAndPrivilege(params) {
    let url = '/User/GetModuleAndPrivilege';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  // 修改用户信息
  modify(data) {
    let url = '/User/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default user;
