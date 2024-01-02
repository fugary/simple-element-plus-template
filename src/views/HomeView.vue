<script setup>
import LeftMenu from '@/layout/LeftMenu.vue'
import TopNav from '@/layout/TopNav.vue'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { useTabsViewStore } from '@/stores/TabsViewStore'
import { GlobalLayoutMode } from '@/consts/GlobalConstants'
import { computed } from 'vue'
import GlobalSettings from '@/views/components/global/GlobalSettings.vue'
const globalConfigStore = useGlobalConfigStore()
const tabsViewStore = useTabsViewStore()
const showLeftMenu = computed(() => {
  return globalConfigStore.layoutMode === GlobalLayoutMode.LEFT
})
</script>

<template>
  <el-container class="index-container">
    <el-aside
      v-if="showLeftMenu"
      class="index-aside"
      width="auto"
    >
      <left-menu />
    </el-aside>
    <el-container>
      <el-header>
        <top-nav />
      </el-header>
      <el-header
        v-if="tabsViewStore.isTabMode"
        class="tabs-header"
      >
        <common-tabs-view />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition
            name="slide-fade"
            mode="out-in"
          >
            <KeepAlive
              :include="tabsViewStore.cachedTabs"
              :max="10"
            >
              <component
                :is="Component"
                :key="route.fullPath"
              />
            </KeepAlive>
          </transition>
        </router-view>
      </el-main>
      <global-settings />
    </el-container>
  </el-container>
</template>
<style scoped>
.tabs-header {
  margin-top: 5px;
  height: 40px
}
</style>
