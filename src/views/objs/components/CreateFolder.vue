<template>
  <div class="create">
    <van-panel title="请输入目录名">
      <van-field v-model="value" placeholder="请输入目录名" />
    </van-panel>
  </div>
</template>

<script>
export default {
  name: "createFolder"
};
</script>
<style lang="scss" scope>
.create {
  height: 200px;
}
</style>