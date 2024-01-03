/**
 * @typedef {Object} UserDto
 * @property {number} id
 * @property {string} nameCn
 * @property {string} nameEn
 * @property {string} address
 * @property {string} gender
 * @property {Date} birthday
 */
import { $httpPost } from '@/vendors/axios'

/**
 * 加载用户数据
 * @return {{success:boolean, message:string,userList: [UserDto]}}
 */
export const loadUsersResult = async config => {
  const usersResult = await $httpPost('/api/users', config)
  console.info('==================', usersResult)
  return usersResult
}
