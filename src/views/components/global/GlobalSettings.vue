<script setup>
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { GlobalLayoutMode, GlobalLocales } from '@/consts/GlobalConstants'
const globalConfigStore = useGlobalConfigStore()
const tabsViewStore = useTabsViewStore()
/**
 * @type {[CommonFormOption]}
 */
const options = [
  {
    labelKey: 'common.label.theme',
    prop: 'isDarkTheme',
    type: 'switch',
    model: globalConfigStore,
    attrs: {
      activeActionIcon: 'icon-moon',
      inactiveActionIcon: 'icon-sunny'
    }
  },
  {
    labelKey: 'common.label.language',
    type: 'select',
    prop: 'currentLocale',
    model: globalConfigStore,
    change (val) {
      globalConfigStore.changeLocale(val)
    },
    children: [{
      labelKey: 'common.label.langCn',
      value: GlobalLocales.CN
    }, {
      labelKey: 'common.label.langEn',
      value: GlobalLocales.EN
    }]
  },
  {
    labelKey: 'common.label.layout',
    type: 'select',
    prop: 'layoutMode',
    model: globalConfigStore,
    change (val) {
      globalConfigStore.changeLayout(val)
    },
    children: [{
      labelKey: 'common.label.layoutLeft',
      value: GlobalLayoutMode.LEFT
    }, {
      labelKey: 'common.label.layoutTop',
      value: GlobalLayoutMode.TOP
    }]
  },
  {
    label: '多标签模式',
    prop: 'isTabMode',
    type: 'switch',
    model: tabsViewStore,
    change (val) {
      tabsViewStore.changeTabMode(val)
    }
  },
  {
    label: '缓存标签',
    prop: 'isCachedTabMode',
    type: 'switch',
    model: tabsViewStore,
    change (val) {
      tabsViewStore.changeCachedTabMode(val)
    }
  },
  {
    label: '标签图标',
    prop: 'isShowTabIcon',
    type: 'switch',
    model: tabsViewStore
  }
]
</script>

<template>
  <el-drawer
    v-model="globalConfigStore.isShowSettings"
    direction="rtl"
    :size="350"
  >
    <template #header>
      <strong>{{ $t('common.label.settings') }}</strong>
    </template>
    <template #default>
      <common-form
        :show-buttons="false"
        :options="options"
        label-position="left"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button
          type="primary"
          @click="globalConfigStore.changeShowSettings(false)"
        >
          {{ $t('common.label.close') }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>

</style>