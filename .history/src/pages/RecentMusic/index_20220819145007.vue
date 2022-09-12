<template>
  <h2>最近播放</h2>
</template>

<script>
export default {
  name:'RecentMusic',
  mounted() {
    this.getRecentSong()
  },
  methods: {
    // 获取最近播放歌曲
    async getRecentSong(){
      const result = await this.$API.musicList.reqRecent_song()
      console.log(result)
    }
  },
}
</script>

<style>

</style>