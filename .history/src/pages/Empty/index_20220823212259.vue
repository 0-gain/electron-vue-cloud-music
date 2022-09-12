<template>
  <div></div>
</template>

<script>
export default {
  name: "Empty",
  data() {
    return {};
  },
  mounted() {
    this.$router.replace({
      path: "/search/song",
      name: "Search",
    });
  },
};
</script>

<style></style>
