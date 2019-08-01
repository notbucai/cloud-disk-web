<template>
  <div class="wrap">
    <van-nav-bar title="登陆" />
    <div class="main">
      <van-cell-group>
        <van-field label="登陆名" v-model="objData.loginname" placeholder="请输入用户名/手机号" />
        <van-field label="密码" type="password" v-model="objData.password" placeholder="请输入密码" />
      </van-cell-group>
      <div class="btn">
        <van-button type="info" :loading="isSending" @click="handleSend" size="large">登陆</van-button>
      </div>
      <div class="action">
        <router-link to="/reg">立刻注册</router-link>
        <router-link to="/user/repwd">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      objData: {
        loginname: "",
        password: ""
      },
      isSending: false
    };
  },
  methods: {
    async handleSend() {
      if (!this.objData.loginname || !this.objData.password) {
        this.$notify("参数错误");
        return;
      }
      // TODO 发送请求
      const { data } = await this.$service.user.login(this.objData);
      if (data.code === 0) {
        // 登陆成功 显示消息
        this.$notify({ background: "#1989fa", message: data.message });
        // 将 token 保存到vuex
        this.$store.dispatch("user/setToken", data.token);
        // 跳转到首页
        this.$router.push('/');
      } else {
        this.$notify(data.message);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  min-height: 500px;
  background-color: #f9f9f9;
}
.main {
  margin-top: 20px;
}
.btn {
  padding: 20px;
}
.action {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  a {
    color: #2196f3;
  }
}
</style>
