<template>
  <div class="objs">
    <van-nav-bar
      :title="currentObjs.key_x === objs.key_x ? '全部' : currentObjs.key_x"
      :left-arrow="!!$route.query.url"
      @click-left="onClickLeft"
    >
      <div slot="right">
        <van-button
          plain
          round
          hairline
          type="default"
          size="mini"
          icon="plus"
          @click="createFolder.show = true"
        ></van-button>
        <van-uploader accept="*/*" :after-read="handleUploadFile" :preview-image="false">
          <van-button plain round hairline type="primary" size="mini" icon="upgrade"></van-button>
        </van-uploader>
      </div>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search @click="$router.push('/search')" placeholder="请输入搜索关键词" shape="round" disabled></van-search>
      <List v-if="currentObjs.children" @update="handleUpdate" :objs="currentObjs.children" />
      <div class="info" v-else>
        <svg slot="icon" class="icon" style="font-size:100px;" aria-hidden="true">
          <use xlink:href="#icon-file-s-" />
        </svg>
        <p>暂无文件，赶快上传吧</p>
        <van-uploader accept="*/*" :after-read="handleUploadFile" :preview-image="false">
          <van-button round type="primary" text=" 上传文件 " size="normal" />
        </van-uploader>
      </div>
    </van-pull-refresh>

    <!-- 创建目录 -->
    <van-dialog
      v-model="createFolder.show"
      @confirm="handleCreateFolder"
      @cancel="createFolder.value=''"
      :before-close="(action, done) => action === 'confirm'?done(false):done()"
      show-cancel-button
    >
      <div class="create">
        <van-panel>
          <van-field
            label="目录名"
            v-model="createFolder.value"
            required
            clearable
            placeholder="请输入目录名"
            :error="createFolder.error"
            :error-message="createFolder.errorMsg"
          />
        </van-panel>
      </div>
    </van-dialog>

    <!-- 上传文件 -->
    <van-dialog
      v-model="uploading.show"
      @confirm="handleCreateFolder"
      @cancel="uploading.value=''"
      :before-close="handleUnUploadFile"
      show-cancel-button
      :showConfirmButton="false"
    >
      <div style="text-align: center;padding:6px 16px">
        <p>上传中</p>
        <van-circle
          v-model="uploading.currentRate"
          color="#07c160"
          layer-color="#ebedf0"
          :rate="uploading.currentRate"
          :speed="100"
          :text="uploading.currentRate + '%'"
          :stroke-width="60"
          size="150px"
        />
        <h3>{{uploading.title}}</h3>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import List from "@/components/List.vue";
export default {
  name: "objs",
  created() {
    this.handleUpdate();
  },
  data() {
    return {
      isLoading: false,
      createFolder: {
        show: false,
        value: "",
        errorMsg: "",
        error: false
      },
      uploading: {
        show: false,
        value: "",
        currentRate: 0,
        rate: 100,
        title: "文件名"
      }
    };
  },
  watch: {
    "createFolder.value"() {
      this.createFolder.errorMsg = "";
      this.createFolder.error = false;
    }
  },
  components: { List },
  computed: {
    ...mapState({
      objs: state => state.cos.objs
    }),
    currentObjs() {
      const { $route, objs } = this;
      if (!objs.children) {
        return objs;
      }
      const { url } = $route.query;
      const data = (url || "").split("/").reduce((prve, current) => {
        if (current.length === 0) {
          return prve;
        }
        const currentObj = prve.children.find(item => item.key_x === current);
        if (typeof currentObj === "undefined") {
          return prve;
        }
        return currentObj;
      }, objs);
      return data;
    }
  },
  methods: {
    // 更新
    async handleUpdate() {
      if (this.$store.getters.token) {
        const { data } = await this.$service.cos.allFileAndDir();
        if (data.code === 0) {
          this.$store.dispatch("cos/setAllObjs", data.data);
        }
      }
    },
    // 取消上传文件
    handleUnUploadFile(action, done) {
      // 取消上传文件
      done();
      this.$service.cos.cancel && this.$service.cos.cancel();
      this.uploading.currentRate = 0;
    },
    // 上传文件
    async handleUploadFile(file) {
      // 文件上传
      this.uploading.show = true;
      this.uploading.title = file.file.name;
      const formData = new FormData();
      // EGG bug 传递 顺序问题
      formData.append("path", this.currentObjs.Key);
      formData.append("file", file.file);
      // 发送ajax
      const res = await this.$service.cos.upload(formData, this.handleProgress);
      const { data } = res || {};

      this.uploading.show = false;
      if (data.code === 0) {
        // 登陆成功 显示消息
        this.$notify({ background: "#1989fa", message: data.message });
        this.handleUpdate();
      } else {
        this.$notify(data.message || "未知错误");
      }
    },
    handleProgress(progress) {
      // 目标 / 当前
      const { total, loaded } = progress;

      const currentpProgress = (loaded / total) * 100;
      this.uploading.currentRate = currentpProgress;
    },
    // 创建文件夹
    async handleCreateFolder() {
      const { value } = this.createFolder;
      // TODO 发送 创建目录请求 并更新 所有目录
      // 我觉得可以直接放在vuex action 中
      /* eslint-disable */
      const reg = /^[^\\/:\*\?""<>|]{1,120}$/;
      if (!reg.test(value)) {
        this.createFolder.error = true;
        this.createFolder.errorMsg = "格式错误";
        return;
      }
      // TODO 创建目录
      const { data } = await this.$service.cos.createDir({
        name: value,
        path: this.currentObjs.Key
      });
      if (data.code === 0) {
        // 登陆成功 显示消息
        this.$notify({ background: "#1989fa", message: data.message });
        this.handleUpdate();
        this.createFolder.value = "";
        this.createFolder.show = false;
      } else {
        this.$notify(data.message || "未知错误");
      }
    },
    onClickLeft() {
      let url = this.$route.query.url || "";
      if (url.indexOf("/") !== -1) {
        url = url.replace(/\/([^(/)]+?)$/, "");
      } else {
        url = undefined;
      }

      this.$router.push({ name: "objs", query: { url } });
    },
    async onRefresh() {
      await this.handleUpdate();
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  text-align: center;
  margin-top: 100px;
  p {
    color: #666;
  }
}
</style>


<style lang="scss">
.objs {
  margin-bottom: 60px;
}
.objs /deep/ .van-nav-bar .van-icon {
  color: inherit;
}
</style>