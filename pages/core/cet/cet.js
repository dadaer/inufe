// pages/core/cet/cet.js
var app = getApp();
Page({
  data: {
    cet:[]
  },

  onLoad: function (options) {
    console.log(app.cache.cet)
    var that = this;
    if(app.cache.cet){
      that.setData({
        cet:app.cache.cet
      })
    }else{
    wx.request({
      url: 'https://dadaer.top:8082/management/cet',
      data: {},
      header:{
        'Cookie':'JSESSIONID=' + app.cache.cookie
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        if (res.code == 500){
          wx.showModal({
            title:'提示',
            content:'网络异常,无法获取空教室信息',
            confirmText: '确定',
            showCancel:false
          })
      }else if (res.data.length == 0  || !res.data) {
        wx.showModal({
          title: '提示',
          // showCancel: false,
          content: '与服务器会话已过期或发生网络异常, 无法获取信息,若仍需获取,需重新登录,是否重新登录',
          confirmText: '是',
          cancelText: '否',
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            } 
          }
        })
      }
        that.setData({
          cet:res.data
        });
        app.saveCache('cet', res.data);      
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
  },

  onShow: function () {
    
  }
})