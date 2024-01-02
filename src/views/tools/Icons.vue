<script setup>
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { filterIconsByKeywords } from '@/services/icon/IconService'

const colSize = ref(8)
const keyWords = ref('')

const filterIcons = computed(() => {
  return filterIconsByKeywords(keyWords.value, colSize.value)
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
  <el-container
    class="icon-container"
  >
    <el-header height="40px">
      <el-form label-width="120px">
        <el-form-item :label="$t('common.label.keywords')">
          <el-input
            v-model="keyWords"
            :placeholder="$t('common.msg.inputKeywords')"
          />
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <RecycleScroller
        v-slot="{ item }"
        class="scroller icon-list"
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
    </el-main>
  </el-container>
</template>

<style scoped>
.scroller, .icon-container  {
  height: 100%;
}
</style>
