//index.js
//获取应用实例
const app = getApp()

Page({

 
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToShow: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`
    })
  },
  onLoad: function () {

    let page = this;
    wx.request({

      url: "https://plantopia.wogengapp.cn/api/v1/plant_libraries",
      method: 'GET',
      success(res) {
        console.log("hello",res)
        const plant_libraries = res.data.plant_libraries;
        page.setData({
          plant_libraries: plant_libraries
        });

        wx.hideToast();
      }
    });



    // userInfo
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },


  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    let page = this;
    const query = e.detail.value;
    console.log(e.detail.value);

    wx.request({
      url: `https://plantopia.wogengapp.cn/api/v1/plant_libraries?query=${query}`,

      method: "get",
      success: function (res) {
        console.log("res",res)
        page.setData({
          plant_libraries: res.data.plant_libraries,
        })

      }
    })
    // this.setData({
    //   inputVal: e.detail.value
    // });
  }


  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }


})
