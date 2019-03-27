// pages/core/classroom/classroom.js
var app = getApp();
Page({
  data: {
    list: []
  },

  onLoad: function (options) {

  },

  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    });
    var that = this;
    wx.request({
      url: 'https://dadaer.top:8081/management/classroom',
      data: {},
      header: {
        'Cookie': 'JSESSIONID=' + app.cache.cookie
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        if (res.code == 500) {
          wx.showModal({
            title: '提示',
            content: '网络异常,无法获取空教室信息',
            confirmText: '确定',
            showCancel: false
          })
        } else if (res.data.length == 0 || !res.data) {
          wx.showModal({
            title: '提示',
            // showCancel: false,
            content: '与服务器会话已过期或发生网络异常, 无法获取空教室信息,若仍需获取,需重新登录,是否重新登录',
            confirmText: '是',
            cancelText: '否',
            success(res) {
              if (res.confirm) {
                wx.clearStorage();
                wx.request({
                  url: 'https://dadaer.top:8081/management/init',
                  success: function (res) {
                    app.saveCache("cookie", res.data.extend.cookies)
                  }
                })
                wx.navigateTo({
                  url: '/pages/mine/login/login',
                })
              } else {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            }
          })
        }
        that.setData({
          list: res.data
        })
        wx.showToast();
        app.saveCache('classroom', res.data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
})