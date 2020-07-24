import request from '@/utils/request';

const common = {
  getOperateTypes() {
    let url = '/Common/GetOperateTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
  get(moduleId) {
    let url = '/Operate/Get';
    var params = {
      moduleId: moduleId,
    };
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
};
export default common;
