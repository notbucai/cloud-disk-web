import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugs/vant'
import './assets/common/common.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
