<template>
  <el-scrollbar>
    <el-menu
      :collapse="collapseLeft"
      :default-openeds="['1']"
    >
      <el-menu-item index="0">
        <span>Simple Element Plus</span>
        <div v-if="collapseLeft">
          SEP
        </div>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="1-1">
          <el-icon><user /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Menu /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><lock /></el-icon>
          <span>权限管理</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <el-icon><Menu /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><WarningFilled /></el-icon>
          <span>错误页面</span>
        </template>
        <el-menu-item index="1-1">
          <el-icon><Warning /></el-icon>
          <span>客户端错误</span>
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Warning /></el-icon>
          <span>没有权限页面</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><Warning /></el-icon>
          <span>服务器错误</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    collapseLeft: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
</style>
