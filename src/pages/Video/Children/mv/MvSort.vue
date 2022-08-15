<template>
  <div class="mv-sort-wrapper">
    <nav>
      <div class="nav-item">
        <categoryNav :hotList="areaSort" :cat="area" @changeCatList="changeArea">
          <!-- 地区 -->
          <template v-slot:headLine>
            <div class="title">地区:</div>
          </template>
        </categoryNav>
      </div>
      <div class="nav-item">
        <categoryNav :hotList="typeSort" :cat="type" @changeCatList="changeType">
          <!-- 类型 -->
          <template v-slot:headLine>
            <div class="title">类型:</div>
          </template>
        </categoryNav>
      </div>
      <div class="nav-item">
        <categoryNav :hotList="orderSort" :cat="order" @changeCatList="changeOrder">
          <!-- 排序 -->
          <template v-slot:headLine>
            <div class="title">排序:</div>
          </template>
        </categoryNav>
      </div>
    </nav>

    <div
      class="mv-content"
      v-infinite-scroll="load"
      infinite-scroll-disabled="isDisable"
      infinite-scroll-immediate="false"
      infinite-scroll-delay="500"
      infinite-scroll-distance="400"
    >
      <MvItem :mvData="MvAllData" @changeRoute="changeRoute" />
    </div>
  </div>
</template>

<script>
import categoryNav from "@/components/categoryNav";
import MvItem from "@/components/Mv-Item";
export default {
  name: "MvSort",
  data() {
    return {
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      // 取出数量
      limit: 30,
      // 当前的页数
      page: 1,
      //   地区数据
      areaSort: [
        { name: "全部" },
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "韩国" },
        { name: "日本" },
      ],
      // 类型数据
      typeSort: [
        { name: "全部" },
        { name: "官方版" },
        { name: "原声" },
        { name: "现场版" },
        { name: "网易出品" },
      ],
      // 排序数据
      orderSort: [{ name: "上升最快" }, { name: "最热" }, { name: "最新" }],
      // mv全部数据
      MvAllData: [],
      // 禁用滚动条
      isDisable: false,
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化
    InitData() {
      this.handleQuery();
      this.getMvAll(this.area,this.order,this.type);
    },

    // 处理下query参数
    handleQuery() {
      let {
        sortObj: { order = "上升最快", type = "全部" },
        area = "全部",
      } = this.$route.query;
      this.area = area;
      this.order = order;
      this.type = type;
    },

    // 获取全部mv
    async getMvAll(area, order, type, limit = 30) {
      let offset = (this.page - 1) * limit;
      const result = await this.$API.mv.reqMvAll(
        area,
        order,
        type,
        limit,
        offset
      );
      if (result.code === 200) {
        this.isDisable = !result.hasMore;
        this.MvAllData = this.MvAllData.concat(result.data);
      }
    },

    // 自定义事件(更改地区)
    changeArea({ tag }) {
      this.page = 1;
      this.area = tag;
      this.MvAllData = [];
      this.getMvAll(this.area, this.order, this.type);
    },

    // 自定义事件(更改类型)
    changeType({ tag }) {
      this.page = 1;

      this.type = tag;
      this.MvAllData = [];

      this.getMvAll(this.area, this.order, this.type);
    },

    // 自定义事件(更改排序)
    changeOrder({ tag }) {
      this.page = 1;

      this.order = tag;
      this.MvAllData = [];
      this.getMvAll(this.area, this.order, this.type);
    },

    // 自定义事件(跳转至mv详情页)
    changeRoute(id) {
      // 更改视频类型状态
      this.$store.commit("video/UPDATE_VIDEO_TYPE", "MV");
      // 跳转至详情页面
      this.$router.push({ path: "/mvDetail", query: { id } });
    },

    // 滚动的回调
    load() {
      this.page += 1;
      const { order, area, type, limit } = this;
      this.getMvAll(area, order, type, limit);
    },
  },
  components: { categoryNav, MvItem },
};
</script>

<style lang="less" scoped>
.mv-sort-wrapper {
  nav {
    .nav-item {
      line-height: 20px;
      .title {
        float: left;
        font-size: 12px;
      }
      /deep/.hotList {
        float: left;
        li {
          line-height: 20px;
          width: 75px;
        }
      }
    }
  }
}
</style>
