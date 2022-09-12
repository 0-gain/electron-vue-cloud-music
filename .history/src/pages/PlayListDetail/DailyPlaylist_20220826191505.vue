<template>
  <div>每日歌单推荐</div>
</template>

<script>
export default {
  name: "DailyPlaylist",
  data() {
    return {
        dailySongs:[]
    }
  },
  mounted() {
    this.getRecommendSongs()
  },
  methods: {
    async getRecommendSongs() {
      const result = await this.$API.recommend.reqRecommendSongs();
      if (result.code === 200) {
        this.dailySongs = result.data.dailySongs
      }
    },
  },
};
</script>

<style></style>
