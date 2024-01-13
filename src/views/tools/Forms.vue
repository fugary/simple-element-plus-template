<script setup>
import { computed, ref } from 'vue'
import { useCityAutocompleteConfig, useCitySelectPageConfig } from '@/services/city/CityService'
import { $i18nMsg } from '@/messages'
import { ElMessage } from 'element-plus'

const defaultCity = ref({})

setTimeout(() => {
  defaultCity.value = {
    code: 'SHA',
    nameCn: '上海',
    nameEn: 'Shanghai'
  }
}, 1000)

/**
 * @type {[CommonFormOption]}
 */
const formOptions = computed(() => {
  return [{
    label: '用户名',
    prop: 'userName',
    value: '',
    placeholder: '请输入用户名',
    required: true,
    rules: [
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间'
      }
    ]
  }, {
    label: '密码',
    prop: 'userPassword',
    value: '',
    placeholder: '请输入密码',
    required: true,
    pattern: /.{2,6}/,
    attrs: {
      showPassword: true
    }
  }, {
    label: '出生日期',
    type: 'date-picker',
    prop: 'birthday',
    value: '',
    placeholder: '选择出生日期',
    required: true
  }, {
    label: '兴趣爱好',
    type: 'checkbox-group',
    prop: 'hobby',
    value: '',
    required: true,
    children: [
      {
        label: '编程',
        value: 'program'
      },
      {
        label: '吃饭',
        value: 'eat'
      },
      {
        label: '睡觉',
        value: 'sleep'
      }
    ]
  }, {
    label: '职业',
    type: 'select',
    prop: 'career',
    value: '',
    required: true,
    children: [
      {
        label: '程序员',
        value: 'programer'
      },
      {
        label: '无业游民',
        value: 'none'
      },
      {
        label: '教师',
        value: 'teacher'
      }
    ]
  }, {
    label: '性别',
    type: 'radio-group',
    prop: 'gender',
    value: '',
    required: true,
    children: [
      {
        label: '男',
        value: 'male'
      },
      {
        label: '女',
        value: 'female'
      },
      {
        label: '保密',
        value: 'unknown'
      }
    ]
  }, {
    label: '图标',
    prop: 'icon',
    value: '',
    type: 'common-icon-select',
    required: true
  }, {
    label: '城市',
    prop: 'city',
    value: defaultCity.value?.code,
    type: 'common-autocomplete',
    required: true,
    placeholder: '请选择城市',
    change: (city) => {
      defaultCity.value = city
    },
    attrs: {
      defaultLabel: $i18nMsg(defaultCity.value?.nameCn, defaultCity.value?.nameEn),
      autocompleteConfig: useCityAutocompleteConfig(),
      selectPageConfig: useCitySelectPageConfig()
    }
  }, {
    label: '城市1',
    prop: 'city1',
    value: defaultCity,
    type: 'common-autocomplete',
    required: true,
    placeholder: '请选择城市1',
    attrs: {
      useIdModel: false,
      autocompleteConfig: useCityAutocompleteConfig(),
      selectPageConfig: useCitySelectPageConfig()
    }
  }, {
    label: '地址',
    prop: 'address',
    value: '',
    attrs: {
      type: 'textarea'
    }
  }]
})
const userDto = ref({
  contacts: [{
    name: 'Jerry',
    phone: '1234567890'
  }]
})
/**
 * @type {CommonFormOption[]}
 */
const contactsOptions = ref([{
  label: '联系人姓名',
  prop: 'name',
  required: true
}, {
  label: '联系电话',
  prop: 'phone',
  required: true
}])

const addContact = () => {
  if (userDto.value.contacts.length < 3) {
    userDto.value.contacts.push({})
  } else {
    ElMessage.error('联系人不能超过3个')
  }
}

const deleteContact = idx => {
  userDto.value.contacts.splice(idx, 1)
}

const submitForm = (form) => {
  console.info(form)
  form.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div>
    <common-form
      :model="userDto"
      :options="formOptions"
      label-width="120px"
      @submit-form="submitForm"
    >
      <template #default>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="addContact"
          >
            添加联系人
          </el-button>
        </el-form-item>
        <div
          v-for="(contact, index) in userDto.contacts"
          :key="index"
          class="common-subform el-form--inline"
        >
          <common-form-control
            v-for="(option, optIdx) in contactsOptions"
            :key="`${index}-${optIdx}`"
            :model="contact"
            :option="option"
            :prop="`contacts.${index}.${option.prop}`"
          />
          <el-form-item>
            <el-button
              type="danger"
              size="small"
              @click.prevent="deleteContact(index)"
            >
              Delete
            </el-button>
          </el-form-item>
        </div>
      </template>
      <template
        #buttons="{form}"
      >
        <el-button @click="form.resetFields()">
          重置
        </el-button>
      </template>
    </common-form>
    <div>
      {{ userDto }}
    </div>
  </div>
</template>

<style scoped>

</style>
