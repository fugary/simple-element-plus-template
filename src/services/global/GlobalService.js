import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { ref } from 'vue'
import { $i18nBundle } from '@/messages'

export const useBaseTopMenus = () => {
  const globalConfigStore = useGlobalConfigStore()
  return ref([
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
      index: 'language',
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
      index: 'theme',
      isDropdown: true,
      iconIf: () => !globalConfigStore.isDarkTheme ? 'moon' : 'sunny',
      click: () => globalConfigStore.changeTheme(!globalConfigStore.isDarkTheme)
    },
    {
      icon: 'DisplaySettingsRound',
      index: 'layout',
      isDropdown: true,
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
  ])
}

export const useBusinessMenus = () => {
  return ref([
    {
      icon: 'HomeFilled',
      labelIf: () => $i18nBundle('common.label.title')
    },
    {
      icon: 'setting',
      labelKey: 'menu.label.systemManagement',
      children: [
        {
          index: '/admin/users',
          icon: 'user',
          labelKey: 'menu.label.userManagement'
        },
        {
          index: '/admin/roles',
          icon: 'menu',
          labelKey: 'menu.label.roleManagement'
        },
        {
          index: '/admin/authority',
          icon: 'lock',
          labelKey: 'menu.label.authorityManagement'
        },
        {
          index: '/admin/menus',
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
