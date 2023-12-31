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
}, {
  label: '地址',
  prop: 'address',
  value: '',
  attrs: {
    type: 'textarea'
  }
}]
const userDto = ref({
  userName: '',
  userPassword: ''
})
const submitForm = (form) => {
  console.info(form)
  form.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div>
    <common-form
      :model="userDto"
      :options="formOptions"
      :submit-form="submitForm"
      label-width="120px"
    >
      <template
        #buttons="{form}"
      >
        <el-button @click="form.resetFields()">
          自定义按钮
        </el-button>
      </template>
    </common-form>
    <div>
      {{ userDto }}
    </div>
  </div>
</template>

<style scoped>

</style>
