<script setup>
import { computed } from 'vue'

const props = defineProps({
  menus: {
    type: Array,
    required: true
  },
  collapse: {
    type: Boolean
  }
})
const menuItems = computed(() => {
  return filterMenus(props.menus)
})
const calcWithIf = menuItem => {
  ['icon', 'labelKey', 'label', 'html'].forEach(key => {
    const keyIf = menuItem[`${key}If`]
    if (keyIf) {
      menuItem[key] = keyIf(menuItem)
    }
  })
}
const filterMenus = menus => menus.filter(menu => !menu.disabled)
  .map(menu => {
    calcWithIf(menu)
    if (menu.children && menu.children.length) {
      menu.children = filterMenus(menu.children)
    }
    return menu
  })
</script>

<template>
  <el-menu
    v-bind="$attrs"
    :default-active="$route.path"
    router
    :collapse="collapse"
  >
    <template
      v-for="(menuItem, index) in menuItems"
      :key="index"
    >
      <common-menu-item
        :menu-item="menuItem"
        :index="index"
      />
    </template>
  </el-menu>
</template>

<style scoped>

</style>
