<template>
  <div>
    <h3>最近播放<span>共100首</span></h3>
    
  </div>
</template>

<script>
export default {
  name:'RecentMusic',
  data() {
    return {
      // 歌曲数据
      listData:[]
    }
  },
  mounted() {
    this.getRecentSong()
  },
  methods: {
    // 获取最近播放歌曲
    async getRecentSong(){
      const result = await this.$API.musicList.reqRecent_song()
      if(result.code === 200){
        this.listData = result.data.list
      }
    }
  },
}
</script>

<style>

</style>