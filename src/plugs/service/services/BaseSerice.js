import axios from '../axios';
import qs from 'querystring';
import * as API from '../apiList';

export default class {
  constructor() {
    this.API = API;
    this.axios = axios;
  }
  post(url, data = {}, isForm = false) {
    // 如果是表单数据就处理一下
    isForm && (data = qs.stringify(data))
    return this.axios({
      method: "POST",
      url,
      data,
    });
  }
  get(url) {
    return this.axios({
      method: "GET",
      url,
    });
  }
}