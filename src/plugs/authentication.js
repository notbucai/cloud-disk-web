/**
 * 
 * @param {Router} router 
 * @param {*} store 
 */
function authentication(router, store) {
  router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
      if (store.getters.token) {
        next();
      } else {
        next('/login');
      }
    }else{
      next();
    }
  })
}

export default authentication;