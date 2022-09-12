<template>
  <div>
    <div class="cover">
      <img v-lazy="" alt="">
    </div>
    <div class="other">
      <h2>每日歌曲推荐</h2>
      <div class="des">根据你得音乐口味生成，每天6:00更新</div>
    </div>
  </div>
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

<style lang="less" scoped>

</style>
