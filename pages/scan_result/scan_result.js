// pages/scan_result/scan_result.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
  /**

  
   * Page initial data
   */

Page({
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  // scan-step-1-take a photo

takePhoto: function () {
  // wx.chooseImage({
  //   count: 1,
  //   sizeType: ['original', 'compressed'],
  //   sourceType: ['album', 'camera'],
  //   success: function (res) {
  //     let tempFilePath = res.tempFilePaths[0];
  //     new AV.File('file-name', {
  //       blob: {
  //         uri: tempFilePath,
  //       },
  //     }).save().then(
  //       file => console.log(file.url())
  //     ).catch(console.error);
  //   }
  // });
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      // console.log("scanpage-res:", res)
      let tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths);
      wx.request({
        url: tempFilePaths[0],
        method: 'GET',
        responseType: 'arraybuffer',
        success: function (res) {
          // let base64 = 'data:image/jpg;base64,' + wx.arrayBufferToBase64(res.data);
          let base64 = wx.arrayBufferToBase64(res.data);
          console.log("base64",base64);

          
          //  getapi info
          wx.request({
            url: 'https://plant.market.alicloudapi.com/plant/recognize2',
            // url: 'http://plantgw.nongbangzhu.cn/plant/recognize2',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "APPCODE 14d38d411096459397a66e56bef71051"
            },
            data: {
              img_base64: base64
            },
            success: function (res) {
              console.log("success", res);
              // const data = res.data
              // console.log("plantapi:", data)
              // page.setData({
              //   plant_chat_id: plant_chat_id
              // })
            },
            fail: function(err){
              console.log(err)
            }
          })
        }
      });
    }
  })

},

// ref https://blog.csdn.net/weixin_41490929/article/details/82890977




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