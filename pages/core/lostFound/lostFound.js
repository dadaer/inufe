// pages/core/lost&found/lost&found.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // list: [],
    // newList:[],
    active: {
      type: "2"
    },
    lostList: [],
    foundList: [],
    lostPageNo: 1,
    foundPageNo: 1,
    lostPages: 1,
    foundPages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var pages = this.data.lostPageNo;
    var that = this;
    that.getInfo(that.data.active.type, pages)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (app.cache.postLost) {
      wx.request({
        url: 'https://dadaer.top:8082/lostfoundinfos?type=2&pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
            lostList:res.data.list,
            lostPageNo:1
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      app.removeCache("postLost")
    } else if ( app.cache.postFound) {
      wx.request({
        url: 'https://dadaer.top:8082/lostfoundinfos?type=1&pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
            foundList:res.data.list,
            foundPageNo:1
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      app.removeCache("postFound")
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.active.type == 1) {
      var foundPageNo = this.data.foundPageNo;
      if (foundPageNo < this.data.foundPages) {
        foundPageNo = foundPageNo + 1;
        this.setData({
          foundPageNo: foundPageNo
        })
        this.getInfo(this.data.active.type, foundPageNo)
      } else {
        console.log("到底了")
      }
    } else if (this.data.active.type == 2) {
      var lostPageNo = this.data.lostPageNo;
      if (lostPageNo < this.data.lostPages) {
        lostPageNo = lostPageNo + 1
        this.setData({
          lostPageNo: lostPageNo
        })
        this.getInfo(this.data.active.type, lostPageNo)
      } else {
        console.log("到底了")
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getInfo: function (type, pageNo) {
    var that = this
    wx.request({
      url: 'https://dadaer.top:8082/lostfoundinfos?type=' + type + "&pageNo=" + pageNo,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        console.log(that.data.active.type)
        if (that.data.active.type == 2) {
          that.setData({
            lostList: that.data.lostList.concat(res.data.list),
            lostPages: res.data.pages
          })
        } else {
          that.setData({
            foundList: that.data.foundList.concat(res.data.list),
            foundPages: res.data.pages
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  getDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    // wx.navigateTo({
    //   url: '/pages/core/lostFound/detail/detail?id=' + e.target.dataset.id,
    // })
    app.saveCache("LostFoundId", e.currentTarget.dataset.id)
    app.saveCache("LostFoundType", e.currentTarget.dataset.type)
  },

  changeFilter: function (e) {
    console.log(e.target.dataset.type)
    var that = this;
    that.setData({
      'active.type': e.target.dataset.type
    })
    if (that.data.active.type == 1) {
      wx.request({
        url: 'https://dadaer.top:8082/lostfoundinfos?type=1&pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
            foundList:res.data.list,
            foundPages: res.data.pages,
            foundPageNo:1
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    } else if (that.data.active.type == 2) {
      wx.request({
        url: 'https://dadaer.top:8082/lostfoundinfos?type=2&pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
            lostList:res.data.list,
            lostPages: res.data.pages,
            lostPageNo:1
          })
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