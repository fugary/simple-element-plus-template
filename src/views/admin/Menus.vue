<script setup>
import { computed, onMounted, ref } from 'vue'
import { useDefaultPage } from '@/config'
import { useRouter } from 'vue-router'
import { searchMenusResult } from '@/services/menu/MenuService'

const router = useRouter()

const page = ref(useDefaultPage(8))

const tableData = ref([])
const loading = ref(true)
const searchMenus = async () => {
  loading.value = true
  const searchResult = await searchMenusResult({ page: page.value })
  loading.value = false
  if (searchResult.success && searchResult.resultData) {
    const resultData = searchResult.resultData
    tableData.value = resultData.menuList
    Object.assign(page.value, resultData.page)
  }
}

onMounted(() => {
  searchMenus()
})

/**
 *
 * @type {[CommonTableColumn]}
 */
const columns = [{
  labelKey: 'menu.label.menuNameCn',
  property: 'nameCn',
  click (data) {
    router.push(`menus/edit/${data.id}`)
  }
}, {
  labelKey: 'menu.label.menuNameEn',
  property: 'nameEn',
  click (data) {
    router.push(`menus/edit/${data.id}`)
  }
}, {
  labelKey: 'menu.label.menuParent',
  property: 'parentId'
}, {
  labelKey: 'menu.label.menuIcon',
  property: 'iconCls',
  slot: 'iconCls'
}, {
  labelKey: 'menu.label.menuUrl',
  property: 'menuUrl'
}]
const buttons = ref([{
  labelKey: 'common.label.edit',
  type: 'primary',
  click: item => {
    router.push(`menus/edit/${item.id}`)
  }
}, {
  labelKey: 'common.label.delete',
  type: 'danger',
  click: item => {
    console.info('删除=============', item)
  }
}])
//* ************搜索框**************//
const searchParam = ref({})
const searchFormOptions = computed(() => {
  return [
    {
      label: '关键字',
      prop: 'keywords'
    }
  ]
})
const doSearch = form => {
  console.info('=================searchParam', searchParam.value)
}
</script>

<template>
  <el-container
    class="no_flex"
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
      @current-page-change="searchMenus()"
    >
      <template #iconCls="{item}">
        <common-icon :icon="item.iconCls" />
        {{ item.iconCls }}
      </template>
    </common-table>
  </el-container>
</template>

<style scoped>

</style>
