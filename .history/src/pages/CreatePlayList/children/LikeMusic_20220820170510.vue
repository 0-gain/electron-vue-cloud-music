<template>
  <h2>我喜欢的音乐</h2>
</template>

<script>
export default {
  name:'likeList',
  mounted() {
    this.getPlaylistDetail(this.$store.state.user.uid)
  },
  methods: {
    async getPlaylistDetail(id){
      const res = await this.$API.musicList.reqPlaylistDetail(id)
      console.log(res)
    }
  },
}
</script>

<style>

</style>