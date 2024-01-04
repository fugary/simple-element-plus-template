<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { loadUserResult } from '@/services/user/UserService'

const route = useRoute()

const userDto = ref({
  id: route.params.id
})
/**
 * @type {[CommonFormOption]}
 */
const userFormOptions = [{
  label: '中文名',
  prop: 'nameCn',
  placeholder: '请输入中文名',
  required: true
}, {
  label: '英文名',
  prop: 'nameEn',
  placeholder: '请输入英文名',
  required: true
}, {
  label: '出生日期',
  type: 'date-picker',
  prop: 'birthday',
  value: '',
  placeholder: '选择出生日期',
  required: true
}, {
  label: '性别',
  type: 'radio-group',
  prop: 'gender',
  value: '',
  required: true,
  children: [
    {
      label: '男',
      value: 'male'
    },
    {
      label: '女',
      value: 'female'
    }
  ]
}, {
  label: '地址',
  prop: 'address',
  value: '',
  attrs: {
    type: 'textarea'
  }
}]

const loadUser = async () => {
  console.info('============', route)
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
      class="form-edit-width"
      :model="userDto"
      :options="userFormOptions"
      label-width="120px"
      back-url="/tables"
      @submit-form="submitForm"
    />
  </el-container>
</template>

<style scoped>

</style>
