import Vue from 'vue'
import Router from 'vue-router'
import Objs from './views/objs/Objs.vue'
import Obj from './views/obj/Obj.vue'
import Search from './views/search/Search.vue'
import About from './views/about/About.vue'
import Login from './views/user/Login.vue'
import Register from './views/user/Register.vue'
import Repwd from './views/user/Repwd.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/objs',
      meta: {
        title: "计协云盘"
      }
    },
    {
      path: '/objs',
      name: 'objs',
      component: Objs,
    },
    {
      path: '/obj',
      name: 'obj',
      component: Obj,
      meta: {
        noTabbar: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        title: "搜索",
        noTabbar: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reg',
      component: Register
    },
    {
      path: '/user/repwd',
      component: Repwd
    },
  ]
})
