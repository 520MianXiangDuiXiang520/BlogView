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
import MarkdownItToc from 'vue-markdown-it-toc'

Vue.config.productionTip = false

Vue.use(vueAxios, axios, ElementUI)
Vue.use(mavonEditor)
Vue.use(MarkdownItToc)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
