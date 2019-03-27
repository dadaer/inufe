var app = getApp();
Page({
  data: {
    user: {},
  },
  
  onLoad: function(){
    // this.getData();
  },
  // getData: function(){
  //   var _this = this;
  //   var days = ['一','二','三','四','五','六','日'];
  //   _this.setData({
  //     'user': app._user,
  //     'time': {
  //       'term': app._time.term,
  //       'week': app._time.week,
  //       'day': days[app._time.day - 1]
  //     },
  //     'is_bind': !!app._user.is_bind
  //   });
  // }
  onShow:function(){
    var that = this;
    if(app.cache.stuName){
      that.setData({
        userName:app.cache.stuName
      })
    }
},

  changeUser:function(){
    wx.clearStorage();
    wx.request({
      url: 'https://dadaer.top:8081/management/init',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        app.saveCache("cookie",res.data.extend.cookies)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
});

