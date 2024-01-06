<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
import { UPDATE_MODEL_EVENT } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  draggable: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '800px'
  },
  buttons: {
    type: Array,
    default: () => []
  },
  showClose: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: null
  },
  showOk: {
    type: Boolean,
    default: true
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  okLabel: {
    type: String,
    default: ''
  },
  cancelLabel: {
    type: String,
    default: ''
  },
  okClick: {
    type: Function,
    default: null
  },
  cancelClick: {
    type: Function,
    default: null
  },
  closeClick: {
    type: Function,
    default: null
  }
})

const emit = defineEmits([UPDATE_MODEL_EVENT])
const showDialog = useVModel(props, 'modelValue', emit) // 自动响应v-model

const okButtonClick = $event => {
  if (!props.okClick || props.okClick($event) !== false) {
    showDialog.value = false
  }
}
const cancelButtonClick = $event => {
  if (!props.cancelClick || props.cancelClick($event) !== false) {
    showDialog.value = false
  }
}

const calcBeforeClose = computed(() => {
  if (props.beforeClose) {
    return props.beforeClose
  } else if (props.closeClick) {
    return done => {
      if (props.closeClick() !== false) {
        done()
      }
    }
  }
  return null
})

</script>

<template>
  <el-dialog
    v-model="showDialog"
    :title="title"
    :before-close="calcBeforeClose"
    :width="width"
    :draggable="draggable"
    v-bind="$attrs"
  >
    <el-container
      :style="{ height:height }"
    >
      <slot
        name="default"
      />
    </el-container>
    <template #footer>
      <span class="dialog-footer container-center">
        <el-button
          v-if="showOk"
          type="primary"
          @click="okButtonClick($event)"
        >{{ okLabel||$t('common.label.confirm') }}</el-button>
        <el-button
          v-if="showCancel"
          type="default"
          @click="cancelButtonClick($event)"
        >
          {{ cancelLabel||$t('common.label.cancel') }}
        </el-button>
        <template v-for="(button, index) in buttons">
          <el-button
            v-if="!button.buttonIf||button.buttonIf()"
            :key="index"
            :type="button.type"
            :icon="button.icon"
            :size="button.size"
            :disabled="button.disabled"
            :round="button.round"
            :circle="button.circle"
            @click="button.click&&button.click($event)"
          >
            {{ button.label || $t(button.labelKey) }}
          </el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
