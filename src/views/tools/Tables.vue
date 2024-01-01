<script setup>
import { ref } from 'vue'

const tableData = [
  {
    birthday: '2016-05-03',
    userName: 'Tom',
    gender: 'male',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    birthday: '2016-05-02',
    userName: 'Tom',
    gender: 'female',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    birthday: '2016-05-04',
    userName: 'Tom',
    gender: 'male',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    birthday: '2016-05-01',
    userName: 'Tom',
    gender: 'female',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
/**
 *
 * @type {[CommonTableColumn]}
 */
const columns = [{
  label: '用户名',
  property: 'userName',
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
  }
}, {
  labelKey: 'common.label.delete',
  type: 'danger',
  click: item => {
    console.info('删除=============', item)
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
