// pages/new/new.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */

  takePhoto: function () {
    let page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        page.setData({
          tempFilePath: tempFilePath
        });
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            const imageUrl = file.url()
            page.setData({
              imageUrl: imageUrl
            });
            console.log('image URL', page.data.imageUrl)
          }
        ).catch(console.error);
      }
    });
    wx.previewImage({
      current: page.imageUrl, // The http link of the current image
      urls: [page.imageUrl] // The http links of the images to preview
    })
  },


  formSubmit: function (event) {
    let page = this;
    let plant = {};
    plant.nickname = event.detail.value.nickname
    plant.description = event.detail.value.description
    const user_id = getApp().globalData.userId
    plant.latin_name = event.detail.value.latin_name
    plant.water_frequency = event.detail.value.water_frequency
    plant.user_id = user_id
    plant.image = page.data.imageUrl




    wx.request({
      url: getApp().globalData.host + `/api/v1/users/${user_id}/plants`,
      method: 'post',
      data: plant,
      success: function (res) {
        console.log("success la", res);
        const id = res.data.id
        wx.reLaunch({
          url: `/pages/myplants/myplants?id=${user_id}`,
        })
      }
    })
  },


  onLoad: function (options) {

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