var app = getApp();
Page({
    data: {
        help_status: true,
        CheckCodePath: ''
    },
    onShow: function () {
        this.getCheckCode();
    },
    bind: function () {
        var _this = this;
        wx.showToast({
            title: '绑定中',
            icon: 'loading'
        })
        wx.request({
            method: 'GET',
            url: "https://dadaer.top:8082/lib/number",
            data: {
                stuNum: _this.data.stuNum,
                password: _this.data.password,
                captcha: _this.data.checkCode
            },
            header: {
                'Cookie': 'JSESSIONID=' + app.cache.libcookie
            },
            success: function (res) {
                if (res.data != null && res.data.zdkj) {
                    app.showLoadToast("请稍后");
                    wx.navigateBack({
                        delta: 1, // 回退前 delta(默认为1) 页面
                    })
                    // app.saveCache("stuNum",_this.data.stuNum);
                    app.saveCache("password", _this.data.password);
                    app.saveCache("zdkj", res.data.zdkj);
                    app.saveCache("zdyy", res.data.zdyy);
                    app.saveCache("zdwt", res.data.zdwt);
                    app.saveCache("lib_bind", true)
                } else {
                    // console.log(res.data.extend.wrongMessage);  
                    wx.hideToast();
                    wx.showModal({
                        title: '密码错误，请重试',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                _this.getCheckCode();
                            }
                        }
                    })
                }
            }
        })
    },
    getCheckCode: function () {
        var that = this;
        wx.request({
            url: 'https://dadaer.top:8082/lib/captcha',
            data: {},
            header: {
                'Cookie': 'JSESSIONID=' + app.cache.libcookie
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                setTimeout(function(){
                    wx.getImageInfo({
                        src: 'https://dadaer.top:8082/image?imgUrl=/home/captcha/' + app.cache.libcookie.substring(0,12) + 'captcha.png',
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
        if (e.target.id == 'checkCode') {
            this.setData({
                'checkCode_focus': true
            });
        } else if (e.target.id == 'userid') {
            this.setData({
                'userid_focus': true
            });
        } else if (e.target.id == 'passwd') {
            this.setData({
                'passwd_focus': true
            });
        }
    },
    inputBlur: function (e) {
        if (e.target.id == 'checkCode') {
            this.setData({
                'checkCode_focus': false
            });
        } else if (e.target.id == 'userid') {
            this.setData({
                'userid_focus': false
            });
        } else if (e.target.id == 'passwd') {
            this.setData({
                'passwd_focus': false
            });
        }
    },
    tapHelp: function (e) {
        this.setData({
            help_status:false
        })
    },
    
})