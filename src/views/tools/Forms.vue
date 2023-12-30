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
  rules: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
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
  rules: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 6,
      message: '密码在2-6位之间',
      trigger: 'blur'
    }
  ],
  attrs: {
    showPassword: true
  }
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
