// pages/core/classroom/classroom.js
var app = getApp();
Page({
  data: {
      list:[]
  },

  onLoad: function (options) {

  },
 
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://dadaer.top:8082/news/ncyw',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        
        that.setData({
          list:res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  getNewsDetail:function(e) {
    // console.log(e.target.dataset.src);
    app.saveCache("src",e.currentTarget.dataset.src);
  }
})