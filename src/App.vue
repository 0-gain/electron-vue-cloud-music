<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "App",
  
};
</script>

<style>
@import "./assets/fonts/iconfont.css";
#app {
  font-family: Helvetica, Tahoma, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  overflow: hidden;
}

html,
body,
ul,
li,
div {
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
</style>
