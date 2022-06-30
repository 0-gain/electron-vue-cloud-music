import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store'
import * as API from './api'
import './filters'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$API = API

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
