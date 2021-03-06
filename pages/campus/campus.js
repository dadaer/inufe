var app = getApp();
Page({
  data: {
    tsgData: {
      books_num: app.cache.zdkj,
      books_appt: app.cache.zdyy,
      entrust: app.cache.zdwt,
      book_current_list: [],
      book_history_list: [],
    },
    active: {
      'type': 'current',
    },
    lib_login: false,
    'search_book': '',
    showSearchBar: true,
    book_details: []
  },

  onLoad: function (options) {
    var _this = this;
    console.log(app.cache.zdkj);
  },

  onShow: function () {
    var _this = this;
    if (app.cache.lib_bind) {
      _this.setData({
        lib_login: true
      })
    }
    _this.setData({
      'tsgData.books_num': app.cache.zdkj,
      'tsgData.books_appt': app.cache.zdyy,
      'tsgData.entrust': app.cache.zdwt,
    })

    if (app.cache.book_history && app.cache.book_history.length != 0) {
      _this.setData({
        'book_history_list': app.cache.book_history
      })
    } else if (app.cache.book_history && app.cache.book_history.length == 0) {
      _this.setData({
        'book_history_list': []
      })
    } else if (app.cache.password) {
      wx.request({
        url: 'https://dadaer.top:8082/lib/history',
        header: {
          'Cookie': 'JSESSIONID=' + app.cache.libcookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          _this.setData({
              'book_history_list': res.data
            }),
            app.saveCache("book_history", res.data);
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }

    // console.log(book_current_list)
    if (app.cache.book_current && app.cache.book_current.length != 0) {
      _this.setData({
        'book_current_list': app.cache.book_current
      })
    } else if (app.cache.book_current && app.cache.book_current.length == 0) {
      _this.setData({
        'book_current_list': []
      })
    } else if (app.cache.password) {
      wx.request({
        url: 'https://dadaer.top:8082/lib/current',
        header: {
          'Cookie': 'JSESSIONID=' + app.cache.libcookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          _this.setData({
              'book_current_list': res.data
            }),
            app.saveCache("book_current", res.data);
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }

  },


  changeFilter: function (e) {
    console.log(e.target.dataset.type);
    this.setData({
      'active': {
        'type': e.target.dataset.type,
      }
    })
  },

  liblogin: function () {
    wx.request({
      url: 'https://dadaer.top:8082/lib/init',
      data: {},
      header: {
        'Cookie': 'JSESSIONID=' + app.cache.libcookie
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        app.saveCache("libcookie",res.data.extend.cookies)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    }),
    wx.navigateTo({
      url: '/pages/campus/liblogin/liblogin',
    })
  },

  bookInput: function (e) {
    this.setData({
      search_book: e.detail.value
    });
  },

  inputFocus: function (e) {
    this.setData({
      'book_focus': true
    });
  },

  inputBlur: function (e) {
    this.setData({
      'book_focus': false
    })
  },

  submit: function (e) {
    var that = this;
    console.log(this.data.search_book);
    wx.showToast({
      icon: 'loading',
      title: '加载中'
    })
    wx.request({
      url: 'https://dadaer.top:8082/bookDetail',
      data: {
        search_book: this.data.search_book
      },
      header: {
        'Cookie': 'JSESSIONID=' + app.cache.libcookie
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        wx.hideToast();
        that.setData({
          book_details: res.data,
          showSearchBar: false
        })
      },
      fail: function () {
        // fail
        wx.showModal({
          title: '提示',
          content: '检索错误'
        })
      },
      complete: function () {
        // complete
      }
    })
  },

  research: function () {
    this.setData({
      showSearchBar: true
    })
  },
  
  relogin:function(){
      app.removeCache('lib_bind'),
      app.removeCache('book_history'),
      app.removeCache('book_current'),
      app.removeCache('libcookie')
      this.setData({
        lib_login: false
      })
  },

  getHistory: function () {

  },

  getCurrent: function () {

  },

  onPullDownRefresh: function () {
    

  }

})