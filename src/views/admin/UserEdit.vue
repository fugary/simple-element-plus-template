<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { loadUserResult, useUserFormOptions } from '@/services/user/UserService'

const route = useRoute()

const userDto = ref({
  id: route.params.id
})

const userFormOptions = ref(useUserFormOptions())

const loadUser = async () => {
  const id = route.params.id
  if (id) {
    const userResult = await loadUserResult(id)
    if (userResult.success && userResult.resultData) {
      const resultData = userResult.resultData
      userDto.value = resultData.user
    }
  }
}

onMounted(() => {
  loadUser()
})

const submitForm = form => {
  form.validate(valid => {
    if (valid) {
      console.log('submit', userDto.value)
    }
  })
}
</script>

<template>
  <el-container class="container-center">
    <common-form
      class="form-edit-width-70"
      :model="userDto"
      :options="userFormOptions"
      label-width="120px"
      back-url="/admin/users"
      @submit-form="submitForm"
    />
  </el-container>
</template>

<style scoped>

</style>
