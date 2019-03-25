const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array(7, 1, 2, 3, 4, 5, 6);
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time =  yearDate+'-'+ month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

function todayInfo(start) {
  var WEEKLEN = 7, // 一周7天为常量
    WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"],
    weekInfo = {"week": null, "day": null}, // 初始化返回信息，默认第null周，星期null
    oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
    weekLeave, // 开学当天所在周剩余天数
    weekStart, // 开学当天start是星期几
    today, // 今天
    dateDiff, // 今天与开学当天日期差
    sDate; //开学之日，日期对象
  var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2013/12/19
  if (!rDateStr.test(start)) {
    alert("请使用合法的开学日期！！！");
    return weekInfo;
  }
  sDate = new Date(start.replace("-", "/"));
  weekStart = sDate.getDay();
  weekStart = weekStart === 0 ? 7 : weekStart; // JS中周日的索引为0，这里转换为7，方便计算
  
  weekLeave = WEEKLEN - weekStart;
  today = new Date();
  weekInfo.day = WEEKDAYS[today.getDay()];
  today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
  dateDiff = today - sDate;
  if (dateDiff < 0) {
    alert("别开玩笑了，你还没开学呢！！！");
    return weekInfo;
  }
  dateDiff = parseInt(dateDiff / oneDay);
  weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
  return weekInfo;
}

module.exports = {
  formatTime: formatTime,
  getDates: getDates,
  todayInfo: todayInfo
}
