// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import global_ from './components/admin/Global';

Vue.prototype.GLOBAL = global_;
Vue.prototype.$ajax = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false;
axios.defaults.withCredentials= true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
