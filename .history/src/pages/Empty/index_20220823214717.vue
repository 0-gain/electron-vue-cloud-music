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
      query: { type: 1 } 
    });
  },
};
</script>

<style></style>
