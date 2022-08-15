<template>
  <div class="mv-wrapper">
    <MvItem
      :mvData="newMvData"
      :mvSort="areaSort"
      @changeSort="changeArea"
      :isShowTags="true"
      :hidden="6"
      @changeRoute="goMvDetail"
    >
      <template v-slot:title>
        <h4 @click="goMvSort({ order: '最新' })">
          最新MV
          <i class="el-icon-arrow-right"></i>
        </h4>
      </template>
    </MvItem>
    <MvItem :mvData="mvAllData" :hidden="6" @changeRoute="goMvDetail">
      <template v-slot:title>
        <h4 @click="goMvSort({ order: '最热' })">
          热播MV
          <i class="el-icon-arrow-right"></i>
        </h4>
      </template>
    </MvItem>
    <MvItem
      :mvData="exclusiveMvData"
      :isShowArtistName="false"
      :hidden="6"
      @changeRoute="goMvDetail"
    >
      <template v-slot:title>
        <h4 @click="goMvSort({ type: '网易出品' })">
          网易出品
          <i class="el-icon-arrow-right"></i>
        </h4>
      </template>
    </MvItem>

    <!-- mv排行榜 -->

    <MvRankItem :areaSort="areaSort" :topMvData="topMvData" @changeSort="changeSort" @@changeRoute="goMvDetail">
      <template v-slot:title>
        <h4 @click="goMvRank">
          MV排行榜
          <i class="el-icon-arrow-right"></i>
        </h4>
      </template>
    </MvRankItem>
  </div>
</template>

<script>
import MvRankItem from "@/components/Mv-rank-item";
import categoryNav from "@/components/categoryNav";
import MvItem from "@/components/Mv-Item";
export default {
  name: "MVIndex",
  data() {
    return {
      // 最新mv分类
      areaSort: [
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "日本" },
        { name: "韩国" },
      ],
      //   最新mv数据
      newMvData: [],
      //   网易出品
      exclusiveMvData: [],
      //   全部mv数据
      mvAllData: [],
      // 排行榜mv数据
      topMvData: [],
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      this.getNewMv();
      this.getMvExclusive();
      this.getMvAll();
      this.getTopMv();
    },

    // * 获取最新mv
    async getNewMv(area, limit) {
      const result = await this.$API.mv.reqNewMv(area, limit);
      if (result.code === 200) {
        this.newMvData = result.data;
      }
    },

    // * 网易出品mv
    async getMvExclusive(limit) {
      const result = await this.$API.mv.reqMvExclusive(limit);
      if (result.code === 200) {
        this.exclusiveMvData = result.data;
      }
    },

    // * 全部mv
    async getMvAll(area, order, type, limit, offset) {
      const result = await this.$API.mv.reqMvAll(
        area,
        order,
        type,
        limit,
        offset
      );
      if (result.code === 200) {
        this.mvAllData = result.data;
      }
    },

    // * 获取mv排行
    async getTopMv(area, limit, offset) {
      const result = await this.$API.mv.reqTopMv(area, limit, offset);
      if (result.code === 200) {
        this.topMvData = result.data;
      }
    },

    // 更改area的回调
    changeArea(area) {
      console.log(area);
      this.area = area;
      this.getNewMv(this.area);
    },

    // 跳转至mv详情页
    goMvDetail({id}) {
      this.$router.push({ path: "/mvDetail", query: { id,type:'MV' } });
    },

    // 跳转至mv种类页
    goMvSort(sortObj) {
      this.$router.push({
        path: "/video/mvSort",
        query: { sortObj, area: this.area },
      });
      console.log(sortObj);
    },

    // 跳转至mv排行页
    goMvRank() {
      this.$router.push({ path: "/video/mvRank" });
    },

    changeSort(area){
      this.getTopMv(area)
    }
  },
  components: { MvItem, categoryNav, MvRankItem },
};
</script>

<style lang="less" scoped>
.mv-wrapper {
  width: 100%;
}
h4 {
  float: left;
  margin: 0;
}
/deep/.tags {
  li {
    padding: 2px 9px;
    border-radius: 50px;
    color: #909399;
    cursor: pointer;
    &:not(.currentTag):hover {
      color: #333;
    }
  }
  .currentTag {
    background-color: #fef3f4;
    color: rgb(236, 65, 65);
  }
}
</style>
