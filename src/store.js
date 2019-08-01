import Vue from 'vue'
import Vuex from 'vuex'
import cos from './store/cos'
import user from './store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cos, user
  },
  state: {

  },
  getters: {
    token: state => state.user.token
  },
  mutations: {

  },
  actions: {

  }
})
