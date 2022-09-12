<template>
  <div
    class="rank-wrapper"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 官方榜单 -->
    <div class="official-rank">
      <div class="title">
        <h3>官方榜</h3>
      </div>

      <list-table
        :officialListDetailItem="item"
        v-for="(item, index) in officialListDetail"
        :key="index"
        :isRanking="true"
        @checkTotalSong="checkTotalSong"
      />
    </div>

    <!-- 全球榜单 -->
    <div class="global-rank">
      <div class="title">
        <h3>全球榜</h3>
      </div>
      <listItem
        :listData="globalListData"
        :isShowIcon="false"
        @changeRoute="goRoutePlaylistDetail"
      />
    </div>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import listTable from "@/components/list-table";
export default {
  name: "Rank",
  data() {
    return {
      // 官方榜单数据
      officialListData: [],
      // 官方榜单详情
      officialListDetail: [],
      // 全球榜单
      globalListData: [],
      // 加载
      loading: true,
      // 歌曲内容
      tracks: [],
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // * 初始化数据
    InitData() {
      this.getTopList();
    },
    // * 获取所有的榜单
    async getTopList() {
      this.loading = true;
      const result = await this.$API.rank.reqTopList();
      if (result.code === 200) {
        this.officialListData = result.list.slice(0, 4);
        this.globalListData = result.list.slice(4);
        this.loading = false;
        for (const list of this.officialListData) {
          this.getPlaylistDetail(list.id);
        }
      }
    },

    // * 获取歌单详情
    async getPlaylistDetail(id) {
      this.loading = true;
      const result = await this.$API.musicList.reqPlaylistDetail(id);
      if (result.code === 200) {
        this.loading = false;
        this.tracks.push(result.playlist.tracks.slice(0, 5));
        this.officialListDetail.push(result.playlist);
      }
    },

    // 自定义事件,跳转至歌单详情
    goRoutePlaylistDetail(id) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },

    checkTotalSong({ id }) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },
  },
  components: { listTable, listItem },
};
</script>

<style lang="less" scoped>
.rank-wrapper {
  text-align: left;
  .official-rank {
    .title {
      h3 {
        display: inline-block;
      }
    }
  }
  /deep/.list-content {
    justify-content: flex-start;
    .list-item {
      width: 220px;
      margin-right: 12px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      .cover {
        aspect-ratio: 1;
        .icon-bofangqi-bofang {
          position: absolute;
          width: 40px;
          height: 40px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          color: rgb(236, 65, 65);
          font-size: 40px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
