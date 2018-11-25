import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import store from './store/store.js'
import {setCookie,getCookie,delCookie} from './assets/js/cookie.js'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$cookieStore={setCookie,getCookie,delCookie},
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(router);

// 跳转后返回顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
