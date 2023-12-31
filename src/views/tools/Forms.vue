<script setup>
import { ref } from 'vue'

/**
 * @type {[CommonFormOption]}
 */
const formOptions = [{
  label: '用户名',
  prop: 'userName',
  value: '',
  placeholder: '请输入用户名',
  required: true,
  rules: [
    {
      min: 2,
      max: 6,
      message: '用户名在2-6位之间',
      trigger: 'blur'
    }
  ]
}, {
  label: '密码',
  prop: 'userPassword',
  value: '',
  placeholder: '请输入密码',
  required: true,
  pattern: /.{2,6}/,
  attrs: {
    showPassword: true
  }
}, {
  label: '出生日期',
  type: 'date-picker',
  prop: 'birthday',
  value: '',
  placeholder: '选择出生日期',
  required: true
}]
const userDto = ref({
  userName: '',
  userPassword: ''
})
</script>

<template>
  <div>
    <common-form
      :model="userDto"
      :options="formOptions"
      label-width="120px"
    />
    <div>
      {{ userDto }}
    </div>
  </div>
</template>

<style scoped>

</style>
