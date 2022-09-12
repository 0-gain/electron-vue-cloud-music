<template>
  <div class="daily_wrapper clearfix">
    <div class="cover">
      <img v-lazy="dailySongs[0]?.al?.picUrl" alt="" />
    </div>
    <div class="other">
      <h2>每日歌曲推荐</h2>
      <div class="des">根据你得音乐口味生成，每天6:00更新</div>
      <div class="operation">
        <button>
          <i class="iconfont icon-bofang1"></i>
          播放全部
        </button>
        <button>
          <i class="el-icon-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyPlaylist",
  data() {
    return {
      dailySongs: [],
    };
  },
  mounted() {
    this.getRecommendSongs();
  },
  methods: {
    async getRecommendSongs() {
      const result = await this.$API.recommend.reqRecommendSongs();
      if (result.code === 200) {
        this.dailySongs = result.data.dailySongs;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.daily_wrapper {
  padding-top: 20px;
  margin: 0 30px;
  text-align: left;
  .cover {
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .other{
    display:inline-block;
    vertical-align: top;
    margin-left: 20px;
    .des{
      font-size: 14px;
    }
  }
}
</style>
