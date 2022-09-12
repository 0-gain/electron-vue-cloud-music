<template>
  <div class="recent_wrapper">
    <header class="clearfix">
      <div class="title">
        <h3>最近播放</h3>
        <span class="count">共{{ recentList.totalSongs.length }}首</span>
        <span class="clear" @click="clearHistory">清空列表</span>
      </div>
      <div class="playAll">
        <i class="iconfont icon-bofang1"></i>
        播放全部
        <i class="el-icon-plus"></i>
      </div>
    </header>

    <div class="content">
      <listTable
        :officialListDetailItem="recentList"
        showType="recent"
        :isShowCheckAll="false"
      />
    </div>
  </div>
</template>

<script>
import ArtistName from "@/components/Artist_Name";
import listTable from "@/components/list-table";
import { mapState } from "vuex";
export default {
  name: "RecentMusic",
  mounted() {
    this.getRecentSong();
  },
  methods: {
    // 获取最近播放歌曲
    async getRecentSong() {
      const result = await this.$API.musicList.reqRecent_song();
      if (result.code === 200) {
        // 处理数据，方便组件使用
        let data = JSON.parse(JSON.stringify(result.data.list));
        let arr = [];
        let obj = {};

        data.forEach((element) => {
          obj = element.data;
          obj.playTime = element.playTime;
          arr.push(obj);
        });

        this.listData = { totalSongs: arr };
      }
    },
    // 清空历史记录
    clearHistory() {
      this.$store.commit("playList/CLEAR_HISTORY");
    },
  },
  computed: {
    ...mapState({
      recentList: (state) => {
        let listDate = { totalSongs: state.playList.recentList };
        return listDate;
      },
    }),
  },
  components: { ArtistName, listTable },
};
</script>

<style lang="less" scoped>
.recent_wrapper {
  height: calc(100vh - 130px);
  overflow: hidden;
  overflow-y: scroll;
}
header {
  text-align: left;
  margin: 0 30px;
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
    cursor: pointer;
  }
  .playAll {
    background-color: rgb(236, 65, 65);
    display: inline-block;
    padding: 8px;
    border-radius: 50px;
    color: #fff;
    font-size: 13px;
    cursor: pointer;
    i {
      margin-left: 8px;
      font-size: 14px;
    }
  }
}
.content {
  margin-top: 10px;
  table {
    width: 100%;
    text-align: left;
    font-size: 12px;
    border-collapse: collapse;
    thead {
      height: 40px;
      th {
        font-weight: normal;
        color: @minor-color;
      }
    }
    tbody {
      tr {
        line-height: 30px;
        .index {
          width: 50px;
          text-align: center;
          color: @minor-color;
        }
        &:nth-child(odd) {
          background-color: @bg-color-hover;
        }
      }
    }
  }
  /deep/.rank-content {
    table {
      tbody {
        tr {
          .index {
            width: 50px;
          }
          .ar {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
