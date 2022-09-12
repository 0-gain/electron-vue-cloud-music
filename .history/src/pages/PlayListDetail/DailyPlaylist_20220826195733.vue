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
        <button class="collection">
          <i class="el-icon-folder-add"></i>
          收藏全部
        </button>
      </div>
    </div>

    <listTable/>
  </div>
</template>

<script>
import listTable from '@/components/list-table'
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
        let obj = {
          totalSongs:result.data.dailySongs
        }
        this.dailySongs = obj;
        
      }
    },
  },
  components:{listTable}
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
    .operation{
      margin-top: 10px;
      button{
        margin-right: 10px;
        border: 1px solid @border-color;
        padding: 6px 12px;
        border-radius: 50px;
        background-color: rgb(236, 65, 65);
        color: #fff;
        cursor: pointer;
        .icon-bofang1{
          font-size: 14px;
        }
        .el-icon-folder-add{
         font-size: 16px;
        }
      }
      .collection{
        background-color: transparent;
        color: #333;
      }
    }
  }
}
</style>
