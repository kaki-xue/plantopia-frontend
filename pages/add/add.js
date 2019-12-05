// pages/add/add.js

const app = getApp()

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * Page initial data
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 11, 11],
    startDate: 'Press here',
    timeData: 'Press here'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("global data", getApp().globalData)
    let page = this;
    wx.request({
      url: getApp().globalData.local_host + `/api/v1/plant_libraries/${options.id}`,
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

    plant.name = page.data.plant.name
    plant.water_frequency = page.data.plant.water_freq_avg
    plant.plant_library_id = page.data.plant.id
    plant.user_id = user_id
    plant.image = page.data.plant.image
  

  
  
    wx.request({
      url: getApp().globalData.local_host + `/api/v1/users/${user_id}/plants`,
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