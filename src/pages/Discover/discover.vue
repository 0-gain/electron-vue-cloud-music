<template>
  <div class="discoverWrap clearfix" ref="discoverContent">
    <home-nav @clickBarItem="clickBarItem" :navBarData="navBarData" />
    <div class="discover-content">
      <keep-alive>
        <router-view class="discover-router"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav";
export default {
  name: "Discover",
  data() {
    return {
      navBarData: [
        { name: "个性推荐", path: "/discover/recommend" },
        { name: "歌单", path: "/discover/musicList" },
        { name: "排行榜", path: "/discover/rank" },
        { name: "歌手", path: "/discover/singer" },
        { name: "最新音乐", path: "/discover/newMusic" },
      ],
      isShowNav: true, //是否显示导航
    };
  },

  mounted() {
    this.$bus.$on("scrollTop", this.changeScroll);
  },
  methods: {
    // nav数据
    clickBarItem({path}) {
      this.$router.push(path);
    },

    // 全局事件总线，滚动顶部
    changeScroll(scroll) {
      this.$refs.discoverContent.scrollTo({
        top:scroll,
        behavior:'smooth'
      })
    },
  },
  components: {
    HomeNav,
  },
};
</script>

<style scoped>
.discoverWrap {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  margin-top: 120px;
  overflow-y: scroll;
  height: calc(100vh - 190px);
}
.discover-content {
  width: calc(75vw);
}
</style>
