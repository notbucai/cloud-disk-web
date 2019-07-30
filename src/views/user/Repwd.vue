<template>
  <div class="repwd">
    <van-nav-bar title="修改/找回密码" />
    <van-steps :active="active" active-color="#38f">
      <van-step>获取验证码</van-step>
      <van-step>确认修改</van-step>
    </van-steps>

    <div class="main">
      <van-cell-group>
        <van-field
          v-model="obj.phone"
          maxlength="11"
          required
          center
          clearable
          label="手机号"
          placeholder="请输入手机号"
          @blur="handleFocus('phone')"
          :error-message="fromV.errmsg"
        >
          <van-button
            slot="button"
            size="small"
            type="info"
            :disabled="fromV.codeloading"
            @click="_handleSendCode"
          >{{fromV.codeBtn}}</van-button>
        </van-field>
        <van-field
          v-model="obj.code"
          maxlength="6"
          required
          center
          clearable
          label="验证码"
          placeholder="请输入短信验证码"
        />
      </van-cell-group>
    </div>

    <div class="btn">
      <van-button type="info" size="large" @click="handleNext">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "repwd",
  data() {
    return {
      active: 0,
      fromV: {
        errmsg: "",
        codeBtn: "获取验证码",
        codeloading: false
      },
      obj: {
        phone: "",
        code: ""
      }
    };
  },
  watch: {
    "obj.phone"() {
      this.fromV.errmsg = "";
    }
  },
  computed: {},
  methods: {
    handleFocus(key) {
      this[`handleValidation_${key}`] && this[`handleValidation_${key}`]();
    },
    handleValidation_phone() {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;

      if (!reg.test(this.obj.phone)) {
        this.fromV.errmsg = "手机号格式错误";
        return false;
      }
      return true;
    },
    async _handleSendCode() {
      if (this.fromV.codeloading === true) return;
      if (!this.handleValidation_phone()) return;
      this.fromV.codeloading = true;
      this.fromV.codeBtn = "获取中...";

      // await this.SendCode();
      // TODO 调用api 获取验证码

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
    },
    handleNext() {
      switch (this.active) {
        case 0:
          // 验证码
          if (!this.handleValidation_phone() || !this.obj.code) {
            this.$notify("参数错误");
            return;
          }
          this.active = 1;
          break;

        default:
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.repwd {
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
}
.main {
  margin: 20px 0;
}
.btn {
  padding: 20px;
}
</style>
