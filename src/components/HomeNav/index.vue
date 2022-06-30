<template>
  <div id="nav">
    <div class="navBar">
      <div
        class="barItem"
        :class="{ active: currentId == index }"
        v-for="(item, index) in navBarData"
        :key="index"
        @click="clickBarItem(item.path, index)"
      >
        {{ item.name }}
      </div>
    </div>
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
  },
  data() {
    return {
      currentId: 0,
    };
  },
  methods: {
    clickBarItem(path, index) {
      if (this.currentId == index) {
        return;
      }

      this.currentId = index;
      this.$emit("clickBarItem", path);
    },
  },
};
</script>

<style lang="less" scope>
#nav {
  height: 60px;
  width: 100%;
  .navBar {
    float: left;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    .barItem {
      float: left;
      font-size: 16px;
      margin-right: 25px;
    }
    .active {
      font-size: 20px;
      font-weight: bold;
      border-bottom: 3px solid red;
    }
  }
}
</style>
