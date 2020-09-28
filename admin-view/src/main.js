import 'mutationobserver-shim'
import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueAxios from 'vue-axios'
import axios from 'axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './plugins/element.js'
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie;
axios.defaults.withCredentials = true

Vue.config.productionTip = false


Vue.use(vueAxios, axios, ElementUI)
Vue.use(mavonEditor)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


