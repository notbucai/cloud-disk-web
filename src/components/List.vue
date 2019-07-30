<template>
  <div class="list">
    <template v-for="item in objs">
      <van-swipe-cell :key="item.Key">
        <van-cell
          @click="handleGo(item)"
          :title="item.key_x"
          :label="$utils.dateParse(item.LastModified)"
          :center="true"
          :key="item.Key"
        >
          <svg
            slot="icon"
            class="icon"
            style="font-size:30px;margin-right:10px;"
            aria-hidden="true"
          >
            <use :xlink:href="$utils.getObjTypeIcon(item.type,item.key_x)" />
          </svg>
        </van-cell>
        <template slot="right">
          <van-button square type="danger" text="删除" style="height:100%" />
        </template>
      </van-swipe-cell>
    </template>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    objs: Array
  },
  data() {
    return {};
  },
  methods: {
    handleGo(obj) {
      if (obj.type === 1) {
        const url = this.$route.query.url
          ? this.$route.query.url + "/" + obj.key_x
          : obj.key_x;
        this.$router.push({ name: "objs", query: { url } });
      } else {
        this.$router.push({ name: "obj", query: { url: obj.Key } });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
