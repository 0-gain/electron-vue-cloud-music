<template>
  <div id="nav" :class="{ fiexdTop }">
    <div class="navBar">
      <!-- :class="[
          navBarData.length == 1
            ? 'currentItem'
            : currentIndex == index
            ? 'active'
            : '',
        ]" -->
      <div
        class="barItem"
        :class="index == currentIndex ? 'active' : ''"
        v-for="(item, index) in navBarData"
        :key="index"
        @click="clickBarItem(item.path, index)"
      >
        {{ item.name }}
      </div>
    </div>

    <slot class="des" name="count"></slot>
  </div>
</template>

<script>
export default {
  name: "HomeNav",
  props: {
    navBarData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否固定定位
    fiexdTop: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.handleCurrentTab()
  },
  methods: {
    clickBarItem(path, index) {
      if (this.currentIndex == index) return;
      this.currentIndex = index;
      this.$emit("clickBarItem", { path });
    },
    // 当前路由对应得tab选项
    handleCurrentTab() {
      this.navBarData.forEach((item, index) => {
        if (item.path === this.$route.path) this.currentIndex = index;
      });
    },
  },
  watch: {
    // 监听路由
    $route(to, from) {
      this.handleCurrentTab()
    },
  },
};
</script>

<style lang="less" scoped>
#nav {
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: #fff;
  margin: 20px 0;
  .navBar {
    float: left;
    .barItem {
      float: left;
      font-size: 16px;
      margin-right: 25px;
      cursor: pointer;
    }
    .active {
      font-size: 20px;
      font-weight: bold;
      border-bottom: 3px solid red;
    }
    .currentItem {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .des {
    color: @minor-color;
    font-size: 12px;
    float: right;
  }
}
.fiexdTop {
  position: fixed;
  top: 60px;
  left: 225px;
  z-index: 9;
}
</style>
