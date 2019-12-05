// pages/update/update.js
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
    let page = this
    wx.request({
      url: getApp().globalData.local_host + `/api/v1/plants/${options.id}`,
      method: 'GET',
      success(res) {
        console.log("result on update", res)
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

  formSubmit: function (event) {
    
    let page = this;

    console.log('page data', page.data)
    let plant = {};
    const plantId = page.data.plant.id
    const user_id = getApp().globalData.userId
    plant.user_id = user_id
    plant.nickname = event.detail.value.nickname
    plant.image = page.data.plant.image
    plant.water_frequency = page.data.plant.water_frequency
    plant.plant_library_id = page.data.plant.plant_library_id
    plant.description = event.detail.value.description
    plant.name = page.data.plant.name
    

    wx.showModal({
      title: 'This will edit your baby',
      content: 'Are you sure?',
      confirmText: "Edit!",
      showCancel: true,
      success: function (res) {
        wx.request({
          url: getApp().globalData.local_host + `/api/v1/users/1/plants/${plantId}`,
          method: 'put',
          data: plant,
          success(result) {
            wx.reLaunch({
              url: `/pages/myplant/myplant?id=${plantId}`
            })
          }
        });
      }
    })
  }
})