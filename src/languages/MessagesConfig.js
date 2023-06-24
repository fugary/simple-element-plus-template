import { createI18n } from 'vue-i18n'
import { reactive } from 'vue'
import messagesCn from './messages_cn'
import messagesEn from './messages_en'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'

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

const $currentLocale = reactive({ // 用于element-plus
  localeData: zhCn
})

const $changeLocale = function (locale) {
  this.$i18n.locale = locale
  this.$currentLocale.localeData = locale === DEFAULT_LOCALE ? zhCn : en
  dayjs.locale(locale.toLowerCase())
}

export default {
  install (app) {
    app.use(i18n)
    app.config.globalProperties.$currentLocale = $currentLocale
    app.config.globalProperties.$changeLocale = $changeLocale
  }
}
