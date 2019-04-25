// pages/core/loveWall/loveWall.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    images: [],
    listShow: [],
    imagePath: '',
    pageNo: 1,
    pages: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pageNo = that.data.pageNo;
    that.getInfo(pageNo)
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
    if(app.cache.postLove) {
      wx.request({
        url: 'https://dadaer.top:8082/lovewallinfos?pageNo=1',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          that.setData({
            list:res.data.list,
            pageNo:1
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    app.removeCache("postLove")
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
    var pageNo = this.data.pageNo;
    var that = this;
    if (pageNo < that.data.pages) {
      console.log(that.data.pages)
      pageNo = pageNo + 1;
      that.getInfo(pageNo)
      that.setData({
        pageNo: pageNo
      })
    } else {
      console.log("到底了")
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getInfo: function (pageNo) {
    var that = this;
    wx.request({
      url: 'https://dadaer.top:8082/lovewallinfos?pageNo=' + pageNo,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          list: that.data.list.concat(res.data.list),
          pages: res.data.pages
        })
        console.log(that.data.list)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  previewImage: function (e) {
    var list = this.data.list;
    var images = [];
    console.log(list.length)
    for (var i = 0; i < list.length; i++) {
      images.push('https://dadaer.top:8082/image?imgUrl=' + list[i].imgUrl)
    }
    this.setData({
      images: images
    })
    console.log(images)
    wx.previewImage({
      current: 'https://dadaer.top:8082/image?imgUrl=' + e.target.dataset.src,
      urls: this.data.images // 需要预览的图片http链接列表  
    })
  }
})