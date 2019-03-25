// pages/core/classroom/classroom.js
var app = getApp();
Page({
  data: {
      list:[]
  },

  onLoad: function (options) {

  },

  onShow: function () {
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration:3000
        });
        var that = this;
        wx.request({
          url: 'https://dadaer.top:8081/management/classroom',
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
              list:res.data
            })
            wx.showToast();
            app.saveCache('classroom', res.data);
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  },
})