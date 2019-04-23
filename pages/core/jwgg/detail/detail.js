// pages/core/jwgg/detail/detail.js
var app = getApp();
Page({
  data: {
    title: " ",
    para: []
  },

  onLoad: function (options) {
    var that = this;
    console.log(app.cache.src);
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: 'https://dadaer.top:8082/news/jw_detail',
      data: {
        src: app.cache.src,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        if (res.statusCode == 500) {
          wx.hideLoading();
          wx.showModal({
            title: '操作错误',
            content:'请点击新闻标题文字处',
            showCancel: false,
            confirmText: '返回',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                })
              }
            }
          })
        }
        // console.log(res.data);
        // console.log(res.data.para.length);
        wx.hideLoading();
        let list = [];
        for (let i = 0; i < res.data.para.length; i++) {
          if (res.data.para[i].replace(/(^s*)|(s*$)/g, "").length != 1 &&
            res.data.para[i].replace(/(^s*)|(s*$)/g, "").length != 0) {
            list.push(res.data.para[i]);
          }
        }
        console.log(list);
        that.setData({
            "data.para": list,
            "data.title": res.data.title
          }),
          setTimeout(function () {
            app.removeCache("src");
          }, 100)
      },
      fail: function () {
        // fail
        console.log("错误")

      },
      complete: function () {
        // complete
      }
    })
  },

  onShow: function () {

  },
})