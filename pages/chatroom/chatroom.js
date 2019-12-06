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

 


 /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
   const app = getApp()
   let page=this
   let plant_chat={}
   let plant_id = options.plant_id
   let user_id = app.globalData.userId
   plant_chat.user_id=user_id
   plant_chat.plant_id=plant_id
   console.log("page onload")
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_chats`,
      method: 'post',
      data: plant_chat,
      success: function (res) {
        console.log("success", res);
        const plant_chat_id = res.data.id
        page.setData({
          plant_chat_id: plant_chat_id
        })
      }
    
    })
  },

  // water & delay-button function

  waterMe: function () {
    let page = this
    let plant_chat_id=page.data.plant_chat_id
    let usermsg = {}
    page.setData({
      user_msg_watered: "Hey buddy, just watered ya!"
    })
    usermsg.is_user = true
    usermsg.text = page.data.user_msg_watered
    usermsg.plant_chat_id= plant_chat_id
   console.log("msg",usermsg)
    wx.request({
      url:getApp().globalData.host + `/api/v1/plant_chats/${plant_chat_id}/messages`,
      method: 'post',
      data: usermsg,
      success: function (res) {
        console.log("success", res);
        const usermsg_id = res.data.id
        page.setData({
          usermsg_id: usermsg_id
        })
        console.log("usermsg",usermsg_id)
      }
    })

  },

  delayWater: function () {
    let page = this
    let plant_chat_id = page.data.plant_chat_id
    let usermsg = {}

    page.setData({
      user_msg_delay: "Hold on there, I'll water you later"
    })

    usermsg.is_user = true
    usermsg.text = page.data.user_msg_delay
    usermsg.plant_chat_id = plant_chat_id
    console.log("msg", usermsg)
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_chats/${plant_chat_id}/messages`,
      method: 'post',
      data: usermsg,
      success: function (res) {
        console.log("success", res);
        const usermsg_id = res.data.id
        page.setData({
          usermsg_id: usermsg_id
        })
        console.log("usermsg", usermsg_id)
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
    const app = getApp()
    let user_id = app.globalData.userId
    let page = this
    let plant_chat = {}
    plant_chat.user_id = user_id
    //  plant_chat.plant_id=options.dataset.id
    plant_chat.plant_id = 3
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_chats`,
      method: 'post',
      data: plant_chat,
      success: function (res) {
        console.log("success", res);
        const id = res.data.id
        console.log("chatroom-id:", id)
        // wx.reLaunch({
        //   url: `/pages/chatroom/chatroom`,
        // })
      }
    })
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