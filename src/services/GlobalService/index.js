import { GlobalLocales } from '@/consts/GlobalConstants'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { ref } from 'vue'

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return ref([
    {
      iconIf: () => globalConfigStore.isCollapseLeft ? 'expand' : 'fold',
      click: globalConfigStore.collapseLeft
    },
    {
      labelKey: 'common.label.language',
      index: 'language',
      children: [
        {
          iconIf: () => GlobalLocales.CN === globalConfigStore.currentLocale ? 'check' : '',
          labelKey: 'common.label.langCn',
          click: () => globalConfigStore.changeLocale(GlobalLocales.CN)
        },
        {
          iconIf: () => GlobalLocales.EN === globalConfigStore.currentLocale ? 'check' : '',
          labelKey: 'common.label.langEn',
          click: () => globalConfigStore.changeLocale(GlobalLocales.EN)
        }
      ]
    },
    {
      labelKey: 'common.label.theme',
      index: 'theme',
      children: [
        {
          iconIf: () => !globalConfigStore.isDarkTheme ? 'check' : '',
          labelKey: 'common.label.themeDefault',
          click: () => globalConfigStore.changeTheme(false)
        },
        {
          iconIf: () => globalConfigStore.isDarkTheme ? 'check' : '',
          labelKey: 'common.label.themeDark',
          click: () => globalConfigStore.changeTheme(true)
        }
      ]
    },
    {
      labelKey: 'common.label.personalCenter',
      index: 'personal',
      children: [
        {
          labelKey: 'common.label.personalInfo',
          index: '/personal'
        },
        {
          labelKey: 'common.label.about',
          index: '/about'
        },
        {
          labelKey: 'common.label.logout',
          index: '/logout'
        }
      ]
    }
  ])
}
