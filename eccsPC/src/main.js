/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router';
import "babel-polyfill";
import Vuex from 'vuex';
import store from './store/store.js';
import {setCookie,getCookie,delCookie} from './assets/js/cookie.js'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$cookieStore={setCookie,getCookie,delCookie},
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(router);

// 跳转后返回顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
  })

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
