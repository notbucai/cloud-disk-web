import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugs/vant'
import './plugs/utils'
import './plugs/service/index'
import authentication from './plugs/authentication'
import './assets/common/common.css'

authentication(router, store);
console.log("mode=> " + process.env.NODE_ENV);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
