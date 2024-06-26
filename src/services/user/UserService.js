/**
 * @typedef {Object} UserDto
 * @property {number} id
 * @property {string} nameCn
 * @property {string} nameEn
 * @property {string} address
 * @property {string} gender
 * @property {Date} birthday
 */
import { $httpGet, $httpPost } from '@/vendors/axios'
import { $i18nMsg } from '@/messages'

/**
 * 加载用户数据
 * @return {{success:boolean, message:string, resultData: {userList:[UserDto]}}}
 */
export const loadUsersResult = async (data, config) => {
  const usersResult = await $httpPost('/api/users', data, config)
  console.info('==================', usersResult)
  return usersResult
}
/**
 * 加载用户
 * @return {{success:boolean, message:string, resultData: {user:UserDto}}}
 */
export const loadUserResult = async (id, config) => {
  const usersResult = await $httpGet(`/api/users/${id}`, config)
  console.info('==================', usersResult)
  return usersResult
}

/**
 * @return {[CommonFormOption]}
 */
export const useUserFormOptions = () => {
  return [{
    label: '中文名',
    prop: 'nameCn',
    placeholder: '请输入中文名',
    required: true
  }, {
    label: '英文名',
    prop: 'nameEn',
    placeholder: '请输入英文名',
    required: true
  }, {
    label: '出生日期',
    type: 'date-picker',
    prop: 'birthday',
    value: '',
    placeholder: '选择出生日期',
    required: true
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
      }
    ]
  }, {
    label: '地址',
    prop: 'address',
    value: '',
    attrs: {
      type: 'textarea'
    }
  }]
}

/**
 * 用户自动完成配置
 */
export const useUserAutocompleteConfig = () => {
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
    searchMethod ({ page }, cb) {
      loadUsersResult({ page })
        .then(result => {
          const data = {
            page: result.resultData.page,
            items: result.resultData.userList
          }
          cb(data)
        })
    }
  }
}
