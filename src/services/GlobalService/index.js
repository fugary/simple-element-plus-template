import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { ref } from 'vue'

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return ref([
    {
      iconIf: () => globalConfigStore.isCollapseLeft ? 'expand' : 'fold',
      click: globalConfigStore.collapseLeft,
      disabled: globalConfigStore.layoutMode !== GlobalLayoutMode.LEFT
    },
    {
      isSplit: true,
      splitCls: 'flex-grow'
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
      labelKey: 'common.label.layout',
      index: 'layout',
      children: [
        {
          iconIf: () => globalConfigStore.layoutMode === GlobalLayoutMode.LEFT ? 'check' : '',
          labelKey: 'common.label.layoutLeft',
          click: () => globalConfigStore.changeLayout(GlobalLayoutMode.LEFT)
        },
        {
          iconIf: () => globalConfigStore.layoutMode === GlobalLayoutMode.TOP ? 'check' : '',
          labelKey: 'common.label.layoutTop',
          click: () => globalConfigStore.changeLayout(GlobalLayoutMode.TOP)
        }
      ]
    },
    {
      icon: 'user',
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

export const useBusinessMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return ref([
    {
      labelIf: () => globalConfigStore.layoutMode === GlobalLayoutMode.LEFT && globalConfigStore.isCollapseLeft ? 'SEP' : 'Simple Element Plus'
    },
    {
      icon: 'setting',
      labelKey: 'menu.label.systemManagement',
      children: [
        {
          icon: 'user',
          labelKey: 'menu.label.userManagement'
        },
        {
          icon: 'menu',
          labelKey: 'menu.label.roleManagement'
        },
        {
          icon: 'lock',
          labelKey: 'menu.label.authorityManagement'
        },
        {
          icon: 'menu',
          labelKey: 'menu.label.menuManagement'
        }
      ]
    },
    {
      icon: 'WarningFilled',
      labelKey: 'menu.label.errorPage',
      children: [
        {
          index: '/not-found',
          icon: 'Warning',
          labelKey: 'menu.label.errorPage404'
        },
        {
          icon: 'Warning',
          labelKey: 'menu.label.errorPage403'
        },
        {
          icon: 'Warning',
          labelKey: 'menu.label.errorPage500'
        }
      ]
    }])
}
