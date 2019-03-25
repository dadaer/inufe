// pages/core/exam/exam.js
var app = getApp();
Page({
  data: {
      ks:{
      ksName:'',},
      id:'2120172170',
      name:'姜大朗',
      list:[]
  },
  
  onLoad: function (options) {
    var that = this;
    if(app.cache.exam){
      that.setData({
        list:app.cache.exam
      })
    }else{
    wx.request({
      url: 'https://dadaer.top:8081/management/exam',
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
        }),
        app.saveCache('exam', res.data);
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
   
  },

  // 展示考试详情
  slideDetail: function (e) {
    var id = e.currentTarget.dataset.id,
      list = this.data.list;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }
})