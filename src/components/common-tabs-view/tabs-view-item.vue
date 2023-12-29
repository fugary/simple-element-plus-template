<script setup>
import { useMenuInfo, useMenuName } from '@/components/utils'
import { computed } from 'vue'
import { useTabsViewStore } from '@/stores/TabsViewStore'

const tabsViewStore = useTabsViewStore()

const props = defineProps({
  tabItem: {
    type: Object,
    required: true
  }
})

const menuName = computed(() => {
  return useMenuName(props.tabItem)
})

const menuInfo = computed(() => {
  return props.tabItem.path === '/' ? { icon: 'HomeFilled' } : useMenuInfo(props.tabItem)
})
</script>

<template>
  <el-tab-pane
    :name="tabItem.path"
  >
    <template #label>
      <span class="custom-tabs-label">
        <common-icon
          v-if="tabsViewStore.isShowTabIcon && menuInfo && menuInfo.icon"
          :icon="menuInfo.icon"
        />
        <span>{{ menuName }}</span>
      </span>
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
