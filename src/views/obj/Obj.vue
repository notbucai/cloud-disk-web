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
          @click="handleDelete"
        ></van-button>
      </div>
    </van-nav-bar>
    <div class="info">
      <svg slot="icon" class="icon" style="font-size:120px;" aria-hidden="true">
        <use :xlink:href="$utils.getObjTypeIcon(2,$route.query.url)" />
      </svg>
      <h2>{{$route.query.url.split('/').pop()}}</h2>
      <p>上传时间：{{$utils.dateParse(obj.headers && obj.headers['last-modified'] || "Thu, 25 Jul 2019 08:14:59 GMT")}}</p>
      <p>大小：{{size}}M</p>
      <a :href="obj.Url" target="_blank" class="downloadBtn">下载文件</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "obj",
  async created() {
    const { data } = await this.$service.cos.download({
      path: this.$route.query.url
    });
    if (data.code === 0) {
      this.obj = data.data;
    } else {
      this.$notify(data.message);
    }
  },
  data() {
    return {
      obj: {
        headers: {},
        Url: ""
      }
    };
  },
  computed: {
    size() {
      const _size =
        (this.obj.headers && this.obj.headers["content-length"]) || 0;
      return (_size / 1024 / 1024).toFixed(2);
    }
  },
  methods: {
    handleDelete() {
      this.$dialog
        .alert({
          title: "提示",
          message: "删除后不可恢复"
        })
        .then(async () => {
          const { data } = await this.$service.cos.delete({
            objs: [{ Key: this.$route.query.url }]
          });
          if (data.code === 0) {
            this.$notify({
               background: '#1989fa',
              message:data.message
            });
            this.onClickLeft();
          } else {
            this.$notify(data.message);
          }
        });
    },
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
.downloadBtn {
  background-color: #006eff;
  color: #fff;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 20px;
}
</style>