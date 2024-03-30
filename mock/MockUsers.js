import Mock from 'mockjs'
export default [
  {
    url: '/simple/api/users',
    method: 'post',
    response: request => {
      return {
        success: true,
        message: 'Success',
        resultData: function () {
          let pageSize = 10
          if (request.body.page) {
            pageSize = +request.body.page.pageSize || 10
          }
          const total = 999
          const pageCount = (total + pageSize - 1) / pageSize
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
          result['userList|' + size] = [{
            id: '@id',
            'gender|1': ['male', 'female'],
            nameCn: '@cname',
            nameEn: '@name',
            address: function () {
              return Mock.Random.city(true)
            },
            birthday: '@date'
          }]
          return Mock.mock(result)
        }
      }
    }
  }, {
    url: '/simple/api/users/:id',
    method: 'get',
    response: request => {
      return {
        success: true,
        message: 'Success',
        resultData: {
          user: {
            id: function () {
              return request.query.id
            },
            'gender|1': ['male', 'female'],
            nameCn: '@cname',
            nameEn: '@name',
            address: function () {
              return Mock.Random.city(true)
            },
            birthday: '@date'
          }
        }
      }
    }
  }
]
