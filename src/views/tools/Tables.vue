<script setup>
import { onMounted, ref } from 'vue'
import { loadUsersResult, useUserFormOptions } from '@/services/user/UserService'
import { useDefaultPage } from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()

const page = ref(useDefaultPage())

const tableData = ref([])

const loadUsers = async () => {
  const usersResult = await loadUsersResult({ page: page.value })
  if (usersResult.success && usersResult.resultData) {
    const resultData = usersResult.resultData
    tableData.value = resultData.userList
    Object.assign(page.value, resultData.page)
  }
}

onMounted(() => {
  loadUsers()
})

/**
 *
 * @type {[CommonTableColumn]}
 */
const columns = [{
  label: '中文名',
  property: 'nameCn',
  click (data) {
    router.push(`tables/edit/${data.id}`)
  }
}, {
  label: '英文名',
  property: 'nameEn',
  click (data) {
    router.push(`tables/edit/${data.id}`)
  }
}, {
  label: '性别',
  property: 'gender',
  slot: 'gender'
}, {
  label: '出生日期',
  property: 'birthday',
  click (item) {
    console.info('=================', item)
  }
}, {
  label: '地址',
  property: 'address'
}]
const buttons = ref([{
  labelKey: 'common.label.edit',
  type: 'primary',
  click: item => {
    toEditUser(item)
  },
  buttonIf (item) {
    return !!item.id
  }
}, {
  labelKey: 'common.label.delete',
  type: 'danger',
  click: item => {
    console.info('删除=============', item)
  },
  buttonIf (item) {
    return !!item.id
  }
}])
/** *************用户编辑**************/
const currentUser = ref({})
const showEdit = ref(false)
const userFormOptions = ref(useUserFormOptions())
const toEditUser = user => {
  currentUser.value = { ...user }
  showEdit.value = true
}
const formRef = ref()
const submitForm = () => {
  formRef.value.form.validate(valid => {
    if (valid) {
      console.log('submit', currentUser.value)
      showEdit.value = false
    }
  })
  return false
}

</script>

<template>
  <el-container class="no_flex">
    <common-table
      v-model:page="page"
      :data="tableData"
      :columns="columns"
      :buttons="buttons"
      buttons-slot="buttons"
      :buttons-column-attrs="{width:'250px'}"
      @page-size-change="loadUsers()"
      @current-page-change="loadUsers()"
    >
      <template #gender="{item}">
        <el-tag
          :type="item.gender === 'male' ? '' : 'success'"
        >
          {{ item.gender }}
        </el-tag>
      </template>
      <template #buttons="{item}">
        <el-button
          size="small"
          @click="console.info(item)"
        >
          测试
        </el-button>
      </template>
    </common-table>
    <common-window
      v-model="showEdit"
      :width="'600px'"
      :ok-click="submitForm"
      title="用户编辑"
    >
      <common-form
        ref="formRef"
        class="form-edit-width-100"
        :model="currentUser"
        :options="userFormOptions"
        label-width="100px"
        :show-buttons="false"
      />
    </common-window>
  </el-container>
</template>

<style scoped>

</style>
