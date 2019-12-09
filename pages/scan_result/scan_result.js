// pages/scan_result/scan_result.js
const app = getApp()
const AV = require('../../utils/av-weapp-min.js');
  /**

  
   * Page initial data
   */

Page({
  data: {
   scanname:"",
   scanimage:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this;

  },

  // scan-step-1-take a photo

takePhoto: function () {

  let page = this;
  
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
              const scanname=res.data.Result[0].LatinName;

              page.setData({
                scanname: res.data.Result[0].LatinName,
                scanimage: res.data.Result[0].ImageUrl
              });
             
             wx.request({
               url: getApp().globalData.host + `/api/v1/plant_libraries?latin_name=${scanname}`,
               method: "get",
               success: function (res) {
                 console.log("res-----getback", res)
                 page.setData({
                   id: res.data.plant_libraries[0].id,
                 })

               }

             })



            }
          })

          console.log("strangest thing", page.data)

        }
      });
    }
  })


},

  goToLibrary: function() {
    let page=this
    console.log('page data', page.data)
    wx.navigateTo({
      url: `/pages/show/show?id=${page.data.id}`
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