<script setup>
import { computed, ref } from 'vue'
import { useDefaultPage } from '@/config'
import { loadUsersResult } from '@/services/user/UserService'
import { $i18nMsg } from '@/messages'
import { loadAutoCities, loadSelectCities } from '@/services/city/CityService'

const modelIcon = ref('Apple')
const modelAuto = ref('99999')
const modelAutoLabel = ref('Gary Fu')
const autoPage = ref(useDefaultPage(8))
const cityModel = ref('')
const autoCityPage = ref(useDefaultPage(8))
const userAutocompleteConfig = computed(() => {
  return {
    columns: [{
      label: $i18nMsg('姓名', 'Name'),
      property: $i18nMsg('nameCn', 'nameEn')
    }, {
      label: $i18nMsg('性别', 'Gender'),
      property: 'gender',
      slot: 'gender'
    }, {
      label: $i18nMsg('地址', 'Address'),
      property: 'address',
      width: '300px'
    }],
    searchMethod (query, cb) {
      loadUsersResult({ page: autoPage.value })
        .then(result => {
          const data = {
            page: result.resultData.page,
            items: result.resultData.userList
          }
          cb(data)
        })
    }
  }
})
const cityAutocompleteConfig = computed(() => {
  return {
    columns: [{
      label: $i18nMsg('代码', 'Code'),
      property: 'code'
    }, {
      label: $i18nMsg('中文名', 'CN Name'),
      property: 'nameCn'
    }, {
      label: $i18nMsg('英文名', 'EN Name'),
      property: 'nameEn'
    }],
    searchMethod (query, cb) {
      loadAutoCities({ page: autoCityPage.value })
        .then(result => {
          const data = {
            page: result.resultData.page,
            items: result.resultData.cityList
          }
          cb(data)
        })
    }
  }
})
const citySelectPageConfig = computed(() => {
  return {
    tabs: [{
      label: $i18nMsg('热门', 'Hot'),
      id: '0'
    }, {
      label: 'A-F',
      id: 'A-F'
    }, {
      label: 'G-J',
      id: 'G-J'
    }, {
      label: 'K-N',
      id: 'K-N'
    }, {
      label: 'P-W',
      id: 'P-W'
    }, {
      label: 'X-Z',
      id: 'X-Z'
    }],
    searchMethod (id, cb) {
      loadSelectCities({ id })
        .then(result => {
          console.info('================selectCities', result)
          cb(result.resultData.cityList)
        })
    }
  }
})
</script>

<template>
  <el-container>
    <el-main>
      <el-form :label-width="100">
        <el-form-item label="图标选择">
          <common-icon-select v-model="modelIcon" />
        </el-form-item>
        <el-form-item label="用户">
          <common-autocomplete
            v-model="modelAuto"
            v-model:autocomplete-label="modelAutoLabel"
            v-model:page="autoPage"
            id-key="id"
            :label-key="$i18nMsg('nameCn', 'nameEn')"
            :empty-search-enabled="false"
            title="请选择用户"
            :autocomplete-config="userAutocompleteConfig"
          >
            <template #gender="{item}">
              <el-tag
                :type="item.gender === 'male' ? '' : 'success'"
              >
                {{ item.gender }}
              </el-tag>
            </template>
          </common-autocomplete>
        </el-form-item>
        <el-form-item label="出发城市">
          <common-autocomplete
            v-model="cityModel"
            v-model:page="autoCityPage"
            id-key="code"
            :label-key="$i18nMsg('nameCn', 'nameEn')"
            :empty-search-enabled="false"
            title="请选择城市"
            :autocomplete-config="cityAutocompleteConfig"
            :select-page-config="citySelectPageConfig"
          />
        </el-form-item>
      </el-form>
      <el-container>
        {{ modelAuto }}
        {{ modelAutoLabel }}
      </el-container>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
