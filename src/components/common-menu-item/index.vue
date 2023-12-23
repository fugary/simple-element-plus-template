<script setup>
defineProps({
  menuItem: {
    type: Object,
    required: true
  },
  index: {
    type: String,
    required: false
  }
})
</script>

<template>
  <el-menu-item
    :route="menuItem.route"
    v-bind="menuItem.attrs"
    :index="index"
    @click="menuItem.click&&menuItem.click()"
  >
    <template #title>
      <common-icon
        :icon="menuItem.icon"
      />
      <span v-if="menuItem.labelKey||menuItem.label">
        {{ menuItem.labelKey?$t(menuItem.labelKey):menuItem.label }}
      </span>
    </template>
  </el-menu-item>
</template>

<style scoped>

</style>
