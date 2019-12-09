// pages/mycollection/mycollection.js
let app = getApp();

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
    let user_id = app.globalData.userId
    let plant_library_id = options.id
    console.log("userId",user_id)
    console.log("plant_lib", plant_library_id)
    wx.request({
      url: getApp().globalData.host + `/users/${user_id}/plant_libraries/${plant_library_id}`,
      method: 'GET',
      success(res) {
        page.setData({
        favorite: res.data.favorite
      })
      }
    })
  },


  

myfav:function(event) {
  const query = event.target.dataset.id
  wx.request({
    url: getApp().globalData.host + `/api/v1/plant_libraries?query=${query}`,
    method: "get",
    success: function (res) {
      console.log("res", res)
      wx.navigateTo({
        url: `/pages/show/show?id=${query}`
      })
    }
  })
},

goTodelete:function(event) {
  let page = this
  const id = event.target.dataset.id
  console.log("delete",id)
  const userId = app.globalData.userId
  console.log("userId",userId)
  wx.request({
    url: getApp().globalData.host + `/users/${userId}/favorites/${id}`,
    method: 'DELETE',
    success(res) {
      console.log("resulteee",res)
      wx.request({
        url: getApp().globalData.host + `/users/${userId}/plant_libraries/${id}`,
        method: 'GET',
        success(res) {
          page.setData({
            favorite: res.data.favorite
          })
        }
      })
 
    }
  })

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
