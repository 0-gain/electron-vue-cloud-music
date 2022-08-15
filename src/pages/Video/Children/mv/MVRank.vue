<template>
  <div class="mv_rank_wrapper">
    <div class="rank-content">
      <MvRankItem :areaSort="areaSort" :topMvData="mvRankData" @changeSort="changeSort" @changeRoute="changeRoute">
        <template v-slot:title>
          <span class="title">
            最近更新：{{ handleUpdateTime() }} <i class="el-icon-question"></i
          ></span>
        </template>
      </MvRankItem>
    </div>
  </div>
</template>

<script>
import MvRankItem from "@/components/Mv-rank-item";
import categoryNav from "@/components/categoryNav";
export default {
  name: "MVRank",
  data() {
    return {
      // 菜单数据
      areaSort: [
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "日本" },
        { name: "韩国" },
      ],
      //   请求的数量
      limit: 50,
      // 地区
      area: "内地",
      //   更新的时间
      updateTime: "",
      //   排行mv数据
      mvRankData: [],
    };
  },
  mounted() {
    this.getMvRankData(this.area, this.limit);
  },
  methods: {
    // 获取排行榜数据
    async getMvRankData(area, limit) {
      const result = await this.$API.mv.reqTopMv(area, limit);
      if (result.code === 200) {
        this.updateTime = result.updateTime;
        this.mvRankData = result.data;
        this.handleUpdateTime(result.updateTime);
      }
    },

    // 计算时间
    handleUpdateTime(updateTime) {
      // 获取更新的时间
      let date = this.$options.filters.moment(updateTime, "YYYYMMDD");
      // 获取现在的时间
      let nowDate = this.$options.filters.moment(
        new Date().getTime(),
        "YYYYMMDD"
      );

      if (date == nowDate) {
        return "今天";
      } else if (nowDate - date == 1) {
        return "昨天";
      } else {
        return this.$options.filters.moment(updateTime, "YYYY-MM-DD");
      }
    },

    changeSort(area) {
      this.getMvRankData(area,this.limit);
    },
    changeRoute(id){
     this.$router.push({ path: "/mvDetail", query: { id,type:'MV' } });
    }
  },
  components: { categoryNav, MvRankItem },
};
</script>

<style lang="less" scoped>
.title {
  color: #909399;
  font-size: 12px;
  line-height: 35px;
}
/deep/.musicList-navBar {
  margin: 0;
}
</style>
