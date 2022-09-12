<template>
  <div class="search-wrap clearfix" ref="searchWrap">
    <h3>搜索 {{ keywords }}</h3>

    <div class="recommend" v-if="multimatch.length">
      <div class="title">你可能感兴趣</div>
      <!-- 卡片 -->
      <div class="recommend-content">
        <div
          class="item"
          v-for="(m, index) in multimatch"
          :key="index"
          @click="changeRoute(m)"
        >
          <div class="cover">
            <img v-lazy="m.picUrl" alt="" :key="m.picUrl" />
          </div>
          <div class="des">
            <p class="name">
              <span class="occupation">{{ m.occupation || "专辑" }}：</span>
              {{ m.name }}
              <span class="alias" v-if="m.alias">({{ m.alias[0] }})</span>
            </p>
            <p class="otherInfo">
              <span v-if="m.fansSize">
                <span class="fansSize"
                  >粉丝:{{ m.fansSize | numberFormat }}
                </span>
                <span class="musicSize"
                  >歌曲：{{ m.musicSize | numberFormat }}</span
                >
              </span>
              <span v-else>{{ m.artist.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <HomeNav
      :navBarData="navData"
      :fiexdTop="false"
      @clickBarItem="clickBarItem"
    >
      <template v-slot:count>
        <span class="des">{{ str }}</span>
      </template>
    </HomeNav>

    <!-- 内容展示区 -->
    <div>
      <router-view @handleCount="handleCount" :offset="offset"></router-view>
    </div>

    <!-- 分页器 -->
    <el-pagination
      v-if="totalCount > pageSize"
      style="text-align: center"
      :current-page="pageNo"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalCount"
      background
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import listTable from "@/components/list-table";
import HomeNav from "@/components/HomeNav";
import { mapState } from "vuex";
export default {
  name: "SearchList",
  data() {
    return {
      navData: [
        { name: "单曲", type: 1, path: "/search/song" },
        { name: "歌手", type: 100, path: "/search/artist" },
        { name: "专辑", type: 10, path: "/search/album" },
        { name: "视频", type: 1014, path: "/search/video" },
        { name: "歌单", type: 1000, path: "/search/playlist" },
        { name: "播客", type: 1009, path: "/search/dj" },
        { name: "用户", type: 1002, path: "/search/user" },
      ],
      //   全部单曲
      songsData: {},
      // 单曲数量
      songCount: "",
      // 歌手推荐
      multimatch: [],
      // 当前的数量说明
      str: "",
      // 当前的页数
      pageNo: 1,
      // 一页的数量
      pageSize: 50,
      // 总共数量
      totalCount: 0,
      // 偏移量
      offset: 0,
    };
  },
  inject: ["reload"],
  mounted() {
    this.getSearchMultimatch(this.keywords);
  },
  methods: {
    // 搜索多重匹配
    async getSearchMultimatch(keywords) {
      const result = await this.$API.search.reqSearchMultimatch(keywords);
      if (result.code === 200) {
        // * 处理数据
        if (result.result.hasOwnProperty("artist")) {
          let artist = result.result.artist[0];
          this.multimatch.push(artist);
        } else if (result.result.hasOwnProperty("album")) {
          let album = result.result.album[0];
          this.multimatch.push(album);
        }
      }
    },

    // 自定义事件
    clickBarItem({ path, type }) {
      this.$router.push({
        path,
        query: { keywords: this.$route.query.keywords, type },
      });
      this.pageNo = 1;
      this.offset = 0;
    },
    // 自动义事件
    handleCount(str, count) {
      this.str = str;
      this.totalCount = count;
    },

    // 点击翻页事件
    handleCurrentChange(page) {
      this.pageNo = page;
      this.offset = (this.pageNo - 1) * this.pageSize;
      this.$refs.searchWrap.scrollTo({
        top: 180,
        behavior: "smooth",
      });
    },

    changeRoute(info) {
      console.log(info)
      if (info.hasOwnProperty("occupation")) {
        // 去歌手页
        this.$router.push({
          path: "/singerDetail",
          query:{id:info.id}
        });
      } else {
        // 专辑页
        this.$router.push({ name: "album" });
      }
    },
  },
  computed: {
    ...mapState({
      keywords: (state) => state.search.keywords,
    }),
  },
  watch: {
    "$store.state.search.keywords"() {
      this.getSearchMultimatch(this.keywords);
      console.log('刷新')
      this.reload();
    },
  },
  components: { HomeNav, listTable },
};
</script>

<style lang="less" scoped>
.search-wrap {
  padding: 0 30px;
  text-align: left;
  height: calc(100vh - 130px);
  overflow-y: scroll;
  /deep/#nav {
    margin-bottom: 10px;
    .navBar {
      .barItem {
        font-size: 15px;
      }
    }
  }
  .recommend {
    .title {
      font-size: 12px;
      color: #606266;
    }
    .recommend-content {
      margin-top: 20px;
      .item {
        display: inline-block;
        vertical-align: middle;
        width: 300px;
        height: 60px;
        background-color: rgba(173, 175, 175, 0.1);
        margin-right: 5px;
        border-radius: 5px;
        font-size: 12px;
        .cover {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .des {
          display: inline-block;
          vertical-align: middle;
          height: 100%;
          width: 80%;

          .alias {
            color: #909399;
          }
          .name {
            color: #333;
            margin-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            margin: 7px 0 5px 10px;
            color: #909399;
          }
        }
      }
    }
  }
  .operation {
    margin-top: 10px;
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

  .el-pagination {
    margin: 20px 0;
  }
}
</style>
