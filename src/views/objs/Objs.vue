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
        <van-uploader :after-read="handleUploadFile" :preview-image="false">
          <van-button plain round hairline type="primary" size="mini" icon="upgrade"></van-button>
        </van-uploader>
      </div>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" shape="round"></van-search>
      <template v-for="item in currentObjs.children">
        <van-swipe-cell :key="item.Key">
          <van-cell
            @click="handleGo(item)"
            :title="item.key_x"
            :label="$utils.dateParse(item.LastModified)"
            :center="true"
            :key="item.Key"
          >
            <svg
              slot="icon"
              class="icon"
              style="font-size:30px;margin-right:10px;"
              aria-hidden="true"
            >
              <use :xlink:href="getObjTypeIcon(item.type,item.key_x)" />
            </svg>
          </van-cell>
          <template slot="right">
            <van-button square type="danger" text="删除" style="height:100%" />
          </template>
        </van-swipe-cell>
      </template>
      <div class="info" v-if="!currentObjs.children">
        <svg slot="icon" class="icon" style="font-size:100px;" aria-hidden="true">
          <use xlink:href="#icon-file-s-" />
        </svg>
        <p>暂无文件，赶快上传吧</p>
        <van-button round type="primary" text=" 上传文件 " size="normal" />
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
export default {
  name: "objs",
  data() {
    return {
      searchVal: "",
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
  components: {},
  computed: {
    ...mapState({
      objs: state => state.cos.objs
    }),
    currentObjs() {
      const { $route, objs } = this;
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
  mounted() {},
  methods: {
    // 取消上传文件
    handleUnUploadFile(action, done) {
      // 取消上传文件
      done();
    },
    // 上传文件
    handleUploadFile(file) {
      // 文件上传
      this.uploading.show = true;
      this.uploading.title = file.file.name;
    },
    // 创建文件夹
    handleCreateFolder() {
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

      this.createFolder.show = false;
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
    onRefresh() {},
    handleGo(obj) {
      if (obj.type === 1) {
        const url = this.$route.query.url
          ? this.$route.query.url + "/" + obj.key_x
          : obj.key_x;
        this.$router.push({ name: "objs", query: { url } });
      } else {
        this.$router.push({ name: "obj", query: { url: obj.Key } });
      }
    },
    
    getObjTypeIcon(type, key) {
      return this.$utils.getObjTypeIcon(type, key);
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
.objs /deep/ .van-nav-bar .van-icon {
  color: inherit;
}
</style>