<template>
  <div class="navBar-wrapper">
    <div
      class="item"
      v-for="(v, index) in navData"
      :key="index"
      :class="{ active: index == current }"
      @click="clickBar(index)"
    >
      {{ v.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerNavBar",
  data() {
    return {
      // 当前所点击的选项
      current: 0,
    };
  },
  props: ["navData"],
  methods: {
    // 传值给父元素
    clickBar(index) {
      this.current = index;
      this.$emit("changeArtistsList", index);
    },
  },
};
</script>

<style lang="less" scoped>
.navBar-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  .item {
    text-align: center;
    line-height: 20px;
    border-radius: 50px;
    width: 40px;
    padding: 0 2px;
    margin-right: 25px;
    margin-top: 10px;
    cursor: pointer;
    &.active {
      color: #ec4141;
      background-color: #fef3f4;
    }
  }
}
</style>
