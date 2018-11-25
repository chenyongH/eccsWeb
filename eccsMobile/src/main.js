// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import App from './App'
import Api from './api/index.js'
import { LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
import 'lib-flexible/flexible.js'
import router from './router'
import './style/font/iconfont.css'
import Vuex from 'vuex'
import store from './store/store.js';

Vue.use(Vuex)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(require('vue-wechat-title'))
Vue.prototype.$api = Api

// Vue.use(VueRouter)
Vue.use(router)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
