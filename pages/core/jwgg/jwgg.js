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
      url: 'https://dadaer.top:8082/news/jwgg',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        let list = [];
        
        for(let i = 0 ;i < res.data.length;i++){
          if( i%2 == 1){
            list.push(res.data[i]);
          }
        }
        console.log(list);
        that.setData({
          list:list
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
    app.saveCache("src",e.target.dataset.src);
  }
})