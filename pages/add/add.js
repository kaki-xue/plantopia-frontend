// pages/add/add.js

const app = getApp()
const AV = require('../../utils/av-weapp-min.js');


Page({

  /**
   * Page initial data
   */
  data: {
  
        // checkedEmail: false,

  },

  // toggleEmailReminder: function(e) {
  //   let page = this 
  //   let remindervalue=e.detail.value
  //   console.log(remindervalue)
  //  page.setData({
  //    remindervalue:remindervalue
  //  });
  
  // },



  takePhoto: function () {
    let page = this
    console.log(page)
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('options', options)
    let page = this;
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_libraries/${options.id}`,
      method: 'GET',
      success(res) {
        console.log("request on new", res)
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
  onShow: function (options) {
    console.log('options on show', options)

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

  // bindDateChange: function (e) {
  //   const val = e.detail.value
  //   this.setData({
  //     year: this.data.years[val[0]],
  //     month: this.data.months[val[1]],
  //     day: this.data.days[val[2]]
  //   })
  //   console.log('this data for data',)
  // },


  // bindTime: function (e) {
  //   this.setData({
  //     timeData: e.detail.value
  //   })
  //   console.log('this data for time', this.data)
  // },

  formSubmit: function (event) {
    let page = this;
    let plant = {};
    plant.nickname = event.detail.value.nickname
    plant.description = event.detail.value.description
    const user_id = getApp().globalData.userId

    plant.latin_name = page.data.plant.latin_name
    plant.water_frequency = page.data.plant.water_freq_avg
    plant.plant_library_id = page.data.plant.id
    plant.user_id = user_id
    plant.image = page.data.imageUrl
    // plant.reminder = page.data.remindervalue
    console.log("reminderornot", page.data.remindervalue)
  
    console.log(plant)
  
  
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
  }
})