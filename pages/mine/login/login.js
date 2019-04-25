                                            var app = getApp();
Page({
  data: {
    help_status: true,
    CheckCodePath: ''
  },
  onShow: function () {
    var that = this;
    that.getCheckCodeCookie();
    // setTimeout(function(){
    //   wx.getImageInfo({
    //     src: 'http://localhost:8082/image?imgUrl=' + "C:\\Users\\一号公路上的桥断了\\Desktop\\" +app.cache.cookie.substring(0,12) + ".png",      
    //     success: function (res) {
    //       // success
    //       that.setData({
    //         CheckCodePath: res.path
    //       })
    //     },
    //   })
    // },1000)
  },
  bind: function () {
    var _this = this;
    wx.showToast({
      title: '登录中',
      icon: 'loading'
    })
    wx.request({
      method: 'GET',
      url: "https://dadaer.top:8082/management/login",
      data: {
        stuName: _this.data.userName,
        stuNum: _this.data.stuNum,
        password: _this.data.password,
        checkCode: _this.data.checkCode
      },
      header:{
        'Cookie':'JSESSIONID=' + app.cache.cookie
      },      
      success: function (res) {
        if (res.data.code === 200) {
          app.showLoadToast("请稍后");
          app.saveCache("stuNum", _this.data.stuNum);
          app.saveCache("stuName", _this.data.userName);
          wx.switchTab({
            url: '/pages/index/index',
          })
          console.log(res.data);
          // app.saveCache("sessionID", res.data.extend.sessionID);

        } else {
          // console.log(res.data.extend.wrongMessage);  
          wx.hideToast();
          wx.showModal({
            title: '密码或验证码错误，请先退出当前小程序，再重新登陆',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                _this.getCheckCodeCookie();
                // _this.getCheckCode();
              }
            }
          })
        }
      }
    })
  },

  getCheckCodeCookie:function(){
    var that = this;
    wx.request({
      url: 'https://dadaer.top:8082/management/checkCode',
      data: {},
      header:{
        'Cookie':'JSESSIONID=' + app.cache.cookie
      },      
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        setTimeout(function(){
          wx.getImageInfo({
            src: 'https://dadaer.top:8082/image?imgUrl=/home/checkCode/' 
            + app.cache.cookie.substring(0,12) + 'checkCode.png',
            success: function (res) {
              // success
              console.log(res.path)
              that.setData({
                CheckCodePath: res.path
              })
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        },100) 
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },
  useridInput: function (e) {
    this.setData({
      stuNum: e.detail.value
    });
    if (e.detail.value.length >= 10) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  checkcodeInput: function (e) {
    this.setData({
      checkCode: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userName') {
      this.setData({
        'userName_focus': true
      });
    } else if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'checkCode') {
      this.setData({
        'checkCode_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userName') {
      this.setData({
        'userName_focus': false
      });
    } else if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'checkCode') {
      this.setData({
        'checkCode_focus': false
      });
    }
  },

  tapHelp: function () {
    this.setData({
      help_status: false
    })
  },

})