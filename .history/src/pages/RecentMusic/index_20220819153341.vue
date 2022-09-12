<template>
  <div>
    <header class="clearfix">
      <div class="title">
        <h3>最近播放</h3>
        <span class="count">共100首</span>
        <span class="clear">清空列表</span>
      </div>
      <div class="playAll">
        <i class="iconfont icon-bofang1"></i>
        播放全部
        <i class="el-icon-plus"></i>
      </div>
    </header>

    <div class="content">
      <table>
        <thead>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>播放时间</th>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="less" scoped>
header {
  text-align: left;
  margin: 30px;
  h3 {
    display: inline-block;
    margin-top: 20px;
    vertical-align: middle;
  }
  span {
    font-size: 13px;
  }
  .count {
    margin-left: 10px;
    color: @minor-color;
  }
  .clear {
    float: right;
    margin-top: 20px;
    color: @artist-color;
  }
  .playAll {
    background-color: rgb(236, 65, 65);
    display: inline-block;
    padding: 8px;
    border-radius: 50px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    i{
      margin-left: 8px;
      font-size: 14px;
    }
    
  }
}
</style>
