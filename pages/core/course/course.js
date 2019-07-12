var app = getApp()
var util = require("../../../utils/util.js")
Page({
  data: {
    colorArrays: [ "#4682B4","#20B2AA", "#ADD8E6", "#87CECB", "#008B8B", "#BDB76B", "#20B2AA", "#66CDAA", "#708090", "#87CECB", "#20B2AA", "#ADD8E6","#4682B4", "#008B8B", "#BDB76B", "#20B2AA", "#66CDAA", "#708090", "#FA8072", "#8B4513", "#FF7F50", "#BDB76B", "#20B2AA", "#66CDAA", "#7FFFD4", "#708090", "#20B2AA", "#20B2AA", "#ADD8E6", "#87CECB", "#008B8B"],
    wlist: [],
    show: false,
    opacity: false,
    courseName: '',
    courseTeacher: '',
    courseArea: '',
    courseWeek: '',
    currentWeek: '',
    termCourse:false,
    showWeeks:false,
    choosedWeek:''
  },

  onLoad: function () {
    var that = this;
    var todayWeek = util.todayInfo("2019/7/1").week;
    that.setData({
      currentWeek:todayWeek
    })
    var list = [];
    var length = app.cache.course.length;
    for (let i = 0; i < length; i++) {
      if (app.cache.course[i].weeks.indexOf(todayWeek) >= 0) {
        list.push(app.cache.course[i]);
      }
    }
    if (app.cache.course && app.cache.course.length != 0) {
      that.setData({
        wlist: list
      })
    } else {
      wx.request({
        url: 'https://dadaer.top:8082/management/course',
        data: {},
        header: {
          'Cookie': 'JSESSIONID=' + app.cache.cookie
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res.data);
          that.setData({
            wlist: res.data
          })
          app.saveCache('course', res.data);
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

  onShow:function(){
    this.setData({
      choosedWeek:this.data.currentWeek
    })
  },

  showCourseDetail: function (e) {
    var _this = this;
    var courseN = e.currentTarget.dataset.name;
    var courseT = e.currentTarget.dataset.teacher;
    var courseA = e.currentTarget.dataset.area;
    var courseW = e.currentTarget.dataset.week;
    _this.setData({
      show: true,
      opacity: true,
      courseName: courseN,
      courseTeacher: courseT,
      courseArea: courseA,
      courseWeek: courseW
    })
  },

  hide: function () {
    this.setData({
      show: false,
      opacity: false
    })
  },

  getTermCourse:function(){
    var that = this;
    var todayWeek = util.todayInfo("2019/7/1").week;
    var list = [];
    var length = app.cache.course.length;
    for (let i = 0; i < length; i++) {
      if (app.cache.course[i].weeks.indexOf(todayWeek) >= 0) {
        list.push(app.cache.course[i]);
      }
    }
    that.setData({
      termCourse:!this.data.termCourse
    })
    if(this.data.termCourse){
      that.setData({
        wlist:app.cache.course
      })
    }else{
      that.setData({
        wlist:list
      })
    }
  },

  showWeek:function(){
    this.setData({
      showWeeks:!this.data.showWeeks
    })
    if(this.data.showWeeks == false){
      
    }
  },

  changeWeek:function(e){
    var that = this;
    var todayWeek = e.currentTarget.dataset.id;
    that.setData({
      choosedWeek:todayWeek
    })
    var list = [];
    var length = app.cache.course.length;
    for (let i = 0; i < length; i++) {
      for(let j = 0 ; j < app.cache.course[i].weeks.length; j ++ ){
        if (app.cache.course[i].weeks[j] == todayWeek) {
          list.push(app.cache.course[i]);
        } 
      }
    }
    that.setData({
      wlist:list,
    })
    if(!that.data.showWeeks){

    }
  }

})