<script setup>
import { INSTALL_ICONS } from '@/icons'
import chunk from 'lodash/chunk'
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'

const colSize = ref(8)
const showSize = ref(200)
const keyWords = ref('')
const filterIcons = computed(() => {
  let icons = INSTALL_ICONS
  if (keyWords.value) {
    icons = icons.filter(icon => icon.toLowerCase().includes(keyWords.value.toLowerCase()))
  }
  return chunk(icons.slice(0, showSize.value), colSize.value)
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
              :placeholder="`输入关键字搜索图标，只显示前${showSize}个图标`"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row
      v-for="(icons, chunkIdx) in filterIcons"
      :key="chunkIdx"
    >
      <el-col
        v-for="icon in icons"
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
  </div>
</template>

<style scoped>

</style>
