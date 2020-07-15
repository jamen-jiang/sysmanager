/**
 * api接口的统一出口
 */

// 模块接口
import privilege from '@/api/privilege';
import module from '@/api/module';
import user from '@/api/user';

// 导出接口
export default {
  privilege,
  module,
  user,
  // ……
};
