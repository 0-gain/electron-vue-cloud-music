import Vue from "vue";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

Vue.filter("numberFormat", function (value) {
  let unit = "";
  var k = 10000,
    sizes = ["", "万", "亿", "万亿"],
    i;
  if (value < k) {
    value = value;
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    value = (value / Math.pow(k, i)).toFixed();
    unit = sizes[i];
  }
  return value + unit;
});

Vue.filter("moment", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

// 处理index
Vue.filter("indexFormat", function (val) {
  let index = val + 1;
  if (index < 10) {
    return "0" + index;
  }
  return index;
});

//处理时间
Vue.filter("handlePlayTime", function (val) {
  const now = new Date().getTime();
  const diff = now - val;
  // 获取秒
  const sec = parseInt(diff / 1000);

  // 获取分
  const min = parseInt(sec / 60);
  // 获取小时
  const hour = parseInt(min / 60);
  // 获取天
  const day = parseInt(hour / 24);

  if (sec < 60) {
    return '刚刚';
  } else if (min < 60) {
    return min + "分钟前";
  } else if (hour < 24) {
    return hour + "小时前";
  } else if (day <= 1) {
    return "昨天";
  } else {
    return moment(val).format("YYYY-MM-DD");
  }
});
