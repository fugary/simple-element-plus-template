<script setup>
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import isString from 'lodash/isString'
import TabsViewItem from '@/components/common-tabs-view/tabs-view-item.vue'

const router = useRouter()
const route = useRoute()
const tabsViewStore = useTabsViewStore()
watch(route, () => {
  if (route.path) {
    tabsViewStore.addHistoryTab(route)
    tabsViewStore.currentTab = route.path
  }
})

onMounted(() => {
  if (!tabsViewStore.historyTabs.length) {
    tabsViewStore.addHistoryTab(route)
  }
  tabsViewStore.currentTab = route.path
})

const selectHistoryTab = path => {
  const tab = isString(path) ? tabsViewStore.findHistoryTab(path) : path
  if (tab) {
    router.push(tab)
    tabsViewStore.addCachedTab(tab)
  }
}

const removeHistoryTab = path => {
  const lastTab = tabsViewStore.removeHistoryTab({ path })
  if (lastTab) {
    selectHistoryTab(lastTab)
  }
}

const refreshHistoryTab = tab => {
  const time = new Date().getTime()
  router.push(`${tab.path}?${time}`)
  tabsViewStore.addCachedTab(tab)
}

const removeOtherHistoryTabs = tab => {
  tabsViewStore.removeOtherHistoryTabs(tab)
  selectHistoryTab(tab.path)
}

const removeHistoryTabs = (tab, type) => {
  tabsViewStore.removeHistoryTabs(tab, type)
  selectHistoryTab(tab.path)
}

const tabItems = ref()
const onDropdownVisibleChange = (visible, tab) => {
  if (visible) {
    tabItems.value.forEach(({ dropdownRef }) => {
      console.info(Object.assign({}, dropdownRef))
      if (dropdownRef.id !== tab.path) {
        dropdownRef.handleClose()
      }
    })
  }
}

</script>

<template>
  <el-tabs
    v-bind="$attrs"
    v-model="tabsViewStore.currentTab"
    class="common-tabs"
    type="card"
    :closable="tabsViewStore.historyTabs.length>1"
    @tab-change="selectHistoryTab"
    @tab-remove="removeHistoryTab"
  >
    <tabs-view-item
      v-for="item in tabsViewStore.historyTabs"
      ref="tabItems"
      :key="item.path"
      :tab-item="item"
      @refresh-history-tab="refreshHistoryTab"
      @remove-other-history-tabs="removeOtherHistoryTabs"
      @remove-history-tabs="removeHistoryTabs"
      @on-dropdown-visible-change="onDropdownVisibleChange"
      @remove-history-tab="removeHistoryTab"
    />
  </el-tabs>
</template>

<style scoped>
.common-tabs .el-tabs__header {
  margin: 0;
}
</style>
