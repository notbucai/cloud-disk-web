<template>
  <div class="objs">
    <van-nav-bar
      :title="currentObjs.key_x === objs.key_x ? '全部' : currentObjs.key_x"
      :left-arrow="!!$route.query.url"
      @click-left="onClickLeft"
    >
      <div slot="right">
        <van-button plain round hairline type="default" size="mini" icon="plus"></van-button>
        <van-button plain round hairline type="primary" size="mini" icon="upgrade"></van-button>
      </div>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search v-model="searchVal" placeholder="请输入搜索关键词" shape="round"></van-search>
      <template v-for="item in currentObjs.children">
        <van-swipe-cell :key="item.Key">
          <van-cell
            @click="handleGo(item)"
            :title="item.key_x"
            :label="dateParse(item.LastModified)"
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

    <van-dialog v-model="show" show-cancel-button>
      <CreateFolder />
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import suffix from "file-suffix";
import { format } from "date-fns";
import CreateFolder from "./components/CreateFolder.vue";
export default {
  name: "objs",
  data() {
    return {
      searchVal: "",
      isLoading: false,
      currentUrl: "",
      show: true
    };
  },
  components: { CreateFolder },
  computed: {
    ...mapState({
      objs: state => state.cos.objs
    }),
    currentObjs() {
      const { $route, objs } = this;
      const { url } = $route.query;
      const data = (url || "").split("/").reduce((prve, current, index) => {
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
    onClickLeft() {
      let url = this.$route.query.url || "";
      if (url.indexOf("/") !== -1) {
        url = url.replace(/\/([^\/]+?)$/, "");
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
      }
    },
    dateParse(dateStr) {
      const date = new Date(dateStr);
      return format(date, "YYYY-DD-MM HH:mm:ss");
    },
    getObjTypeIcon(type, key) {
      let iconName = "#icon-file-b-2";
      if (type === 2) {
        switch (suffix(key)) {
          case "png":
          case "jpg":
          case "jpeg":
          case "gif":
            iconName = "#icon-file-b-6";
            break;
          case "psd":
            iconName = "#icon-file-b-11";
            break;
          case "zip":
          case "rar":
          case "7z":
            iconName = "#icon-file-b-4";
            break;
          case "pdf":
            iconName = "#icon-file-b-14";
            break;
          case "doc":
          case "docx":
          case "pages":
            iconName = "#icon-file-b-1";
            break;
          case "xls":
          case "xlsx":
            iconName = "#icon-file-b-5";
            break;
          case "ppt":
            iconName = "#icon-file-b-";
            break;
          case "mp4":
            iconName = "#icon-file-b-9";
            break;
          case "mp3":
            iconName = "#icon-file-b-3";
            break;
          case "txt":
            iconName = "#icon-file-b-7";
            break;
          case "html":
            iconName = "#icon-file-b-16";
            break;
          default:
            iconName = "#icon-file-b-8";
            break;
        }
      }

      return iconName;
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