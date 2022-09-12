<template>
  <div>
    <header class="clearfix">
      <h3>
        最近播放
        <span class="count">共100首</span>
        <span class="clear">清空列表</span>
      </h3>

      <div class="playAll">播放全部</div>
    </header>

    <div class="content">
      <list-table />
    </div>
  </div>
</template>

<script>
import listTable from "@/components/list-table";
export default {
  name: "RecentMusic",
  data() {
    return {
      // 歌曲数据
      listData: [],
    };
  },
  mounted() {
    this.getRecentSong();
  },
  methods: {
    // 获取最近播放歌曲
    async getRecentSong() {
      const result = await this.$API.musicList.reqRecent_song();
      if (result.code === 200) {
        this.listData = result.data.list;
      }
    },
  },
  components: { listTable },
};
</script>

<style lang="less" scoped>
header {
  text-align: left;
  margin: 30px;
  h3 {
    vertical-align: middle;
    span {
      font-size: 14px;
    }
  }

  
}
</style>
