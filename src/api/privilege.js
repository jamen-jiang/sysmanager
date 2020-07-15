import request from '@/utils/request';

const privilege = {
  getAuthorizeModules() {
    let url = '/Privilege/GetAuthorizeModules';
    return request({
      url: url,
      method: 'get',
    });
  },
};
export default privilege;
