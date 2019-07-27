import Vue from 'vue'
import Router from 'vue-router'
import Objs from './views/objs/Objs.vue'
import Obj from './views/obj/Obj.vue'
import Search from './views/search/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect:'/objs'
    },
    {
      path: '/objs',
      name: 'objs',
      component: Objs
    },
    {
      path: '/obj',
      name: 'obj',
      component: Obj
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
