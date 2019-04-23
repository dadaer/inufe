var app = getApp();
Page({
  data:{
    id:'2120172170',
    name:'dadaer',
    year:'2018-2019',
    term:'1',
    cjInfo: {
      data:[]
  }
},
  
  onLoad:function(){
    var that =  this;
    if(app.cache.grade){
      that.setData({
        data:app.cache.grade
      })
    }else{
    wx.request({
      url: 'https://dadaer.top:8082/management/grade',
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
        data:res.data
      }),
      app.saveCache('grade', res.data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
  }
})