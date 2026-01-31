<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeAndLocaleMenus } from '@/services/menu/MenuService'
import { useLoginConfigStore } from '@/stores/LoginConfigStore'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'

const router = useRouter()
const loginConfigStore = useLoginConfigStore()

const themeAndLocaleMenus = ref(useThemeAndLocaleMenus())

const loginFormOptions = [{
  labelKey: 'common.label.username',
  required: true,
  prop: 'userName',
  attrs: {
    size: 'large',
    'prefix-icon': User
  }
}, {
  labelKey: 'common.label.password',
  required: true,
  prop: 'userPassword',
  attrs: {
    size: 'large',
    showPassword: true,
    'prefix-icon': Lock
  }
}]

const loginVo = ref({
  userName: 'admin',
  userPassword: '123456'
})

const loading = ref(false)
const formRef = ref()

const submitForm = async () => {
  const form = formRef.value?.form
  if (!form) return

  await form.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const loginResult = await loginConfigStore.login(loginVo.value)
        .finally(() => {
          loading.value = false
        })
      if (loginResult.success) {
        router.push('/')
      } else {
        ElMessage.error(loginResult.message)
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <!-- Tools -->
    <div class="login-tools">
      <common-menu
        :menus="themeAndLocaleMenus"
        mode="horizontal"
        :ellipsis="false"
      />
    </div>

    <!-- Left Branding -->
    <div class="login-branding">
      <div class="branding-decoration" />
      <div class="branding-content">
        <transition
          name="fade-slide"
          mode="out-in"
        >
          <div :key="$i18n.locale">
            <h1 class="branding-title">
              {{ $t('common.label.title') }}
            </h1>
            <p class="branding-subtitle">
              {{ $t('common.msg.loginSubtitle') }}
            </p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Right Form Section -->
    <div class="login-form-section">
      <div class="form-wrapper">
        <div class="form-header">
          <h2>{{ $t('common.msg.loginTitle') }}</h2>
          <p class="form-subtitle">
            {{ $t('common.msg.loginWelcome') }}
          </p>
        </div>

        <common-form
          ref="formRef"
          :model="loginVo"
          :options="loginFormOptions"
          class="modern-form"
          label-position="top"
          :show-buttons="false"
          @submit-form="submitForm"
        />

        <div class="form-actions">
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="submitForm"
          >
            {{ loading ? $t('common.label.logining') : $t('common.label.login') }}
          </el-button>

          <el-button
            class="reset-btn"
            text
            @click="formRef.form.resetFields()"
          >
            {{ $t('common.label.reset') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/assets/login.css"></style>

<style scoped>
:deep(.el-menu--horizontal) {
  border-bottom: none !important;
}
:deep(.el-menu--horizontal > .el-menu-item) {
  border-bottom: none !important;
}
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  border-bottom: none !important;
}
</style>
