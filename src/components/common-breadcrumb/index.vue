<script setup>
import { computed } from 'vue'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { useRoute } from 'vue-router'
import { useMenuInfo, useMenuName } from '@/components/utils'

const globalConfigStore = useGlobalConfigStore()
const tabsViewStore = useTabsViewStore()

const route = useRoute()

const breadcrumbs = computed(() => {
  const exists = []
  return route.matched.map(item => {
    const menuInfo = useMenuInfo(item)
    let icon = ''
    if (menuInfo && menuInfo.icon) {
      icon = menuInfo.icon
    } else if (item.meta && item.meta.icon) {
      icon = item.meta.icon
    }
    const result = {
      path: item.path,
      menuName: useMenuName(item),
      icon
    }
    console.info(item, menuInfo)
    return result
  }).filter(item => {
    const notExist = !exists.includes(item.menuName)
    if (notExist) {
      exists.push(item.menuName)
    }
    return notExist
  })
})
</script>

<template>
  <el-breadcrumb
    v-if="globalConfigStore.isShowBreadcrumb"
    v-bind="$attrs"
    class="common-breadcrumb"
  >
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
    >
      <common-icon
        v-if="tabsViewStore.isShowTabIcon&&item.icon"
        :icon="item.icon"
      />
      {{ item.menuName }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.common-breadcrumb {
  padding-left: 15px;
  padding-top: 10px;
  height: 30px;
  list-style: none;
  border-radius: 4px;
}
.common-breadcrumb .el-icon {
  vertical-align: bottom;
}
</style>
