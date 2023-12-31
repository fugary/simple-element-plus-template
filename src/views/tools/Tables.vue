<script setup>
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
  property: 'userName'
}, {
  label: '性别',
  property: 'gender'
}, {
  label: '出生日期',
  property: 'birthday'
}, {
  label: '地址',
  property: 'address'
}]
</script>

<template>
  <common-table
    :data="tableData"
    :columns="columns"
  />
</template>

<style scoped>

</style>
