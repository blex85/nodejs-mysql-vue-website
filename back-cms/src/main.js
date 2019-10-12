import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)//让所有vue实例都可以使用axios内的API发送网络请求
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')