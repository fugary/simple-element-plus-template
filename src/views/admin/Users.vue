<script setup>
import { computed, onMounted, ref } from 'vue'
import { loadUsersResult, useUserFormOptions } from '@/services/user/UserService'
import { useDefaultPage } from '@/config'
import { useRouter } from 'vue-router'
import { $i18nMsg } from '@/messages'

const router = useRouter()

const page = ref(useDefaultPage())

const tableData = ref([])
const loading = ref(true)
const loadUsers = async () => {
  loading.value = true
  const usersResult = await loadUsersResult({ page: page.value }).finally(() => (loading.value = false))
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
    router.push(`users/edit/${data.id}`)
  }
}, {
  label: '英文名',
  property: 'nameEn',
  click (data) {
    router.push(`users/edit/${data.id}`)
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
//* ************搜索框**************//
const searchParam = ref({})
const searchFormOptions = computed(() => {
  return [
    {
      label: '用户名',
      prop: 'nameCn'
    },
    {
      label: '关键字',
      prop: 'keywords'
    },
    {
      label: '地址',
      prop: 'address'
    }, {
      label: $i18nMsg('性别', 'Gender'),
      type: 'select',
      prop: 'gender',
      children: [{
        value: 'male',
        label: $i18nMsg('男', 'Male')
      }, {
        value: 'female',
        label: $i18nMsg('女', 'Female')
      }]
    }
  ]
})
const doSearch = form => {
  console.info('=================searchParam', form, searchParam.value)
  loadUsers()
}
/** *************用户编辑**************/
const currentUser = ref(null)
const showEdit = ref(false)
const userFormOptions = computed(() => useUserFormOptions())
const toEditUser = user => {
  currentUser.value = { ...user }
  showEdit.value = true
}

const submitForm = ({ form }) => {
  form.validate(valid => {
    if (valid) {
      console.log('submit', currentUser.value)
      showEdit.value = false
    }
  })
  return false
}

</script>

<template>
  <el-container
    class="flex-column"
  >
    <common-form
      inline
      :model="searchParam"
      :options="searchFormOptions"
      :submit-label="$t('common.label.search')"
      @submit-form="doSearch"
    />
    <common-table
      v-model:page="page"
      :data="tableData"
      :columns="columns"
      :buttons="buttons"
      buttons-slot="buttons"
      :buttons-column-attrs="{width:'250px'}"
      :loading="loading"
      @page-size-change="loadUsers()"
      @current-page-change="loadUsers()"
    >
      <template #gender="{item}">
        <el-tag
          :type="item.gender === 'male' ? 'primary' : 'success'"
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
        v-if="currentUser"
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
