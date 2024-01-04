<script setup>
import { onMounted, ref } from 'vue'
import { loadUsersResult } from '@/services/user/UserService'
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
  <el-container class="no_flex">
    <common-table
      v-model:page="page"
      :data="tableData"
      :columns="columns"
      :buttons="buttons"
      buttons-slot="buttons"
      :buttons-column-attrs="{width:'300px'}"
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
  </el-container>
</template>

<style scoped>

</style>
