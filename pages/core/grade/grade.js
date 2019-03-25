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
      url: 'https://dadaer.top:8081/management/grade',
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