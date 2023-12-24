import { createI18n, useI18n } from 'vue-i18n'
import { ref } from 'vue'
import messagesCn from './messages_cn'
import messagesEn from './messages_en'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { GlobalLocales } from '@/consts/GlobalConstants'

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

export const changeMessages = locale => {
  i18n.global.locale.value = locale
  elementLocale.value.localeData = locale === DEFAULT_LOCALE ? zhCn : en
  dayjs.locale(locale.toLowerCase())
}

export const $changeLocale = locale => {
  useGlobalConfigStore().changeLocale(locale)
}
/**
 * @param cn
 * @param en
 * @param {boolean} replaceEmpty 为空是否用不为空的数据代替
 * @returns {*}
 */
export const $i18nMsg = (cn, en, replaceEmpty) => {
  const { currentLocale } = useGlobalConfigStore()
  console.log(currentLocale)
  if (currentLocale === GlobalLocales.CN) {
    return replaceEmpty ? (cn || en) : cn
  }
  return replaceEmpty ? (en || cn) : en
}

export const $i18nBundle = i18n.global.t

export default {
  install (app) {
    app.use(i18n)
    Object.assign(app.config.globalProperties, {
      $changeLocale,
      $i18nMsg,
      $i18nBundle
    })
  }
}
