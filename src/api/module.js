import request from '@/utils/request';

const module = {
  getAuthorizeModules() {
    let url = '/Module/GetAuthorizeModule';
    return request('get', url);
  },
  get() {
    let url = '/Module/Get';
    return request({
      url: url,
      method: 'get',
    });
  },
  // 模块详情
  detail(id) {
    var params = {};
    params.Id = id;
    params.Code = 'Module_Detail';
    return request(params);
  },
  // 保存模块
  save(params) {
    if (params.Id) params.Code = 'Module_Edit';
    else params.Code = 'Module_Add';
    return request(params);
  },
};
export default module;
