import request from '@/utils/request';

const common = {
  getOperateTypes() {
    let url = '/Common/GetOperateTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModuleTypes() {
    let url = '/Common/GetModuleTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModuleCatalogs() {
    let url = '/Common/GetModuleCatalogs';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModules() {
    let url = '/Common/GetModules';
    return request({
      url: url,
      method: 'get',
    });
  },
  getDepartments() {
    let url = '/Common/GetDepartments';
    return request({
      url: url,
      method: 'get',
    });
  },
};
export default common;
