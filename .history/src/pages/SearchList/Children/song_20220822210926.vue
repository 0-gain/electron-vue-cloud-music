<template>
  <div>
    <div class="operation">
      <div class="pc">
        <span class="playAll"
          ><i class="iconfont icon-bofang1"></i>
          <span>播放全部</span>
        </span>
        <span class="collection">
          <i class="iconfont el-icon-plus"></i>
        </span>
      </div>
      <span class="download"><i class="iconfont icon-xiazai"></i>下载全部</span>
    </div>

    <div class="music-list">
      <listTable :officialListDetailItem="songsData" typeShow="searchSong" />
    </div>
  </div>
</template>

<script>
import listTable from "@/components/list-table";
import { mapState } from "vuex";
export default {
  name: "song",
  data() {
    return {
      //   全部单曲
      songsData: {},
      // 单曲数量
      songCount: "",
    };
  },
  props: ["offset"],
  mounted() {
    
    this.getSearchKeywords(this.keywords);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords(keywords, type, limit, offset) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        type,
        limit,
        offset
      );
      if (result.code === 200) {
        let songs = result.result.songs;
        // todo 包装成对象方便组件使用
        this.songsData = { totalSongs: songs };
        this.songCount = result.result.songCount;
        let str = `找到${result.result.songCount}首单曲`;
        this.$emit("handleCount", str, this.songCount);
      }
    },
  },
  computed: {
    ...mapState({
      keywords: (state) => state.search.keywords,
    }),
  },
  components: { listTable },
  watch: {
    // 监听offset的状态
    offset(offset) {
      const { keywords, type } = this.$route.query;
      let searchObj = {
        keywords,
        type,
        offset,
      };
      this.getSearchKeywords(searchObj);
    },
    
  },
};
</script>

<style lang="less" scoped>
.operation {
  margin-top: 30px;
  .pc {
    display: inline-block;
    .playAll {
      background-color: rgb(236, 65, 65);
      border-radius: 50px 0 0 50px;
      padding: 8px 8px;
      color: #fff;
      font-size: 14px;
      .icon-bofang1 {
        margin: 0 5px;
      }
    }
    .collection {
      background-color: rgb(236, 65, 65);
      padding: 8px;
      font-size: 14px;
      margin-left: 1px;
      border-radius: 0 50px 50px 0;
      color: #fff;
    }
  }
  .download {
    margin-left: 10px;
    padding: 8px 12px;
    border: 1px solid #d5d5d5;
    border-radius: 50px;
    font-size: 14px;
    i {
      margin: 0 5px;
    }
  }
}
.music-list {
  margin-top: 20px;
  /deep/.rank-item {
    .rank-content {
      table {
        tr {
          font-size: 13px;
          width: 100%;
          .index {
            width: 50px;
          }
          .name {
            width: 30vw;
          }
          .ar {
            text-align: left;
            width: 12vw;
          }
          .album {
            width: 12vw;
            padding-right: 5px;
          }
        }
      }
    }
  }
}
</style>
