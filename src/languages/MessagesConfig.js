import { createI18n } from 'vue-i18n'
import { reactive } from 'vue'
import messagesCn from './messages_cn'
import messagesEn from './messages_en'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
dayjs.locale('zh-CN') // dayjs的语言配置

const i18n = createI18n({
  locale: 'zh-CN', // set locale
  legacy: false, // you must set `false`, to use Composition API
  fallbackLocale: 'zh-CN', // set fallback locale
  messages: {
    'zh-CN': messagesCn,
    'en-US': messagesEn
  } // set locale messages
})

const $currentLocale = reactive({ // 用于element-plus
  locale: 'zh-CN',
  localeData: zhCn
})

const $changeLocale = function (locale) {
  this.$i18n.locale = locale
  Object.assign(this.$currentLocale, {
    locale,
    localeData: locale === 'zh-CN' ? zhCn : en
  })
  dayjs.locale(locale === 'zh-CN' ? 'zh-cn' : 'en')
}

export default {
  install (app) {
    app.use(i18n)
    app.config.globalProperties.$currentLocale = $currentLocale
    app.config.globalProperties.$changeLocale = $changeLocale
  }
}
