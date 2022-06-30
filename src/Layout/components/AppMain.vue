<template>
  <section class="app-main">
    <!-- <component :is="currentTabComponent"></component> -->
    <router-view></router-view>
  </section>
</template>

<script>
// import Discover from "@/pages/Discover/discover.vue"
export default {
  name: "AppMain",
  data() {
    return {
      // currentTabComponent: Discover,
    };
  },
  methods: {
    
  },
  computed: {
    key() {
      console.log(this.$route.path);
      return this.$route.path;
    },
  },
  mounted() {
    /* this.$bus.$on("route", (data) => {
      this.currentTabComponent = data.component;
    }); */
  },
};
</script>

<style></style>
