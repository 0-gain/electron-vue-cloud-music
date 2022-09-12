<template>
  <div></div>
</template>

<script>
export default {
  name: "Empty",
  mounted() {
    console.log('挂载')
  },
  created() {
    this.$router.replace({
      path: "/search/song",
      query: { type: 1 } 
    });
    console.log('创建')
  },
};
</script>

<style></style>
