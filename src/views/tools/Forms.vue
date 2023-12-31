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
}, {
  label: '兴趣爱好',
  type: 'checkbox-group',
  prop: 'hobby',
  value: '',
  required: true,
  children: [
    {
      label: '编程',
      value: 'program'
    },
    {
      label: '吃饭',
      value: 'eat'
    },
    {
      label: '睡觉',
      value: 'sleep'
    }
  ]
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
    },
    {
      label: '保密',
      value: 'unknown'
    }
  ]
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
