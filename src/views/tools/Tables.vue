<script setup>
import { onMounted, ref } from 'vue'
import { loadUsersResult } from '@/services/user/UserService'
import { useDefaultPage } from '@/config'

const page = ref(useDefaultPage())

const tableData = ref([])

onMounted(async () => {
  const usersResult = await loadUsersResult()
  console.info('=================', usersResult)
  if (usersResult.success && usersResult.resultData) {
    const resultData = usersResult.resultData
    tableData.value = resultData.userList
    Object.assign(page.value, resultData.page)
  }
})

/**
 *
 * @type {[CommonTableColumn]}
 */
const columns = [{
  label: '中文名',
  property: 'nameCn',
  link: '#/tables/edit'
}, {
  label: '英文名',
  property: 'nameEn',
  link: '#/tables/edit'
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
    console.info('编辑=============', item)
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
}, {
  label: '其他操作'
}])
</script>

<template>
  <common-table
    :data="tableData"
    :columns="columns"
    :buttons="buttons"
    buttons-slot="buttons"
    :page="page"
    :buttons-column-attrs="{width:'300px'}"
    @page-size-change="console.info"
    @current-page-change="console.info"
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
</template>

<style scoped>

</style>
