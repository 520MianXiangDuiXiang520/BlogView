import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import ElementUI from 'element-ui';
import vueAxios from 'vue-axios'
import axios from 'axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router.js'
import mavonEditor from 'mavon-editor'
import './plugins/element.js'


Vue.config.productionTip = false

Vue.use(vueAxios, axios, ElementUI)
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
