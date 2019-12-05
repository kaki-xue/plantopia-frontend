// pages/myplant/myplant.js
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
    wx.request({
      url: getApp().globalData.local_host + `/api/v1/plants/${options.id}`,
      method: 'GET',
      success(res) {
        
        const plant = res.data;
        page.setData({
          plant: plant
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

  },

  removePlant: function (event) {
    let page = this;
    const plantId = page.data.plant.id;
    const user_id = getApp().globalData.userId

    wx.showModal({
      title: 'This will kill your baby',
      content: 'Are you sure?',
      confirmText: "Kill it!",
      showCancel: true,
      success: function (res) {
        wx.request({
          url: getApp().globalData.local_host + `/api/v1/plants/${plantId}`,
          method: 'DELETE',
          success(result) {
            wx.navigateBack({
              url: `/pages/myplants/myplants?id=${user_id}`
            })
          }
        });
      }
    })
    
    
  }
})