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
          <van-icon
            @click="handleClear"
            slot="right-icon"
            name="delete"
            style="line-height: inherit;"
          />
        </van-cell>
      </div>
      <div>
        <van-tag
          v-for="item in history"
          :key="item"
          @click="handleSearch(item)"
          plain
          round
        >{{item}}</van-tag>
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
        <List @update="handleUpdate" v-else :objs="currentList" />
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
      isloading: false
    };
  },
  components: { List },
  computed: {
    currentList() {
       return this.searchResult.filter(item => {
        if (item.type === 2) {
          return item.key_x.indexOf(this.searchVal) !== -1;
        }
        return false;
      });
    }
  },
  created() {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    this.history = history;
    this.handleUpdate();
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
    handleClear() {
      this.history = [];
    },
    // 更新
    async handleUpdate() {
      if (this.$store.getters.token) {
        const { data } = await this.$service.cos.simpleAllFileAndDir();
        this.searchResult = data.data;
      }
    },
    handleSearch(val) {
      if (val) {
        this.searchVal = val;
      }
      if (this.searchVal === "") {
        return;
      }
      this.history.push(this.searchVal);
      this.history = Array.from(new Set(this.history));
      setTimeout(() => {
        this.isShow = true;
      }, 0);
      // TODO 筛选
    }
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