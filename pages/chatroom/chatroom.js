// pages/chatroom/chatroom.js

Page({


  /**
   * Page initial data
   */
  data: {
  plant_msg_hi: "Hey ya :)",
  // demand
  plant_msg_often: "Coucou.....Time to water your baby .......!",
  // deman response 1
  user_msg_watered: "Hey buddy, just watered ya!",
  plant_msg_watered: 'Thank you! I am happy! :D',
  // demand response 2
  user_msg_delay: "Hold on there, I'll water you later",
  plant_msg_delay: "ok..dear leader.. somebody's a busy bee. Just make sure to water me later - I'm thirsty!"
},

  // fetch all messages
  fetchMessages: function (e) {
    let page = this
    let plant_chat_id = page.data.plant_chat_id
    wx.request({
      url: getApp().globalData.host + `/api/v1/plant_chats/${plant_chat_id}/messages/`,
      method: 'GET',
      success(res) {
        // check if messages in response have more messages than page data
        // if yes then iterate over the last x
        // with timeout push them into the page data
        const allmsg = res.data.messages;
        console.log('allmsg', allmsg)
        page.setData({
          allmsg
        })
        wx.hideToast();
      }
    });
  },


 /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
   const app = getApp()
   let page=this
   
   let plant_chat={}
   let plant_id = options.plant_id
  //  let user_id = app.globalData.userId
  let user_id = 1
   plant_chat.user_id=user_id
   plant_chat.plant_id=plant_id
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
        page.fetchMessages()
      }
    })
  },


  // water & delay-button function
  waterMe: function () {
    let page = this
    let plant_chat_id = page.data.plant_chat_id
    let usermsg = {}
  
    usermsg.is_user = true
    usermsg.text = page.data.user_msg_watered
    usermsg.plant_chat_id = plant_chat_id
  //  console.log("msg",usermsg)
   
    const msgsArray = page.data.allmsg;
    const lastMsg = msgsArray[msgsArray.length - 1];
   console.log('lastMsg', lastMsg)
    // if it's OK then send post request and create new message
    if (lastMsg.text === page.data.plant_msg_often) {
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
          page.fetchMessages()
        }
      })
    }
      //  if the last message is nil 
      else if (lastMsg == undefined) {
        wx.showModal({
          title: "Baby isn't thirsty!",
          content: "You cannot water the baby!",
          confirmText: "Back",
          confirmColor: '#ff0f0f',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('Hello')
            }
          }
        })
     // if the last msg equals water me later or coocoo 
    } else if (lastMsg.text !== page.data.plant_msg_often && lastMsg !== undefined || lastMsg.text !== page.data.plant_msg_delay && lastMsg !== undefined) {
      wx.showModal({
        title: "Too soon!",
        content: "Wait until baby is thirsty!",
        confirmText: "Back",
        confirmColor: '#ff0f0f',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('Hello')
          }
        }
      })
    }
   },

  delayWater: function () {
    let page = this
    let plant_chat_id = page.data.plant_chat_id
    let usermsg = {}
    usermsg.is_user = true
    usermsg.text = page.data.user_msg_delay
    usermsg.plant_chat_id = plant_chat_id
    console.log("msg", usermsg)

    const msgsArray = page.data.allmsg;
    const lastMsg = msgsArray[msgsArray.length - 1];
    const lastLastLastMsg = msgsArray[msgsArray.length - 3];
    

    // if there is no msg or the last message was not a coo coo
    if (lastMsg == undefined || lastMsg.text !== page.data.plant_msg_often) {
      wx.showModal({
        title: "Wait until baby is thirsty!",
        content: "You don't need to delay now",
        confirmText: "Back",
        confirmColor: '#ff0f0f',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('Hello')
          }
        }
      })   
    } 
    // if the message before the last message, before the last message was a delay message (i.e user:delayed, plant: OK dear leader etc., plant: I'm thirsty)
    if (lastLastLastMsg.text === page.data.plant_msg_delay) {
      wx.showModal({
        title: "Don't keep pushing this off!",
        content: "Feed the baby!",
        confirmText: "Back",
        confirmColor: '#ff0f0f',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('Hello')
          }
        }
      })
    } 
    // if text you are allowed to delay the watering of the plant
    if (lastMsg.text === page.data.plant_msg_often) {
        wx.request({
          url: getApp().globalData.host + `/api/v1/plant_chats/${plant_chat_id}/messages`,
          method: 'post',
          data: usermsg,
          success: function (res) {
            console.log("success 179", res);
            const usermsg_id = res.data.id
            page.setData({
              usermsg_id: usermsg_id
            })
            console.log("usermsg 184", usermsg_id)
            page.fetchMessages()
          }
        })
      }
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
    // const app = getApp()
    // let user_id = app.globalData.userId
    // let page = this
    // let plant_chat = {}
    // plant_chat.user_id = user_id
    // //  plant_chat.plant_id=options.dataset.id
    // plant_chat.plant_id = 3
    // wx.request({
    //   url: getApp().globalData.local_host + `/api/v1/plant_chats`,
    //   method: 'post',
    //   data: plant_chat,
    //   success: function (res) {
    //     console.log("success", res);
    //     const id = res.data.id
    //     console.log("chatroom-id:", id)
    //     // wx.reLaunch({
    //     //   url: `/pages/chatroom/chatroom`,
    //     // })
    //   }
    // })
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