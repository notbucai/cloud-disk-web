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
          <van-button
            v-if="item.type === 2"
            square
            type="info"
            text="重命名"
            @click="handleRenameShow(item)"
            style="height:100%"
          />
          <van-button
            square
            type="danger"
            text="删除"
            @click="handleDelete(item)"
            style="height:100%"
          />
        </template>
      </van-swipe-cell>
    </template>
    <!-- 创建目录 -->
    <van-dialog
      v-model="isshow"
      @confirm="handleRename"
      @cancel="handleClose"
      :before-close="(action, done) => done()"
      show-cancel-button
    >
      <div class="create">
        <van-panel>
          <van-field label="目录名" v-model="value" required clearable placeholder="请输入目录名" />
        </van-panel>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    objs: Array
  },
  data() {
    return {
      current: {},
      isshow: false,
      value: ""
    };
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
    },
    handleClose() {
      this.current = {};
      this.isshow = false;
      this.value = "";
    },
    handleRenameShow(obj) {
      this.current = obj;
      this.isshow = true;
      this.value = obj.key_x;
    },
    async handleRename() {
      const { data } = await this.$service.cos.rename({
        path: this.current.Key,
        name: this.value
      });
      if (data.code === 0) {
        this.$notify({
          background: "#1989fa",
          message: data.message
        });
        this.$emit("update");
      } else {
        this.$notify(data.message);
      }
    },
    handleDelete(obj) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "删除后不可恢复"
        })
        .then(async () => {
          const { data } = await this.$service.cos.delete({
            objs: [{ Key: obj.Key }]
          });
          if (data.code === 0) {
            this.$notify({
              background: "#1989fa",
              message: data.message
            });
            this.$emit("update");
          } else {
            this.$notify(data.message);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list{
  min-height: 500px;
}
</style>
