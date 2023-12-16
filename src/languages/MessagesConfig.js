import { createI18n } from 'vue-i18n'
import { ref } from 'vue'
import messagesCn from './messages_cn'
import messagesEn from './messages_en'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import { useGlobalConfigStore } from '@/stores/globalConfig'

const DEFAULT_LOCALE = 'zh-CN'
dayjs.locale(DEFAULT_LOCALE) // dayjs的语言配置

const i18n = createI18n({
  locale: DEFAULT_LOCALE, // set locale
  legacy: false, // you must set `false`, to use Composition API
  fallbackLocale: DEFAULT_LOCALE, // set fallback locale
  messages: {
    'zh-CN': messagesCn,
    'en-US': messagesEn
  } // set locale messages
})

export const elementLocale = ref({ // 用于element-plus
  localeData: zhCn
})

export const $changeLocale = function (locale) {
  i18n.global.locale.value = locale
  elementLocale.value.localeData = locale === DEFAULT_LOCALE ? zhCn : en
  dayjs.locale(locale.toLowerCase())
  useGlobalConfigStore().changeLocale(locale)
}

export default {
  install (app) {
    app.use(i18n)
    app.config.globalProperties.$changeLocale = $changeLocale
  }
}
