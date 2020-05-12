import { request } from "@/http/http";

const user = {
  // 用户列表列表
  list() {
    let params = {};
    params.code = "System_User_List";
    return request(params);
  },
  // 用户详情
  detail(id) {
    let params = {};
    params.Id = id;
    params.code = "System_User_Detail";
    return request(params);
  },
  // 保存用户
  save(params) {
    if (params.Id) params.code = "System_User_Edit";
    else params.code = "System_User_Add";
    return request(params);
  }
};
export default user;
