<script setup>
defineProps({
  menuItem: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: false
  }
})
</script>

<template>
  <div
    v-if="menuItem.isSplit"
    :key="menuItem.index||index"
    :class="menuItem.menuCls"
  >
    {{ menuItem.splitText }}
  </div>
  <el-sub-menu
    v-else-if="menuItem.children && menuItem.children.length"
    :key="menuItem.index||index"
    :index="`${menuItem.index||index}`"
    :class="menuItem.menuCls"
    v-bind="menuItem.attrs"
  >
    <template #title>
      <common-icon
        :icon="menuItem.icon"
      />
      <span v-if="menuItem.labelKey||menuItem.label">
        {{ menuItem.labelKey?$t(menuItem.labelKey):menuItem.label }}
      </span>
      <div
        v-if="menuItem.html"
        v-html="menuItem.html"
      />
    </template>
    <common-menu-item
      v-for="(childMenu, childIdx) in menuItem.children"
      :key="childMenu.index||childIdx"
      :index="childIdx"
      :menu-item="childMenu"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    :class="menuItem.menuCls"
    :route="menuItem.route"
    v-bind="menuItem.attrs"
    :index="menuItem.index"
    @click="menuItem.click&&menuItem.click()"
  >
    <common-icon
      :icon="menuItem.icon"
    />
    <template #title>
      <span v-if="menuItem.labelKey||menuItem.label">
        {{ menuItem.labelKey?$t(menuItem.labelKey):menuItem.label }}
      </span>
      <div
        v-if="menuItem.html"
        v-html="menuItem.html"
      />
    </template>
  </el-menu-item>
</template>

<style scoped>

</style>
