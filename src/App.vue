<template>
  <div id="app">
      <router-view></router-view>
    <Footer
      class="footer"
      :class="{ footer_bg: $route.path == '/playListCardDetail' }"
      v-if="!$route.meta.hidden"
    />
  </div>
</template>

<script>
import { Footer } from "@/Layout/components";
export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>

<style>
.footer {
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 9999;
  /* background-color: transparent; */
  background-color: #fff;
  border-top: 1px solid rgba(144, 147, 153, 0.3);
}
.footer_bg {
  /* border: none; */
  background-color: rgb(112, 146, 184);
}
</style>
