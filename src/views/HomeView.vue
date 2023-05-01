<script setup>
import LeftMenu from '@/components/LeftMenu.vue'
import TopNav from '@/components/TopNav.vue'
import { ref } from 'vue'

const collapseLeft = ref(false)

</script>

<template>
  <el-container class="index-container">
    <el-aside width="auto">
      <left-menu v-model:collapse-left="collapseLeft" />
    </el-aside>
    <el-container>
      <el-header>
        <top-nav v-model:collapse-left="collapseLeft" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
