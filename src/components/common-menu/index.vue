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
const calcIcon = menuItem => {
  if (menuItem.iconIf) {
    menuItem.icon = menuItem.iconIf(menuItem)
  }
  return menuItem.icon
}
const filterMenus = menus => menus.filter(menu => !menu.disabled)
  .map(menu => {
    menu.icon = calcIcon(menu)
    if (menu.children && menu.children.length) {
      menu.children = filterMenus(menu.children)
    }
    return menu
  })
</script>

<template>
  <el-menu
    v-bind="$attrs"
    router
    :collapse="collapse"
  >
    <template v-for="(menuItem, index) in menuItems">
      <el-sub-menu
        v-if="menuItem.children && menuItem.children.length"
        :key="menuItem.index||index"
        :index="menuItem.index"
        v-bind="menuItem.attrs"
      >
        <template #title>
          <common-icon
            :icon="menuItem.icon"
          />
          <span v-if="menuItem.labelKey||menuItem.label">
            {{ menuItem.labelKey?$t(menuItem.labelKey):menuItem.label }}
          </span>
        </template>
        <common-menu-item
          v-for="(childMenu, childIdx) in menuItem.children"
          :key="childMenu.index||childIdx"
          :index="childMenu.index"
          :menu-item="childMenu"
        />
      </el-sub-menu>
      <common-menu-item
        v-else
        :key="menuItem.index||index"
        :index="menuItem.index"
        :menu-item="menuItem"
      />
    </template>
  </el-menu>
</template>

<style scoped>

</style>
