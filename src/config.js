/**
 * 默认单页数量
 * @type {number}
 */
export const PAGE_SIZE = 10

/**
 * @typedef {Object} CommonPage
 * @property {number} pageSize 单页数量
 * @property {number} pageNumber 当前第几页
 * @property {number} totalCount 总数
 * @property {number} pageCount 总页数
 */

/**
 * 默认分页数据
 *
 * @param pageSize
 * @return {CommonPage}
 */
export const useDefaultPage = (pageSize = PAGE_SIZE) => {
  return {
    pageSize,
    pageNumber: 1
  }
}
