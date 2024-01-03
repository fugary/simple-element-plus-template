/**
 * 默认单页数量
 * @type {number}
 */
export const PAGE_SIZE = 10

/**
 * 默认分页数据
 *
 * @param pageSize
 * @return {{pageIndex: number, pageSize: number, totalCount: number, pageNumber:number}}
 */
export const useDefaultPage = (pageSize = PAGE_SIZE) => {
  return {
    pageSize,
    pageIndex: 1
  }
}