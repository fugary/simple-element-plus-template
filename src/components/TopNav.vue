<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item @click="updateCollapseLeft">
      <template #title>
        <el-icon v-if="!isCollapseLeft">
          <Fold />
        </el-icon>
        <el-icon v-if="isCollapseLeft">
          <Expand />
        </el-icon>
        <span>&nbsp;</span>
      </template>
    </el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title>
        <el-icon v-if="isCollapseLeft">
          <Expand />
        </el-icon>
        <span>语言</span>
      </template>
      <el-menu-item index="2-1">
        中文
      </el-menu-item>
      <el-menu-item index="2-2">
        英文
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        主题
      </template>
      <el-menu-item index="2-1">
        默认
      </el-menu-item>
      <el-menu-item index="2-2">
        黑色
      </el-menu-item>
      <el-menu-item index="2-3">
        紫色
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        个人中心
      </template>
      <el-menu-item index="2-4-1">
        个人资料
      </el-menu-item>
      <el-menu-item index="2-4-2">
        关于
      </el-menu-item>
      <el-menu-item index="2-4-3">
        退出
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    collapseLeft: {
      type: Boolean
    }
  },
  data () {
    const isCollapseLeft = this.$props.collapseLeft
    return {
      isCollapseLeft
    }
  },
  methods: {
    updateCollapseLeft () {
      this.isCollapseLeft = !this.isCollapseLeft
      this.$emit('update:collapseLeft', this.isCollapseLeft)
    }
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
