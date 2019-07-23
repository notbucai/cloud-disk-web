<template>
  <div class="hello">
    <van-button type="default">默认按钮</van-button>
    <van-cell title="单元格" value="内容" label="123" :center="true">
      <i slot="icon" class="iconfont icon-file-s-20" style="font-size:30px;margin-right:10px"></i>
    </van-cell>
    <van-cell title="单元格单元格单元格单元格单元格单元格q23dsadsjhkasd1单元格" label="123" :center="true">
      <i slot="icon" class="iconfont icon-file-s-20" style="font-size:30px;margin-right:10px"></i>
      <van-checkbox name="12" ref="checkboxes" icon-size="16" slot="right-icon" v-model="checked" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      checked: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
