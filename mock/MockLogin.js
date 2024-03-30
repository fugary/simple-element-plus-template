/**
 */
export default [{
  url: '/simple/login',
  method: 'post',
  response: (request) => {
    return {
      success: function () {
        return request.body.userName === 'admin' && request.body.userPassword === '123456'
      },
      message: function () {
        return this.success ? '登录成功' : '用户名或密码错误'
      },
      resultData: function () {
        if (this.success) {
          return {
            account: {
              userNameEN: 'Tom',
              userNameCN: '汤姆',
              gender: 'male',
              email: 'tomcat@fugary.com'
            },
            accessToken: 'abcdefghijklmn'
          }
        } else {
          return null
        }
      }
    }
  }
}]
