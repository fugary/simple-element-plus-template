<script setup>
import { ref } from 'vue'
import { defineFormOptions } from '@/components/utils'
const showWindow = ref(false)

const userModel = ref({
  cert: {}
})

const formOptions1 = defineFormOptions([
  {
    label: '用户名',
    prop: 'userName',
    required: true
  },
  {
    label: '密码',
    prop: 'userPassword',
    required: true
  }
])

const formOptions2 = defineFormOptions([
  {
    label: '证件类别',
    type: 'select',
    prop: 'certType',
    required: true,
    children: [{
      label: '身份证',
      value: '1'
    }, {
      label: '护照',
      value: '2'
    }]
  },
  {
    label: '证件号',
    prop: 'certNumber',
    required: true
  }
])

const submitForm = ({ form }) => {
  console.info('=============================', form)
  form.validate(valid => {
    console.info('======================valid', valid)
  })
  return false
}

</script>

<template>
  <el-container class="container-center">
    <el-button
      type="primary"
      size="large"
      @click="showWindow=!showWindow"
    >
      打开窗口
    </el-button>
    <common-window
      v-model="showWindow"
      :ok-click="submitForm"
    >
      <el-container class="flex-column container-center">
        <common-form
          class="form-edit-width-90"
          :model="userModel"
          :options="formOptions1"
          :show-buttons="false"
        />
        <common-form
          class="form-edit-width-90"
          :model="userModel.cert"
          :options="formOptions2"
          :show-buttons="false"
        />
      </el-container>
    </common-window>
  </el-container>
</template>

<style scoped>

</style>
