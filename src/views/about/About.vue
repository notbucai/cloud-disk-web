<template>
  <div class="about">
    <van-nav-bar title="关于我" />
    <div class="username">
      <h1>{{user.username}}</h1>
      <div class="length">
        <van-progress :percentage="this.occupy||0" color="#F44336" />
      </div>
    </div>

    <div class="action">
      <van-cell-group>
        <van-cell title="使用/剩余" :value="`${size}MB/${(user.capacity||0)*1024}MB`" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="修改密码" to="/user/repwd" is-link />
      </van-cell-group>
      <van-cell-group class="quit">
        <van-button @click="quitUser" type="danger" size="large">退出</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "about",
  data() {
    return {};
  },
  async created() {
    const { data } = await this.$service.user.user();
    if (data.code === 0) {
      this.setUser(data.data);
    } else {
      this.$notify(data.message);
    }
  },
  computed: {
    ...mapState({
      user: store => store.user.user,
      objs: store => store.cos.objs
    }),
    size() {
      const c_size = ((this.objs.num || 0) / 1024 / 1024).toFixed();
      return Number(c_size);
    },
    occupy() {
      return Number((this.size / ((this.user.capacity || 0) * 1024) || 0).toFixed(3));
    }
  },
  methods: {
    ...mapActions("user", ["setUser", "handleQuit"]),
    quitUser(){
      this.handleQuit();
      this.$router.push('/login');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.about {
  background-color: #f9f9f9;
  min-height: 100%;
}
.username {
  width: 100%;
  height: 120px;
  background-color: rgb(29, 138, 250);
  color: #fff;
  position: relative;
  margin-bottom: 10px;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    margin-bottom: 16px;
  }
  .length {
    margin-left: 20px;
    margin-bottom: 14px;
    position: absolute;
    bottom: 0;
    width: 90%;
  }
}
.action {
  .van-cell-group {
    margin-bottom: 10px;
  }
  .quit {
    margin: 10px;
  }
}
</style>
