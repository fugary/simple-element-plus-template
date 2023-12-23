<script setup>
import LeftMenu from '@/layout/LeftMenu.vue'
import TopNav from '@/layout/TopNav.vue'
</script>

<template>
  <el-container class="index-container">
    <el-aside
      class="index-aside"
      width="auto"
    >
      <left-menu />
    </el-aside>
    <el-container>
      <el-header>
        <top-nav />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition
            name="slide-fade"
            mode="out-in"
          >
            <component
              :is="Component"
              :key="route.fullPath"
            />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
