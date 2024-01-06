<script setup>
import { computed, ref } from 'vue'
import { useUserAutocompleteConfig } from '@/services/user/UserService'
import { $i18nMsg } from '@/messages'
import { useCityAutocompleteConfig, useCitySelectPageConfig } from '@/services/city/CityService'

const modelIcon = ref('Apple')
const modelAuto = ref('99999')
const modelAutoLabel = ref('Gary Fu')
const userAutocompleteConfig = computed(() => useUserAutocompleteConfig())
// 城市控件
const cityModel = ref('')
const cityAutocompleteConfig = computed(() => useCityAutocompleteConfig())
const citySelectPageConfig = computed(() => useCitySelectPageConfig())
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
            v-model:default-label="modelAutoLabel"
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
