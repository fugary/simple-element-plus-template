<script setup>
import LeftMenu from "@/components/LeftMenu.vue";
import TopNav from "@/components/TopNav.vue";
</script>

<template>
  <el-container class="index-container">
    <el-header>
      <top-nav/>
    </el-header>
    <el-container>
      <el-aside>
        <left-menu/>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
