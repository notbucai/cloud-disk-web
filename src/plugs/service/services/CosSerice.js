import BaseSerice from './BaseSerice';
import axios from 'axios';
export default class CosSerice extends BaseSerice {
  constructor() {
    super();
    this.cancel = null;
  }
  // 获取所有文件列表
  async allFileAndDir() {
    return await this.get(this.API.cos.AllFileAndDir);
  }
  // 获取所有文件 未处理的 可用于搜索
  async simpleAllFileAndDir() {
    return await this.get(this.API.cos.SimpleAllFileAndDir);
  }
  // 创建目录
  async createDir(data) {
    return await this.post(this.API.cos.createDir, data);
  }
  // 删除
  async delete(data) {
    return await this.post(this.API.cos.delete, data);
  }
  // 下载
  async download(data) {
    return await this.post(this.API.cos.download, data);
  }
  // 重命名
  async rename(data) {
    return await this.post(this.API.cos.rename, data);
  }
  // 上传
  async upload(data, progressFun) {
    const CancelToken = axios.CancelToken;
    const slef = this;
    return await this.axios({
      method: "POST",
      url: this.API.cos.upload,
      data,
      onUploadProgress: progressFun,
      cancelToken: new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        slef.cancel = c;
      }),
    });
  }
}