// pages/myplants/myplants.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  goToChatroom: function (e) {
    wx.navigateTo({
      url: '/pages/chatroom/chatroom',
    })
  },
  gotTodetail: function (event) {
    wx.navigateTo({
      url: `/pages/myplant/myplant`
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("what's this",options)

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