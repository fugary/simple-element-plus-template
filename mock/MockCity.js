import Mock from 'mockjs'
export default [
  {
    url: '/simple/city/autoCities',
    method: 'post',
    response: request => {
      return {
        success: true,
        message: 'Success',
        resultData: function () {
          let pageSize = 10
          if (request.body.page) {
            pageSize = request.body.page.pageSize || 10
          }
          const total = 99
          const pageCount = parseInt((total + pageSize - 1) / pageSize)
          const result = {
            page: {
              pageSize: function () {
                return pageSize
              },
              pageNumber: function () {
                if (request.body.page) {
                  return request.body.page.pageNumber || 1
                }
                return 1
              },
              pageCount,
              totalCount: total
            }
          }
          let size = 10
          if (request.body.page) {
            size = request.body.page.pageSize
          }
          result['cityList|' + size] = [{
            code: function () {
              return Mock.Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 3)
            },
            nameCn: function () {
              return Mock.Random.city()
            },
            nameEn: function () {
              return 'En' + this.nameCn
            }
          }]
          return Mock.mock(result)
        }
      }
    }
  },
  {
    url: '/simple/city/selectCities',
    method: 'post',
    response: request => {
      return {
        success: true,
        message: 'Success',
        resultData: {
          'cityList|20-70': [{
            code: function () {
              return Mock.Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 3)
            },
            nameCn: function () {
              return Mock.Random.city()
            },
            nameEn: function () {
              return 'En' + this.nameCn
            }
          }]
        }
      }
    }
  }
]
