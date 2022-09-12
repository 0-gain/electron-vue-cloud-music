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

Vue.filter("toDate", function (val, format) {
  return moment(val).format(format || "YYYY-MM-DD");
});

Vue.filter("timeStrFormat", function (val, format) {
  return moment(val).format(format || "HH:mm");
});

// 秒和毫秒
Vue.filter("time", function (val, format) {
  return moment(val).format(format || "mm:ss");
});

// 处理index
Vue.filter("indexFormat", function (val) {
  let index = val + 1;
  if (index < 10) {
    return "0" + index;
  }
  return index
});

// 处理最近播放时间
Vue.filter('playTimeFormat',function(val){
  // 获取当前的时间戳
  let time = new Date().getTime()

  let res = time - val
  console.log(moment(res).format('HH:mm:ss'))

  return val
})
