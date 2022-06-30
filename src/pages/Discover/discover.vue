<template>
  <div class="main">
    <home-nav  @clickBarItem="clickBarItem" :navBarData = 'navBarData' v-show="isShowNav"/>
    <router-view class="discover-content" :visible.sync="isShowNav"></router-view>
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
        { name: "专属定制", path: "/discover/customize" },
        { name: "歌单", path: "/discover/musicList" },
        { name: "排行榜", path: "/discover/rank" },
        { name: "歌手", path: "/discover/singer" },
        { name: "最新音乐", path: "/discover/newMusic" },
      ],
      isShowNav:true,//是否显示导航
    }
  },
  methods: {
    clickBarItem(path){
      this.$router.push(path)
    },
    visible(val){
      this.isShowNav = val
    }
  },
  mounted() {
    // this.$store.dispatch("discover/getInfo");
  },
  components: {
    HomeNav
  },
};
</script>

<style lang="less" scope>
.main {
  width: 75%;
  margin-left: 3%;
  box-sizing: border-box;
}
</style>
