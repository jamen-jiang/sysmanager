import request from '@/utils/request';

const department = {
  // 部门列表
  query(data) {
    let url = '/Department/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  detail(params) {
    let url = '/Department/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getModuleOperates() {
    let url = '/Department/GetModuleOperates';
    return request({
      url: url,
      method: 'get',
    });
  },
  getAuthorizeModuleOperateIds(params) {
    let url = '/Department/getAuthorizeModuleOperateIds';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getRoles(data) {
    let url = '/Department/GetRoles';
    return request({
      url: url,
      method: 'Post',
      data,
    });
  },
  getDepartmentRoles(params) {
    let url = '/Department/GetDepartmentRoles';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  modify(data) {
    let url = '/Department/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  add(data) {
    let url = '/Department/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default department;
