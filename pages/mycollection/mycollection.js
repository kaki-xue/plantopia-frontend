// pages/mycollection/mycollection.js
let app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
  
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;
    let fav = app.globalData
    // page.setData({
    //   favorite: app.globalData.favorite
    // });

    console.log("thispage",fav);
    // const user_id = getApp().globalData.userId
    // console.log("gloabl",user_id)

    // wx.request({
    //   url: getApp().globalData.host + `/api/v1/users/${user_id}/plant_libraries`,
    //   method: 'GET',
    //   success(res) {
    //     const mylikes = res.data.plant_libraries;
    //     console.log('mylikes', mylikes)
    //     page.setData({
    //       mylikes
    //     })
    //   }
    // })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})