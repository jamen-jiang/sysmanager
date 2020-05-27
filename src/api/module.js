import { request } from '@/http/http';

const module = {
  // 模块列表
  list() {
    var params = {};
    params.Code = 'Module_List';
    return request(params);
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
