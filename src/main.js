import Vue from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store";
import * as API from "./api";
import "./filters";

// 视频插件
import VueCoreVideoPlayer from "vue-core-video-player";

import "./assets/fonts/iconfont.css";
import "./assets/css/base.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";

// 图片懒加载
import VueLazyload from "vue-lazyload";

Vue.use(ElementUI);

Vue.use(VueCoreVideoPlayer, {
  lang: "zh-CN",
});

Vue.use(VueLazyload, {
  loading: require("@/assets/images/lazy.gif"), // 懒加载默认图片
});

Vue.prototype.$scrollTo = (x = 0, y = 0, type = "smooth") => {
  window.scrollTo({
    top: x,
    left: y,
    behavior: type, // 滚动行为：smooth平滑滚动，instant瞬间滚动，默认值auto，等同于instant
  });
};

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
