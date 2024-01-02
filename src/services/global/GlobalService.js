import { GlobalLocales } from '@/consts/GlobalConstants'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { loadBusinessMenus } from '@/services/mock/MockGlobalService'

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return [
    {
      iconIf: () => globalConfigStore.isCollapseLeft ? 'expand' : 'fold',
      click: globalConfigStore.collapseLeft
    },
    {
      isSplit: true,
      menuCls: 'flex-grow'
    },
    {
      icon: 'LanguageFilled',
      isDropdown: true,
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
      isDropdown: true,
      iconIf: () => !globalConfigStore.isDarkTheme ? 'moon' : 'sunny',
      click: () => globalConfigStore.changeTheme(!globalConfigStore.isDarkTheme)
    },
    {
      isDropdown: true,
      icon: 'Setting',
      click: () => globalConfigStore.changeShowSettings(true)
    },
    {
      icon: 'user',
      isDropdown: true,
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
  ]
}

export const useBusinessMenus = () => {
  return loadBusinessMenus()
}
