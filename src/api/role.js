import request from '@/utils/request';

const role = {
  get(params) {
    let url = '/Role/Get';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getUsers(params) {
    let url = '/Role/GetUsers';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getRoleUsers(params) {
    let url = '/Role/GetRoleUsers';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getModuleAndPrivilege(params) {
    let url = '/Role/GetModuleAndPrivilege';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  detail(params) {
    let url = '/Role/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  modify(data) {
    let url = '/Role/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default role;