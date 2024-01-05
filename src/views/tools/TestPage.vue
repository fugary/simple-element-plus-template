<script setup>
import { computed, ref } from 'vue'
import { useDefaultPage } from '@/config'
import { loadUsersResult } from '@/services/user/UserService'
import { $i18nMsg } from '@/messages'

const modelIcon = ref('Apple')
const modelAuto = ref('99999')
const modelAutoLabel = ref('Gary Fu')
const autoPage = ref(useDefaultPage(8))
const autocompleteConfig = computed(() => {
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
      property: 'address'
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
</script>

<template>
  <el-container>
    <el-main>
      <el-form>
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
            :autocomplete-config="autocompleteConfig"
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
