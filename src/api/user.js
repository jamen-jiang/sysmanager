import { request } from '@/http/http';

const user = {
  // 用户列表列表
  list() {
    let params = {};
    params.code = 'User_List';
    return request(params);
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
