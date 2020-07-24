import request from '@/utils/request';

const operate = {
  getModules() {
    let url = '/Operate/GetModules';
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
  // 模块详情
  detail(id) {
    let url = '/Operate/Detail';
    var params = {
      id: id,
    };
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  add(data) {
    let url = '/Operate/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  modify(data) {
    let url = '/Operate/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default operate;