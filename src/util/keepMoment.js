const moment = require('moment')

moment.locale('zh-cn', {
    meridiem : function (hour, minute, isLowercase) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    },  
  calendar : {
    sameDay: 'ah点:mm',
    nextWeek: '[下周]ah点mm',
    lastDay: '[昨天]ah点:mm',
    sameElse: function() {
      if (Math.abs(this.diff(moment(), 'year')) > 0) {
        return 'YYYY年MM月DD日'
      } else {
        return 'MM月DD日'
      }
    }
}})

moment.locale('zh-cn')

// console.log(moment().subtract(1, 'year').calendar())
// console.log(moment().subtract(100, 'days').calendar())
// console.log(moment().subtract(1, 'days').calendar())
// console.log(moment().calendar())