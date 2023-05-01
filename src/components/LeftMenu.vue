<template>
  <el-scrollbar>
    <el-menu
      :collapse="collapseLeft"
      :default-openeds="['1']"
    >
      <el-menu-item index="0">
        SIMPLE Element Plus
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><setting /></el-icon>系统管理
        </template>
        <el-menu-item index="1-1">
          <el-icon><user /></el-icon>用户管理
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Menu /></el-icon>角色管理
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><lock /></el-icon>权限管理
        </el-menu-item>
        <el-menu-item index="1-4">
          <el-icon><Menu /></el-icon>菜单管理
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><WarningFilled /></el-icon>错误页面
        </template>
        <el-menu-item index="1-1">
          <el-icon><Warning /></el-icon>客户端错误
        </el-menu-item>
        <el-menu-item index="1-2">
          <el-icon><Warning /></el-icon>没有权限页面
        </el-menu-item>
        <el-menu-item index="1-3">
          <el-icon><Warning /></el-icon>服务器错误
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
