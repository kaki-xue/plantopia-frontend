// pages/chatroom/chatroom.js

Page({


  /**
   * Page initial data
   */
  data: {

  user_msg_watered: "",
  user_msg_delay: "",
  plant_msg_hi:"Hey ya :)"
  },

 
// water & delay-button function

  waterMe: function () {
    let page = this

    let msg={}
    page.setData({
      user_msg_watered: "Hey buddy, just watered ya!"
    })
    msg.is_user=true
    msg.text="Hey buddy, just watered ya!"
    // msg.plant_chat_id=?

    
  },

  delayWater: function () {
    let page = this
    page.setData({
      user_msg_delay: "Hold on there, I'll water you later"
    })
  },


 /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const app = getApp()
   let user_id = app.globalData.userId
   let page=this
   let plant_chat={}
  //  plant_chat.user_id=user_id
  // //  plant_chat.plant_id=options.dataset.id
  // plant_chat.plant_id=3

  //   wx.request({
  //     url: 'http:localhost:3000/api/v1/plant_chats',
  //     method: 'post',
  //     data: plant_chat,
  //     success: function (res) {
  //       console.log("success", res);
  //       const id = res.data.id
  //       wx.reLaunch({
  //         url: `/pages/chatroom/chatroom`,
  //       })
  //     }
  //   })
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