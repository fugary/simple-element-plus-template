<script setup>
import { INSTALL_ICONS } from '@/icons'
import chunk from 'lodash/chunk'
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

const colSize = ref(8)
const keyWords = ref('')
const filterIcons = computed(() => {
  let installIcons = INSTALL_ICONS
  if (keyWords.value) {
    installIcons = installIcons.filter(icon => icon.toLowerCase().includes(keyWords.value.toLowerCase()))
  }
  return chunk(installIcons, colSize.value).map((arr, idx) => {
    return {
      id: idx,
      icons: arr
    }
  })
})

const copyIcon = (icon) => {
  const { copy, isSupported } = useClipboard()
  if (isSupported) {
    copy(icon)
    ElMessage({
      message: `Copied: ${icon}`,
      type: 'success'
    })
  } else {
    ElMessage({
      message: `Copy Not supported: ${icon}`,
      type: 'error'
    })
  }
}

</script>

<template>
  <div>
    <el-row>
      <el-col>
        <el-form label-width="120px">
          <el-form-item label="图标名字">
            <el-input
              v-model="keyWords"
              :placeholder="`输入关键字搜索图标`"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <RecycleScroller
      v-slot="{ item }"
      page-mode
      class="scroller"
      :items="filterIcons"
      :item-size="80"
      key-field="id"
    >
      <el-row>
        <el-col
          v-for="icon in item.icons"
          :key="icon"
          :span="24/colSize"
          class="text-center"
        >
          <a
            class="el-button el-button--large is-text"
            style="height:80px;"
            @click="copyIcon(icon)"
          >
            <div>
              <common-icon
                size="20"
                :icon="icon"
              />
            </div>
          </a>
        </el-col>
      </el-row>
    </RecycleScroller>
  </div>
</template>

<style scoped>
.scroller {
  height: 100%;
}
</style>
