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
    let page = this;
    const user_id = getApp().globalData.userId
    console.log('user id TOM', getApp().globalData.userId)

    wx.request({
      url: getApp().globalData.local_host + `/api/v1/users/${user_id}`,
      method: 'GET',
      success(res) {
        
        const plants = res.data.plants;
        page.setData({
          plants: plants
        });

        wx.hideToast();
      }
    });

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
    let page = this;
    const user_id = getApp().globalData.userId

    wx.request({
      url: getApp().globalData.local_host + `/api/v1/users/${user_id}`,
      method: 'GET',
      success(res) {
        const plants = res.data.plants;
        page.setData({
          plants: plants
        });

        wx.hideToast();
      }
    });
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