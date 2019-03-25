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
      url: 'https://dadaer.top:8081/management/cet',
      data: {},
      header:{
        'Cookie':'JSESSIONID=' + app.cache.cookie
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
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