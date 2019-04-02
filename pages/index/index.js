var util = require("../../utils/util.js")
var app = getApp();
Page({
  data: {
    imgUrls: [
      {
        id: 'swiper1',
        src: 'https://dadaer.top:8081/image?imgUrl=/home/swiper1.jpg'
      },
      {
        id: 'swiper2',
        src: 'https://dadaer.top:8081/image?imgUrl=/home/swiper2.jpg'
      },
      {
        id: 'swiper3',
        src: 'https://dadaer.top:8081/image?imgUrl=/home/swiper3.jpg'
      } 
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    core: [{
        id: 'course',
        name: '课表查询',
        disabled: false,
        teacher_disabled: false,
        offline_disabled: false
      },
      {
        id: 'grade',
        name: '成绩查询',
        disabled: false,
        teacher_disabled: true,
        offline_disabled: true
      },
      {
        id: 'exam',
        name: '考试安排',
        disabled: false,
        teacher_disabled: true,
        offline_disabled: true
      },
      {
        id: 'cet',
        name: '等级考试',
        disabled: false,
        teacher_disabled: false,
        offline_disabled: true
      },
      {
        id: 'classroom',
        name: '空教室',
        disabled: false,
        teacher_disabled: false,
        offline_disabled: true
      },
      {
        id: 'school-calendar',
        name: '校历',
        disabled: false,
        teacher_disabled: false,
        offline_disabled: true
      },
      {
        id: 'volunteers',
        name: '志愿服务',
        disabled: false,
        teacher_disabled: false,
        offline_disabled: true
      },
      // { id: 'campus-card', name: '校园卡', disabled: false, teacher_disabled: false, offline_disabled: true },
      // {
      //   id: 'lib',
      //   name: '借阅信息',
      //   disabled: false,
      //   teacher_disabled: false,
      //   offline_disabled: true
      // },
      // {
      //   id: 'book-search',
      //   name: '图书检索',
      //   disabled: false,
      //   teacher_disabled: false,
      //   offline_disabled: true
      // },
    ],
    card: {
      course: {
        show: true,
        data: []
      },
      campusCard: {
        data: {
          lasttime: 11.18,
          balance: 60.0,
          today_cost: {
            value: [],
            total: 30
          }
        }
      },
      jw: {
        data: []
      },
      yw:{
        data: []
      },
      fx:{
        data:[]
      }
    },
    currentWeek:''
  },

  onLoad:function(){
    console.log(app.cache.stuNum)
    app.saveCache("version","v1.0.0");
    if(!app.cache.stuNum){
      wx.request({
        url: 'https://dadaer.top:8081/management/init',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(res.data);
          app.saveCache("cookie",res.data.extend.cookies)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      wx.navigateTo({
        url: '/pages/mine/login/login',
      })
    }
    var that = this; 
      wx.request({
        url: 'https://dadaer.top:8081/news/jwgg',
        data: {},
        header:{
          'Cookie':'JSESSIONID=' + app.cache.cookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          let jwList = [{
              'title': res.data[0].title,
              'date': res.data[0].date
            },
            {
              'title': res.data[2].title,
              'date': res.data[2].date
            }
          ]
          that.setData({
            'card.jw.data': jwList
          }),
          app.saveCache("jwgg",res.data)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      }),

      wx.request({
        url: 'https://dadaer.top:8081/news/ncyw',
        data: {},
        header:{
          'Cookie':'JSESSIONID=' + app.cache.cookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          let ywList = [{
              'title': res.data[0].title,
              'date': res.data[0].date
            },
            {
              'title': res.data[1].title,
              'date': res.data[1].date
            }
          ]
          that.setData({
            'card.yw.data': ywList
          }),
          app.saveCache("ncyw",res.data)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      }),

      wx.request({
        url: 'https://dadaer.top:8081/listPassage',
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
            'card.fx.data':res.data[0]
          })
          app.saveCache("fx",res.data[0]);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },

  onShow: function () {
    
    var that = this;
    var length = 0;
    var mydate = util.formatTime(new Date());
    var today = util.getDates(1, mydate)[0].week;
    var todayWeek = util.todayInfo("2019/2/25").week;
    that.setData({
      "currentWeek":todayWeek
    })
    // console.log(todayWeek); 
    // console.log(today);
    if(app.cache.course && app.cache.course.length != 0){
      var courseData = app.cache.course;
      length = courseData.length;
      var courseList = [];
      for (var i = 0; i < length; i++) {
        if (courseData[i] != null) {
          if (courseData[i].courseDay == today 
            && courseData[i].weeks.indexOf(todayWeek) >= 0) {
            courseList.push({
              courseName: courseData[i].courseName,
              courseStart: courseData[i].courseStart,
              courseFinish: courseData[i].courseFinish,
              courseArea: courseData[i].courseArea,
              courseWeek: courseData[i].courseWeek,
              courseTeacher:courseData[i].courseTeacher
            })
          }
        }
      }
      that.setData({
        'card.course.data': courseList
      })
    }else if(app.cache.stuNum){
    wx.request({
        url: 'https://dadaer.top:8081/management/course',
        data: {},
        header:{
          'Cookie':'JSESSIONID=' + app.cache.cookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          // console.log(res.data[0].courseDay);
          if(res.statusCode == 500) {
            wx.showModal({
              title: 'WARNING',
              content: '课表解析异常,请迅速将信息反馈给开发小伙伴哦',
              confirmText: '确定',
              showCancel:false,
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/mine/feedback/feedback',
                  })
                } 
              }
            })
          }
          var list = []
          length = res.data.length;
          app.saveCache("course",res.data);
          for (var i = 0; i < length; i++) {
            if (res.data[i] != null) {
              if (res.data[i].courseDay == today
                && courseData[i].weeks.indexOf(todayWeek) >= 0 ) {
                list.push({
                  courseName: res.data[i].courseName,
                  courseStart: res.data[i].courseStart,
                  courseFinish: res.data[i].courseFinish,
                  courseArea: res.data[i].courseArea,
                  courseWeek: res.data[i].courseWeek,
                  courseTeacher:res.data[i].courseTeacher
                })
              }
            }
          }
          that.setData({
            'card.course.data': list
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
  }
}
})