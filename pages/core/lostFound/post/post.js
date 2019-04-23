// pages/core/lost&found/post/post.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosedImage:false,
    type:'',
    time:'',
    place:'',
    contactInfo:'',
    title:'',
    content:'',
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
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 3000
    });
    var that = this;
    var data = new Date();
    var time = data.toLocaleString('zh')
    wx.uploadFile({
      url: 'https://dadaer.top:8082/uploadImage',
      filePath:that.data.images,
      name:'file',
      // header: {}, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function(res){
        // success
        console.log(that.data.title)
        wx.request({
          url: 'https://dadaer.top:8082/addLostFoundInfo',
          data: {
            type:that.data.type,
            time:that.data.time,
            place:that.data.place,
            contactInfo:that.data.contactInfo,
            title:that.data.title,
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
  

  radioChange: function (e) {
    this.setData({
      type:e.detail.value
    });
  },

  timeInput: function (e) {
    this.setData({
      time: e.detail.value
    });
  },

  placeInput: function (e) {
    this.setData({
      place: e.detail.value
    });
  },

  contactInfoInput: function (e) {
    this.setData({
      contactInfo: e.detail.value
    });
  },

  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  inputFocus: function (e) {
    if (e.target.id == 'time') {
      this.setData({
        'time_focus': true
      });
    } else if (e.target.id == 'place') {
      this.setData({
        'place_focus': true
      });
    } else if (e.target.id == 'contactInfo') {
      this.setData({
        'contactInfo_focus': true
      });
    } else if (e.target.id == 'title') {
      this.setData({
        'title_focus': true
      });
    } else if (e.target.id == 'content') {
      this.setData({
        'content_focus': true
      });
    }
  },

  inputBlur: function (e) {
    if (e.target.id == 'time') {
      this.setData({
        'time_focus': false
      });
    } else if (e.target.id == 'place') {
      this.setData({
        'place_focus': false
      });
    } else if (e.target.id == 'contactInfo') {
      this.setData({
        'contactInfo_focus': false
      });
    } else if (e.target.id == 'title') {
      this.setData({
        'title_focus': false
      });
    } else if (e.target.id == 'content') {
      this.setData({
        'content_focus': false
      });
    }
  },

})