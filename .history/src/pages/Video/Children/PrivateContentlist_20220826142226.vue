<template>
  <div
    class="private-wrapper"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="title clearfix">
      <h3>独家放送</h3>
    </div>
    <List-Item
      :listData="listData"
      :isShowCounts="false"
      :isShowBoFang="false"
      @changeRoute="changeRoute"
      v-infinite-scroll="load"
      infinite-scroll-immediate="false"
      infinite-scroll-delay="1000"
      :infinite-scroll-disabled="isDisable"
      infinite-scroll-distance="1340"
    />
  </div>
</template>

<script>
import ListItem from "@/components/list-item";
export default {
  name: "PrivateContent",
  data() {
    return {
      // 列表数据
      listData: [],
      // 当前的页数
      page: 1,
      // 是否禁止加载
      isDisable: false,
      // 加载
      loading: true,
    };
  },
  mounted() {
    this.getPrivateContentList();
  },
  methods: {
    // * 获取独家放送列表
    async getPrivateContentList(limit, offset) {
      const result = await this.$API.mv.reqPrivateContentList({
        limit,
        offset,
      });
      if (result.code === 200) {
        this.loading = false;
        // 当数据为空数组
        if (!result.result.length) {
          this.isDisable = true;
        } else {
          this.listData = this.listData.concat(result.result);
        }
      }
    },

    // 跳转到mv详情页
    changeRoute(item) {
      this.$router.push({
        path: "/mvDetail",
        query: { id: item.id, type: "MV" },
      });
    },

    // 无限滚动
    load() {
      this.page++;
      const offset = (this.page - 1) * 60;
      this.getPrivateContentList(60, offset);
    },
  },
  components: { ListItem },
};
</script>

<style lang="less" scoped>
/deep/.list-content .list-item {
  .cover {
    aspect-ratio: 2.5/1;
  }
}
@media only screen and (max-width: 1020px) {
  /deep/.list-content .list-item {
    width: 33.33333%;
  }
}
</style>
