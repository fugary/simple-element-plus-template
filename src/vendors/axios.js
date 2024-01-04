import axios from 'axios'

import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useLoginConfigStore } from '@/stores/LoginConfigStore'
import { $i18nBundle } from '@/messages'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'

export const $http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: import.meta.env.VITE_APP_API_TIMEOUT
})

$http.interceptors.request.use(config => {
  const globalConfigStore = useGlobalConfigStore()
  const loginConfigStore = useLoginConfigStore()
  config.headers.locale = globalConfigStore.currentLocale
  if (config.addToken !== false && loginConfigStore.accessToken) { // 添加token
    config.headers.Authorization = `Bearer ${loginConfigStore.accessToken}`
  }
  return config
})

const networkErrorFun = debounce(() => ElMessage.error($i18nBundle('common.msg.networkError')), 300)
const networkTimeoutFun = debounce(() => ElMessage.error($i18nBundle('common.msg.networkTimeout')), 300)

$http.interceptors.response.use(data => {
  // todo 其他处理
  return data
}, error => {
  console.info(error.code, error.message)
  if (error.message === 'Network Error') {
    networkErrorFun()
  } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') > -1) {
    networkTimeoutFun()
  }
  if (error.response.status === 401 && !error.response.config.isLogin) {
    // 跳转登录页面
  }
  return error.response
})

export const $httpPost = (url, data, config) => {
  return new Promise((resolve, reject) => {
    $http.post(url, data, config).then(response => {
      if (response.data) {
        resolve(response.data) // 只要有数据就认为成功，内容再解析
      } else {
        reject(new Error('No response data'))
      }
    }, reject)
  })
}

export const $httpGet = (url, data, config) => {
  return new Promise((resolve, reject) => {
    $http.get(url, config).then(response => {
      if (response.data) {
        resolve(response.data) // 只要有数据就认为成功，内容再解析
      } else {
        reject(new Error('No response data'))
      }
    }, reject)
  })
}
