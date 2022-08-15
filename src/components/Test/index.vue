<template>
<!-- :class="[
      isMusicDetailCardShow ? '' : 'hide',
      backgroundMode ? '' : 'glassCard',
    ]" -->
  <div
    class="musicDetailCard"
    
  >
    <h2>测试页面</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMusicDetailCardShow: false,
      // 背景显示模式  true为白色渐变背景  false为毛玻璃背景
      backgroundMode: true,
    };
  },
  watch: {
    "$store.state.playList.isMusicDetailCardShow"(isMusicDetailCardShow) {
      console.log(isMusicDetailCardShow);
      this.isMusicDetailCardShow = isMusicDetailCardShow;
    },
  },
};
</script>

<style lang="less" scope>
.musicDetailCard {
  position: fixed;
  width: 100%;
  // height: calc(100vh - 55px);
  height: calc(100vh - 55px);
  bottom: 70px;
  left: 0;
  z-index: 1000;
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
  z-index: 9999;
}
.hide {
  bottom: calc(-80vh + 55px);
}
.glassCard {
  // 火狐默认不支持backdrop-filter 可以手动激活，这里不折腾了，火狐关闭玻璃背景功能，反正这个功能特别吃性能，字体也看不清了，没必要
  backdrop-filter: blur(50px) brightness(95%) !important;
  background-color: unset !important;
  background-image: unset !important;
  * {
    color: rgb(37, 37, 37);

    .commentComponent /deep/ * {
      color: rgb(37, 37, 37);
      border-color: rgb(143, 143, 143);

      .replied {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
