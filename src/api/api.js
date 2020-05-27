import { request } from '@/http/http';

const api = {
  // 接口列表列表
  list() {
    let params = {};
    params.Code = 'System_Api_List';
    return request(params);
  },
  // 接口详情
  detail(id) {
    let params = {};
    params.Id = id;
    params.Code = 'System_Api_Detail';
    return request(params);
  },
  // 保存接口
  save(params) {
    if (params.Id) params.Code = 'System_Api_Edit';
    else params.Code = 'System_Api_Add';
    return request(params);
  },
};
export default api;
