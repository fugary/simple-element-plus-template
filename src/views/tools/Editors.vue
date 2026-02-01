<script setup>
import { useMonacoEditorOptions } from '@/vendors/monaco-editor'
import { $copyText } from '@/utils'
import { useGlobalConfigStore } from '@/stores/GlobalConfigStore'
import { computed } from 'vue'

const globalConfigStore = useGlobalConfigStore()
const { contentRef, languageRef, editorRef, monacoEditorOptions, formatDocument } = useMonacoEditorOptions({
  readOnly: false
})
const theme = computed(() => {
  return globalConfigStore.isDarkTheme ? 'vs-dark' : 'vs'
})

</script>

<template>
  <el-container class="flex-column">
    <vue-monaco-editor
      v-model:value="contentRef"
      :language="languageRef"
      height="400px"
      :options="monacoEditorOptions"
      :theme="theme"
      @mount="editorRef=$event"
    />
    <el-footer
      v-if="contentRef"
      class="container-center"
    >
      <el-button
        type="success"
        @click="$copyText(contentRef)"
      >
        {{ $t('common.label.copy') }}
      </el-button>
      <el-button
        type="info"
        @click="formatDocument()"
      >
        {{ $t('common.label.format') }}
      </el-button>
    </el-footer>
  </el-container>
</template>

<style scoped>

</style>
