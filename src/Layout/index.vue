<template>
  <div id="wrapper">
    <CloudHeader class="header" />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { Sidebar, CloudHeader, AppMain, Footer } from "./components";
export default {
  name: "Layout",
  components: {
    Sidebar,
    CloudHeader,
    AppMain,
    Footer,
  },
};
</script>

<style lang="less">
#wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .header {
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
  }
  .sidebar-container {
    position: fixed;
    height: 100%;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
  }
  .main-container {
    position: relative;
    margin-left: 200px;
    margin-top: 60px;
    float: left;
    height: 100%;
    width: 100%;
  }
  .footer {
    position: fixed;
    width: 100%;
    height: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background-color: #fff;
    border-top: 1px solid rgba(144,147,153,.3);
  }
}
</style>
