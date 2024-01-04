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
