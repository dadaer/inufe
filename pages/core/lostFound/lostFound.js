// pages/core/lost&found/lost&found.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    active:{
      type:"2"
    },
    pageNo:1
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
    var pages = this.data.pageNo;
      var that = this;
      for( var i = 1;i <= pages; i++){
          that.getInfo(that.data.active.type,i)
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
    var pageNo = this.data.pageNo + 1
    this.getInfo(this.data.active.type,pageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getInfo: function (type,pageNo) {
    var that = this
    wx.request({
      url: 'http://localhost:8081/lostfoundinfos?type=' + type + "&pageNo?=" 
      + pageNo,
      data: {
        
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data)
        that.setData({
          list:res.data
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

  getDetail:function (e) {
    console.log(e.target.dataset.id)
    app.saveCache("LostFoundId",e.target.dataset.id)
    app.saveCache("LostFoundType",e.target.dataset.type)
  },

  changeFilter: function (e) {
    console.log(e.target.dataset.type)
    this.setData({
      'active.type':e.target.dataset.type
    })
    this.getInfo(this.data.active.type,this.data.pageNo)
  }
})