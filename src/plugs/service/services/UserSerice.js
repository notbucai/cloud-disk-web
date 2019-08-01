import BaseSerice from './BaseSerice';

export default class UserSerice extends BaseSerice {
  async login(data) {
    return await this.post(this.API.user.login, data);
  }
  async reg(data) {
    return await this.post(this.API.user.reg, data);
  }
  async user() {
    return await this.post(this.API.user.user);
  }
  async repwd(data) {
    return await this.post(this.API.user.repwd, data);
  }
  async code(phone) {
    return await this.get(this.API.user.code + `?phone=${phone}`);
  }
}