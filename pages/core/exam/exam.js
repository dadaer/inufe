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
      url: 'https://dadaer.top:8082/management/exam',
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
              wx.clearStorage();
              wx.request({
                url: 'https://dadaer.top:8082/management/init',
                success: function (res) {
                  app.saveCache("cookie", res.data.extend.cookies)
                }
              })
              wx.navigateTo({
                url: '/pages/mine/login/login',
              })
            } 
          }
        })
      }
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