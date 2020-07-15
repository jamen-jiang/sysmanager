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
  get(params) {
    let url = '/user/get';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  // 用户详情
  detail(id) {
    let params = {};
    params.Id = id;
    params.Code = 'User_Detail';
    return request(params);
  },
  // 保存用户
  save(params) {
    if (params.Id) params.Code = 'User_Edit';
    else params.Code = 'User_Add';
    return request(params);
  },
};
export default user;
