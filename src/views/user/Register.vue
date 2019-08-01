<template>
  <div class="wrap">
    <van-nav-bar title="注册" />
    <div class="main">
      <van-cell-group>
        <van-field label="用户名" v-model="objData.username" placeholder="请输入用户名" />
        <van-cell-group>
          <van-field
            v-model="objData.phone"
            maxlength="11"
            center
            clearable
            label="手机号"
            placeholder="请输入手机号"
          >
            <van-button
              slot="button"
              size="small"
              type="info"
              @click="_handleSendCode"
            >{{fromV.codeBtn}}</van-button>
          </van-field>
          <van-field
            v-model="objData.code"
            maxlength="6"
            center
            clearable
            label="验证码"
            type="number"
            placeholder="请输入短信验证码"
          />
        </van-cell-group>
        <van-field label="密码" type="password" v-model="objData.password" placeholder="请输入密码" />
      </van-cell-group>
      <div class="btn">
        <van-button type="info" :loading="isSending" @click="handleSend" size="large">注册</van-button>
      </div>
      <div class="action">
        <router-link to="/login">立刻登陆</router-link>
        <router-link to="/user/repwd">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      objData: {
        username: "",
        password: "",
        phone: "",
        code: ""
      },
      isSending: false,
      fromV: {
        codeBtn: "获取验证码"
      }
    };
  },
  methods: {
    async handleSend() {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.objData.phone)) {
        this.$notify("手机号格式错误");
        return;
      }
      if (
        !this.objData.username ||
        !this.objData.code ||
        !this.objData.password
      ) {
        this.$notify("参数错误,请检查");
        return;
      }
      // TODO 发送请求
      const { data } = await this.$service.user.reg(this.objData);

      if (data.code === 0) {
        // 登陆成功 显示消息
        this.$notify({ background: "#1989fa", message: data.message });
        // 跳转到登陆
        this.$router.push("/login");
      } else {
        this.$notify(data.message);
        return;
      }
    },
    async _handleSendCode() {
      if (this.fromV.codeloading === true) return;
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.objData.phone)) {
        this.$notify("手机号格式错误");
        return;
      }
      this.fromV.codeloading = true;
      this.fromV.codeBtn = "获取中...";

      // await this.SendCode();
      // TODO 调用api 获取验证码
      const { data } = await this.$service.user.code(this.objData.phone);

      if (data.code === 0) {
        // 登陆成功 显示消息
        this.$notify({ background: "#1989fa", message: data.message });
        if (data.data && data.data.code) {
          this.objData.code = data.data.code;
        }
      } else {
        this.$notify(data.message);
        this.fromV.codeloading = false;
        this.fromV.codeBtn = "再来一遍";
        return;
      }

      let codeNum = 60;
      this.fromV.codeBtn = codeNum--;
      const timer = setInterval(() => {
        this.fromV.codeBtn = codeNum--;
        if (codeNum === 0) {
          clearInterval(timer);
          this.fromV.codeBtn = "重新获取";
          this.fromV.codeloading = false;
          return;
        }
      }, 1000);
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
