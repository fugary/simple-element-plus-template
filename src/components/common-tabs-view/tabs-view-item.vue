<script setup>
import { useMenuName } from '@/components/utils'
import { computed } from 'vue'

const props = defineProps({
  tabItem: {
    type: Object,
    required: true
  }
})

const menuName = computed(() => {
  if (props.tabItem) {
    return useMenuName(props.tabItem)
  }
})
</script>

<template>
  <el-tab-pane
    :label="menuName"
    :name="tabItem.path"
  />
</template>

<style scoped>

</style>
