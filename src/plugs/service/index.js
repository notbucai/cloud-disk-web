import Vue from 'vue';
import UserSerive from './services/UserSerice'
import CosSerice from './services/CosSerice'

class Service {
  constructor() {
    this.user = new UserSerive();
    this.cos = new CosSerice();
  }
}
const service = new Service();

Plugin.install = function (Vue) {
  if(Plugin.install.is){
    return;
  }
  Plugin.install.is = true;
  Object.defineProperty(Vue.prototype, '$service', {
    get() {
      return service;
    }
  });
};

Vue.use(Plugin.install);

export default service;