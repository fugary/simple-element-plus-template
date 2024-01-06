<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { loadMenuResult, useMenuFormOptions } from '@/services/menu/MenuService'

const route = useRoute()

const menuDto = ref({
  id: route.params.id
})

const menuFormOptions = ref(useMenuFormOptions())

const loadMenu = async () => {
  const id = route.params.id
  if (id) {
    const menuResult = await loadMenuResult(id)
    if (menuResult.success && menuResult.resultData) {
      const resultData = menuResult.resultData
      menuDto.value = resultData.menu
    }
  }
}

onMounted(() => {
  loadMenu()
})

const submitForm = form => {
  form.validate(valid => {
    if (valid) {
      console.log('submit', menuDto.value)
    }
  })
}
</script>

<template>
  <el-container class="container-center">
    <common-form
      class="form-edit-width-70"
      :model="menuDto"
      :options="menuFormOptions"
      label-width="120px"
      back-url="/admin/menus"
      @submit-form="submitForm"
    />
  </el-container>
</template>

<style scoped>

</style>
