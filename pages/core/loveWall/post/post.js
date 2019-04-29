// pages/core/loveWall/post/post.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosedImage:false,
    content:'',
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.cache.stuNum) {
      wx.showModal({
        title: '提示',
        // showCancel: false,
        content: '需发布信息请先登录',
        confirmText: '确定',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        }
      })
    }
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

  uploadImage:function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log(res.tempFilePaths)
        that.setData({
          choosedImage:true,
          images:res.tempFilePaths[0]
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

  submit:function() {
    Date.prototype.format = function(fmt) { 
      var o = { 
         "M+" : this.getMonth()+1,                 //月份 
         "d+" : this.getDate(),                    //日 
         "h+" : this.getHours(),                   //小时 
         "m+" : this.getMinutes(),                 //分 
         "s+" : this.getSeconds(),                 //秒 
         "q+" : Math.floor((this.getMonth()+3)/3), //季度 
         "S"  : this.getMilliseconds()             //毫秒 
     }; 
     if(/(y+)/.test(fmt)) {
             fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
     }
      for(var k in o) {
         if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
     return fmt; 
    }
    wx.showToast({
      title: '上传中',
      icon: 'loading'
    });
    var that = this;
    var time = new Date().format("yyyy-MM-dd hh:mm:ss")
    // var date = new Date()
    // var time = date.toLocaleString('zh')
    wx.uploadFile({
      url: 'https://dadaer.top:8082/uploadImage',
      filePath:that.data.images,
      name:'file',
      // header: {}, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function(res){
        // success
        console.log(that.data.title)
        app.saveCache("postLove",true)
        wx.request({
          url: 'https://dadaer.top:8082/addLoveWallInfo',
          data: {
            content:that.data.content,
            imgUrl:res.data,
            postTime:time,
            stuNum:app.cache.stuNum
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          success: function(res){
            // success
            console.log(res.data)
            if(res.data == 1) {
              wx.hideToast();
              wx.showModal({
                title: '提示',
                // showCancel: false,
                content: '上传成功',
                confirmText: '确定',
                showCancel:false,
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1, // 回退前 delta(默认为1) 页面
                    })
                  } 
                }
              })
            } else {
              wx.hideToast();
              wx.showModal({
                title: '提示',
                // showCancel: false,
                content: '上传失败，请稍后重试',
                confirmText: '确定',
                showCancel:false,
                success(res) {
                   
                }
              })
            }
          },
          fail: function() {
            // fail
            wx.showModal({
              title: '提示',
              // showCancel: false,
              content: '图片不可为空',
              confirmText: '确定',
              showCancel:false,
              success(res) {
              }
            })
          },
          complete: function() {
            // complete
          }
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

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  inputFocus: function (e) {
    if (e.target.id == 'content') {
      this.setData({
        'content_focus': true
      });
    } 
  },

  inputBlur: function (e) {
    if (e.target.id == 'content') {
      this.setData({
        'content_focus': false
      });
    } 
  },
})