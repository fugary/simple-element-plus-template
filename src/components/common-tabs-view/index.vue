<script setup>
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import isString from 'lodash/isString'
import TabsViewItem from '@/components/common-tabs-view/tabs-view-item.vue'

const router = useRouter()
const route = useRoute()
const tabsViewStore = useTabsViewStore()
const currentTabValue = ref('')
watch(route, () => {
  if (route.path) {
    tabsViewStore.addHistoryTab(route)
    currentTabValue.value = route.path
  }
})

onMounted(() => {
  if (!tabsViewStore.historyTabs.length) {
    tabsViewStore.addHistoryTab(route)
  }
  currentTabValue.value = route.path
})

const selectHistoryTab = path => {
  const tab = isString(path) ? tabsViewStore.findHistoryTab(path) : path
  if (tab) {
    router.push(tab)
  }
}

const removeHistoryTab = path => {
  const lastTab = tabsViewStore.removeHistoryTab(path)
  if (lastTab) {
    selectHistoryTab(lastTab)
  }
}

</script>

<template>
  <el-tabs
    v-bind="$attrs"
    v-model="currentTabValue"
    type="card"
    :closable="tabsViewStore.historyTabs.length>1"
    @tab-change="selectHistoryTab"
    @tab-remove="removeHistoryTab"
  >
    <tabs-view-item
      v-for="item in tabsViewStore.historyTabs"
      :key="item.path"
      :tab-item="item"
    />
  </el-tabs>
</template>

<style scoped>

</style>
