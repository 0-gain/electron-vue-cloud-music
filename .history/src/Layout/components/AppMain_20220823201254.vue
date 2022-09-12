<template>
  <section class="app-main">
    <!-- <component :is="currentTabComponent"></component> -->
    <!-- exclude: 组件名 -->
    <keep-alive
      :exclude="[
        'PlaylistDetail',
        'SingerDetail',
        'Person',
        'album',
        'MvDetail',
        'SearchList',
      ]"
    >
      <router-view v-if="showRouter"></router-view>
    </keep-alive>
  </section>
</template>

<script>
// import Discover from "@/pages/Discover/discover.vue"
export default {
  name: "AppMain",
  data() {
    return {
      showRouter: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    // 实现刷新
    reload() {
      this.showRouter = false;
      this.$nextTick(() => {
        this.showRouter = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app-main {
  margin-left: 200px;
  margin-top: 60px;
  box-sizing: border-box;
}
</style>
