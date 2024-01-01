<script setup>
import { useMenuInfo, useMenuName } from '@/components/utils'
import { computed } from 'vue'
import { useTabsViewStore } from '@/stores/TabsViewStore'

const tabsViewStore = useTabsViewStore()

const props = defineProps({
  /**
   * @type RouteRecordRaw
   */
  tabItem: {
    type: Object,
    required: true
  },
  removeHistoryTab: Function,
  removeOtherHistoryTabs: Function,
  refreshHistoryTab: Function
})

const menuName = computed(() => {
  return useMenuName(props.tabItem)
})

const menuInfo = computed(() => {
  return props.tabItem.path === '/' ? { icon: 'HomeFilled' } : useMenuInfo(props.tabItem)
})

const menuIcon = computed(() => {
  if (menuInfo.value && menuInfo.value.icon) {
    return menuInfo.value.icon
  }
  if (props.tabItem.meta && props.tabItem.meta.icon) {
    return props.tabItem.meta.icon
  }
  return null
})
</script>

<template>
  <el-tab-pane
    :name="tabItem.path"
  >
    <template #label>
      <el-dropdown trigger="contextmenu">
        <span class="custom-tabs-label">
          <common-icon
            v-if="tabsViewStore.isShowTabIcon && menuIcon"
            :icon="menuIcon"
          />
          <span>{{ menuName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="refreshHistoryTab(tabItem)"
            >
              <common-icon icon="refresh" />
              {{ $t('common.label.refresh') }}
            </el-dropdown-item>
            <el-dropdown-item @click="removeHistoryTab(tabItem.path)">
              <common-icon icon="close" />
              {{ $t('common.label.close') }}
            </el-dropdown-item>
            <el-dropdown-item @click="removeOtherHistoryTabs(tabItem)">
              <common-icon icon="close" />
              {{ $t('common.label.closeOther') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-tab-pane>
</template>

<style scoped>
.common-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.common-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
