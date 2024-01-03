import { useLoginConfigStore } from '@/stores/LoginConfigStore'

/**
 * 检查路有权限
 * @param  to {RouteRecordSingleViewWithChildren} 目的地路由
 * @param from 出事路由
 * @returns {{name: string}|boolean}
 */
export const checkRouteAuthority = (to, from) => {
  const loginConfigStore = useLoginConfigStore()
  if (loginConfigStore.isLoginIn()) {
    // check权限
    return true
  }
  if (to.meta?.beforeLogin) { // 登录前的路由添加meta信息：beforeLogin: true
    return true
  }
  return { name: 'Login' }
}
