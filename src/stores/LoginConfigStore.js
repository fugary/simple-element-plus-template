import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/services/login/LoginService'
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { useMenuConfigStore } from '@/stores/MenuConfigStore'

export const useLoginConfigStore = defineStore('loginConfig', () => {
  /**
   * 登录成功后保存accessToken
   * @type {Ref<string>}
   */
  const accessToken = ref('')
  /**
   * 保存登录用户信息
   * @type {Object}
   */
  const accountInfo = ref()

  return {
    accessToken,
    accountInfo,
    /**
     * @param {{account: Object, accessToken:string}} loginResult
     */
    setLoginAccountInfo (loginResult) {
      accountInfo.value = loginResult.account
      accessToken.value = loginResult.accessToken
    },
    clearLoginInfo () {
      accessToken.value = ''
      accountInfo.value = null
    },
    isLoginIn () {
      return !!accessToken.value
    },
    logout () {
      // 清理登录数据
      this.clearLoginInfo()
      // 清理TAB数据, $reset似乎不能用
      useTabsViewStore().clearAllTabs()
      useMenuConfigStore().clearBusinessMenus()
    },
    async login (loginVo) {
      const loginResult = await login(loginVo)
      if (loginResult.success) {
        this.setLoginAccountInfo(loginResult.resultData)
      }
      return loginResult
    }
  }
}, {
  persist: true
})
