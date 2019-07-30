<template>
  <div class="search">
    <van-search
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      shape="round"
      show-action
      @search="handleSearch"
      @cancel="$router.back()"
    ></van-search>
    <!-- 搜索记录 -->
    <div class="hint" v-if="!isShow">
      <div class="title">
        <van-cell title="搜索记录">
          <van-icon slot="right-icon" name="delete" style="line-height: inherit;" />
        </van-cell>
      </div>
      <div>
        <van-tag v-for="item in history" :key="item" @click="handleSearch(item)" plain round>{{item}}</van-tag>
      </div>
    </div>
    <!-- 结果展示 -->
    <div class="result" v-else>
      <div class="title">
        <van-cell :title="`包含 ${searchVal} 的文件( ${searchResult.length} )`" />
      </div>
      <div>
        <div class="loading" v-if="isloading">
          <van-loading color="#1989fa" />
        </div>
        <List v-else :objs="searchResult" />
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/List.vue";

export default {
  name: "search",
  data() {
    return {
      isShow: false,
      searchVal: "",
      searchResult: [],
      history: [],
      isloading: false,
      obj: {
        ...JSON.parse(
          `{"Url":"","header":{"content-type":"image/png","content-length":"0","connection":"keep-alive","date":"Thu, 25 Jul 2019 08:14:59 GMT","etag":"a72a21e77fe61dd929c77c48355c43b0","last-modified":"Tue, 23 Jul 2019 09:14:18 GMT","server":"tencent-cos","x-cos-request-id":"NWQzOTY1MDNfNjBhYTk0MGFfMjNlOF84MzI4ZjI="}}`
        )
      }
    };
  },
  components: { List },
  computed: {},
  created() {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    this.history = history;
  },
  mounted() {},
  watch: {
    searchVal() {
      if (this.isShow) {
        this.isShow = false;
      }
    },
    history() {
      localStorage.setItem(
        "history",
        JSON.stringify(Array.from(new Set(this.history)))
      );
    }
  },
  methods: {
    handleSearch(val) {
      if (val) {
        this.searchVal = val;
      }
      this.history.push(this.searchVal);
      this.history = Array.from(new Set(this.history));
      setTimeout(() => {
        this.isShow = true;
      }, 0);
    },
  }
};
</script>

<style lang="scss" scoped>
.search .van-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.loading {
  text-align: center;
}
</style>