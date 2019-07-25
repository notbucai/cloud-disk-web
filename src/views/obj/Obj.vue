<template>
  <div class="objs">
    <van-nav-bar title="详情" :left-arrow="!!$route.query.url" @click-left="onClickLeft">
      <div slot="right">
        <van-button
          plain
          round
          hairline
          type="default"
          size="mini"
          icon="delete"
          @click="createFolder.show = true"
        ></van-button>
      </div>
    </van-nav-bar>
    <div class="info">
      <svg slot="icon" class="icon" style="font-size:120px;" aria-hidden="true">
        <use :xlink:href="$utils.getObjTypeIcon(2,$route.query.url)" />
      </svg>
      <h2>{{$route.query.url.split('/').pop()}}</h2>
      <p>上传时间：{{$utils.dateParse(obj.header['last-modified'])}}</p>
      <p>大小：{{(obj.header['content-length']/1024/1024).toFixed(2)}}M</p>
      <a :href="obj.Url" target="_blank" class="downloadBtn">下载文件</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "objs",
  data() {
    return {
      obj: {
        ...JSON.parse(
          `{"Url":"","header":{"content-type":"image/png","content-length":"0","connection":"keep-alive","date":"Thu, 25 Jul 2019 08:14:59 GMT","etag":"a72a21e77fe61dd929c77c48355c43b0","last-modified":"Tue, 23 Jul 2019 09:14:18 GMT","server":"tencent-cos","x-cos-request-id":"NWQzOTY1MDNfNjBhYTk0MGFfMjNlOF84MzI4ZjI="}}`
        )
      }
    };
  },
  computed: {
  },
  mounted() {},
  methods: {
    onClickLeft() {
      let url = this.$route.query.url || "";
      if (url.indexOf("/") !== -1) {
        url = url.replace(/\/([^\/]+?)$/, "");
      } else {
        url = undefined;
      }
      this.$router.push({ name: "objs", query: { url } });
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  text-align: center;
  margin-top: 80px;
  p {
    color: #888;
    font-size: 14px;
    margin-bottom: 20px;
  }
}
.downloadBtn{
  background-color: #006eff;
  color: #fff;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 20px;
}
</style>