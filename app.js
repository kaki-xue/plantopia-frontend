//app.js
App({
  onLaunch: function () {
    // const host = 'https://plantopia.wogengapp.cn'
    const host = 'http://localhost:3000'
    console.log('beginning login')
    wx.login({
      success: (res) => {
        console.log(res)
        // insert next code here
        wx.request({
          url: host + '/login',
          method: 'post',
          data: {
            code: res.code
          },
          // insert next code here
          success: (res) => {
            console.log(res)
            this.globalData.userId = res.data.userId

          }
        })

      }
    })
  },
  // const app = getApp()
  //   getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo
  //   })
  // },
  
  globalData: {
    local_host: 'http://localhost:3000',
    dokku_host: 'https://plantopia.wogengapp.cn'
  }
})