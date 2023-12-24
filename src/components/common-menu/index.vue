<script setup>
import { computed } from 'vue'
import { filterMenus } from '@/components/utils'

const props = defineProps({
  menus: {
    type: Array,
    required: true
  }
})
const menuItems = computed(() => {
  return filterMenus(props.menus)
})
</script>

<template>
  <el-menu
    v-bind="$attrs"
    :default-active="$route.path"
    router
  >
    <slot name="before" />
    <template
      v-for="(menuItem, index) in menuItems"
      :key="index"
    >
      <common-menu-item
        :menu-item="menuItem"
        :index="index"
      />
    </template>
    <slot name="default" />
  </el-menu>
</template>

<style scoped>

</style>
