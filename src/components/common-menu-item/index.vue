<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  menuItem: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: false
  }
})
const isSubMenu = computed(() => {
  const menuItem = props.menuItem
  return !menuItem.isDropdown && menuItem.children && menuItem.children.length
})
const isDropdown = computed(() => {
  const menuItem = props.menuItem
  return menuItem.isDropdown && menuItem.children && menuItem.children.length
})
const menuCls = computed(() => {
  const menuItem = props.menuItem
  if (!menuItem.menuCls && menuItem.isDropdown) {
    return 'padding-left1 padding-right1'
  }
  return menuItem.menuCls
})
const dropdownClick = menuItem => {
  if (menuItem.click) {
    menuItem.click()
  } else {
    const route = menuItem.route || menuItem.index
    if (route) {
      router.push(route)
    }
  }
}
</script>

<template>
  <div
    v-if="menuItem.isSplit"
    :key="menuItem.index||index"
    :class="menuCls"
  >
    {{ menuItem.splitText }}
  </div>
  <el-sub-menu
    v-else-if="isSubMenu"
    :key="menuItem.index||index"
    :index="`${menuItem.index||index}`"
    :class="menuCls"
    v-bind="menuItem.attrs"
  >
    <template #title>
      <common-icon
        :size="menuItem.iconSize"
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
    v-else-if="isDropdown"
    :key="menuItem.index||index"
    :class="menuCls"
    :route="menuItem.route"
    :index="menuItem.index"
    @click="menuItem.click&&menuItem.click()"
  >
    <el-dropdown>
      <span class="el-dropdown-link">
        <common-icon
          :size="menuItem.iconSize"
          :icon="menuItem.icon"
        />
        <span v-if="menuItem.labelKey||menuItem.label">
          {{ menuItem.labelKey?$t(menuItem.labelKey):menuItem.label }}
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-item
          v-for="(childMenu, childIdx) in menuItem.children"
          :key="childMenu.index||childIdx"
          @click="dropdownClick(childMenu)"
        >
          <common-icon
            :size="childMenu.iconSize"
            :icon="childMenu.icon"
          />
          <span v-if="childMenu.labelKey||childMenu.label">
            {{ childMenu.labelKey?$t(childMenu.labelKey):childMenu.label }}
          </span>
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </el-menu-item>
  <el-menu-item
    v-else
    :class="menuCls"
    :route="menuItem.route"
    v-bind="menuItem.attrs"
    :index="menuItem.index"
    @click="menuItem.click&&menuItem.click()"
  >
    <common-icon
      :size="menuItem.iconSize"
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
