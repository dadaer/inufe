// pages/core/lost&found/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    type:'',
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    that.setData({
      type:app.cache.LostFoundType
    })
    wx.request({
      url: 'https://dadaer.top:8082/lostfoundinfo?id=' + app.cache.LostFoundId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // sccess\
        that.setData({
          detail:res.data,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  previewImage:function(e) {
    var detail = this.data.detail;
    var images = [];
    images.push('https://dadaer.top:8082/image?imgUrl=' + detail.imgUrl)
      wx.previewImage({
        current:'https://dadaer.top:8082/image?imgUrl=' + e.target.dataset.src,
        urls: images // 需要预览的图片http链接列表
      })
  }
})