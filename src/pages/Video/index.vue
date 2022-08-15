<template>
  <div class="video-wrapper" :class="{ current: $route.meta.hiddenNav }">
    <home-nav
      @clickBarItem="clickBarItem"
      :navBarData="
        $route.meta.changeNav ? [{ name: $route.meta.name }] : navBarData
      "
      v-if="!$route.meta.hiddenNav"
    />
    <div class="video-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav";
export default {
  name: "Video",
  data() {
    return {
      navBarData: [
        { name: "视频", path: "/video/videoIndex" },
        { name: "MV", path: "/video/mvIndex" },
      ],
    };
  },
  methods: {
    clickBarItem({path}) {
      this.$router.push(path);
    },
  },
  components: { HomeNav },
};
</script>

<style scoped>
.video-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  margin-top: 120px;
  height: calc(100vh - 190px);
}
.current {
  margin: 0;
  height: calc(100vh - 130px);
}
.video-content {
  width: calc(75vw);
  text-align: left;
}
</style>
