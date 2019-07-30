<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" v-if="!$route.meta.noTabbar">
      <van-tabbar-item to="/objs" name="objs" icon="home-o">文件</van-tabbar-item>
      <van-tabbar-item to="/about" name="about" icon="user-o">关于</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  created(){
    this.handleChangeTitle();
    this.active = this.$route.name;
  },
  watch: {
    $route() {
      this.handleChangeTitle();
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    handleChangeTitle() {
      const title = this.$route.meta.title
        ? this.$route.meta.title + " - "
        : "";
      document.title = title + "计协云盘";
    }
  }
};
</script>
<style>
</style>
