// pages/show/show.js
// import { formatTime } from '../../utils/util.js'

let app = getApp()
Page({
  
  /**
   * Page initial data
   */
  data: {
isFav: false,
  },

  /**
   * Lifecycle function--Called when page load
   */


  // goToFavorite: funtion() {},
  onLoad: function(options) {
    let page = this;
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_libraries/${options.id}`,
      method: 'GET',
      success(res) {
        const plant = res.data;
        page.setData(
          plant
        );

        console.log("plant",plant)
        wx.hideToast();
      }
    });
  },

  goToAdd: function(event) {
    let id = event.currentTarget.dataset.id;
    wx.reLaunch({
      url: `/pages/add/add?id=${id}`,
    })
  },
  goToFav: function(event) {
    let page = this;
    let rosecolor = page.data.isFav;
    this.setData({
      isFav: true 
    })
    let user_id = app.globalData.userId
    let plant_library_id = event.currentTarget.dataset.id
    wx.request({
      url: getApp().globalData.host +`/users/${user_id}/plant_libraries/${plant_library_id}`,
      method: 'POST',
      success(res) {
    
        wx.navigateTo({
          url: `/pages/mycollection/mycollection?id=${plant_library_id}`
        })
      }
    })
   

  
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})