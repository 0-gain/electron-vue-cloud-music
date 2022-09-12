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
      <!-- <table>
        <thead>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
        </thead>
        <tbody>
          <tr v-for="(v, index) in listData" :key="index">
            <td class="index">{{ index | indexFormat }}</td>
            <td>{{ v.data.name }}</td>
            <td>
              <template>
                <ArtistName :arArr="v.data.ar" />
              </template>
            </td>
          </tr>
        </tbody>
      </table> -->
      <listTable/>
    </div>
  </div>
</template>

<script>
import ArtistName from "@/components/Artist_Name";
import listTable from '@/components/list-table'
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
        this.listData = {};
        console.log(this.listData);
      }
    },
  },
  components: { ArtistName,listTable },
};
</script>

<style lang="less" scoped>
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
        &:nth-child(odd){
          background-color: @bg-color-hover;
        }
      }
    }
  }
}
</style>
