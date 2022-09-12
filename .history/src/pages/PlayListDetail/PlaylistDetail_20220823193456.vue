<template>
  <UserItem :itemData="playlistInfo">
    <template>
      <el-tabs value="first" @tab-click="handleClick">
        <!-- 歌曲列表 -->
        <el-tab-pane label="歌曲列表" name="first">
          <el-table :data="musicAllList" stripe @row-dblclick="clickRow">
            <el-table-column
              label=""
              width="60"
              type="index"
              :index="handleIndex"
            >
              <template slot-scope="{ row, $index }">
                <span v-if="row.id == $store.state.playList.musicId">
                  <i
                    v-if=" $store.state.playList.isPlay"
                    class="iconfont icon-volumeHighFull"
                  ></i>
                  <i v-else class="iconfont icon-volumeFull"></i>
                </span>
                <span v-else>{{ handleIndex($index) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60px">
              <i class="iconfont icon-aixin2"></i>
              <i class="iconfont icon-xiazai1"></i>
            </el-table-column>
            <el-table-column label="标题" prop="name" class="name">
              <template slot-scope="{ row }">
                <div
                  class="musicName"
                  :class="{ active: row.id == $store.state.playList.musicId }"
                >
                  {{ row.name }}
                </div>
                <p v-show="row.fee === 1">试听</p>
              </template>
            </el-table-column>
            <el-table-column label="歌手" prop="ar[0].name" min-width="50"> </el-table-column>
            <el-table-column label="专辑" prop="al.name"> </el-table-column>
            <el-table-column label="时间" width="80">
              <template slot-scope="{ row }">
                {{ row.dt | time }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 评论 -->
        <el-tab-pane
          :label="`评论(${playlistInfo.commentCount})`"
          name="second"
        >
          <div class="comment-wrapper" v-loading="loading">
            <!-- 发表评论 -->
            <div class="publish">
              <el-input type="textarea"></el-input>
              <div class="iconList">
                <span><i class="iconfont icon-xiaolian"></i></span>
                <span><i class="iconfont icon-aite"></i></span>
                <span><i class="iconfont icon-huatifuhao"></i></span>
                <span>评论</span>
              </div>
            </div>

            <!-- 热评 -->
            <div
              class="comments-content"
              v-if="page === 1 && hotComments.length != 0"
            >
              <h5>精彩评论</h5>
              <div
                class="comments-item"
                v-for="(item, index) in hotComments"
                :key="index"
              >
                <el-avatar
                  :src="item.user.avatarUrl"
                  icon="el-icon-user-solid"
                  size="medium"
                ></el-avatar>
                <div class="cntWrap">
                  <div class="des">
                    <span class="name">{{ item.user.nickname }}:</span>
                    <span class="comment">{{ item.content }}</span>
                  </div>
                  <div class="beReplied" v-if="item.beReplied.length">
                    <span class="name"
                      >@{{ item.beReplied[0].user.nickname }}:</span
                    >
                    <span class="comment">{{ item.beReplied[0].content }}</span>
                  </div>
                  <div class="otherInfo">
                    <span class="createTime"
                      >{{ item.timeStr }} {{ item.time | time }}</span
                    >
                    <span class="operation">
                      <i class="iconfont icon-dianzan"
                        ><span class="likedCount">{{
                          item.likedCount
                        }}</span></i
                      >
                      <i class="iconfont icon-fenxiang1"></i>
                      <i class="iconfont icon-pinglun"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 最新评论 -->
            <div class="comments-content">
              <h5>最新评论({{ commentTotal }})</h5>
              <div
                class="comments-item"
                v-for="(item, index) in comments"
                :key="index"
              >
                <el-avatar
                  :src="item.user.avatarUrl"
                  icon="el-icon-user-solid"
                  size="medium"
                ></el-avatar>
                <div class="cntWrap">
                  <div class="des">
                    <span class="name">{{ item.user.nickname }}:</span>
                    <span class="comment">{{ item.content }}</span>
                  </div>
                  <div class="beReplied" v-if="item.beReplied.length">
                    <span class="name"
                      >@{{ item.beReplied[0].user.nickname }}:</span
                    >
                    <span class="comment">{{ item.beReplied[0].content }}</span>
                  </div>
                  <div class="otherInfo">
                    <span class="createTime"
                      >{{ item.timeStr }} {{ item.time | time }}</span
                    >
                    <span class="operation">
                      <i class="iconfont icon-dianzan"
                        ><span class="likedCount">{{
                          item.likedCount
                        }}</span></i
                      >
                      <i class="iconfont icon-fenxiang1"></i>
                      <i class="iconfont icon-pinglun"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分页器 @size-change="handleSizeChange" -->
          <el-pagination
            style="text-align: center"
            :current-page="page"
            :page-size="commentLimit"
            layout="prev, pager, next"
            :total="commentTotal"
            background
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 收藏者 -->
        <el-tab-pane label="收藏者" name="third">
          <div class="collectors">
            <div class="item" v-for="(item, index) in collectors" :key="index">
              <el-avatar
                icon="el-icon-user-solid"
                :src="item.avatarUrl"
                size="large"
              ></el-avatar>
              <span class="name"> {{ item.nickname }}</span>
              <i class="el-icon-male" v-if="item.gender === 1"></i>
              <i class="el-icon-female" v-if="item.gender === 2"></i>
            </div>
          </div>

          <el-pagination
            style="text-align: center"
            :current-page="page"
            :page-size="commentLimit"
            layout="prev, pager, next"
            :total="collectorsTotal"
            background
            @current-change="handleCollectorsChange"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </template>
  </UserItem>
</template>

<script>
import UserItem from "@/components/UserItem";
import { mapState } from "vuex";
export default {
  name: "PlaylistDetail",
  data() {
    return {
      //歌单详情
      playlistInfo: {},
      //歌单创作者详情
      creator: {},
      //是否添加text属性
      isAddClassText: false,
      //歌曲的所有ID
      trackIds: [],
      //双击歌曲的id
      songId: null,
      //获取当前页评论得数量
      commentLimit: 60,
      //当前页评论得数量
      commentTotal: 0,
      // 歌单收藏者的数量
      collectorsTotal: 0,
      // 当前页
      page: 1,
      //当前页歌单评论数据
      comments: [],
      //当前歌单得热评
      hotComments: [],
      // 当前歌单的收藏者
      collectors: [],
      // 加载loading
      loading: true,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // *初始化
    initData() {
      this.getPlaylistDetail(this.$route.query.id);
    },
    // * 获取当前歌单详情
    async getPlaylistDetail(id) {
      const result = await this.$API.musicList.reqPlaylistDetail(id);
      this.playlistInfo = result.playlist;
      this.creator = result.playlist.creator;

      this.trackIds = result.playlist.trackIds.map((item) => {
        return Number(item.id);
      });
      // * 获取歌单歌曲详情
      this.$store.dispatch("playList/getSongDetail", this.trackIds.join(","));
    },

    // * 获取歌单评论
    async getComment(id, limit, offset) {
      const result = await this.$API.musicList.reqComment(id, limit, offset);
      if (result.code === 200) {
        this.comments = result.comments;
        this.hotComments = result.hotComments;
        this.commentTotal = result.total;
        this.loading = false;
      }
    },

    // * 获取歌单收藏者
    async getCollectors(id, limit, offset) {
      const result = await this.$API.musicList.reqCollectors(id, limit, offset);
      if (result.code === 200) {
        this.collectors = result.subscribers;
        this.collectorsTotal = result.total;
      }
    },

    // * 评论翻页
    handleCurrentChange(val) {
      this.page = val;
      const offset = (this.page - 1) * this.commentLimit;
      this.getComment(this.$route.query.id, this.commentLimit, offset);
      // 回到顶部
      this.$scrollTo(400);
    },

    // * 收藏翻页
    handleCollectorsChange(val) {
      this.page = val;
      const offset = (this.page - 1) * this.commentLimit;
      this.getCollectors(this.$route.query.id, this.commentLimit, offset);
      // 回到顶部
      this.$scrollTo(0);
    },

    // 点击tab栏切换
    handleClick() {
      this.page = 1;
      // 获取歌单评论
      this.getComment(this.$route.query.id, this.commentLimit);

      // 获取歌单收藏者
      this.getCollectors(this.$route.query.id, this.commentLimit);
    },
    // 双击某一行音乐
    clickRow(row) {
      this.songId = row.id;
      // todo 将当前的id存入vuex中
      this.$store.commit("playList/UPDATEMUSICID", row.id);
    },
    // 处理index
    handleIndex(index) {
      index += 1;
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },
  },
  computed: {
    ...mapState({
      // 获取所有的歌曲详情
      musicAllList: (state) => {
        return state.playList.musicAllList;
      },
    }),
  },
  watch:{
    '$route'(to,from){
      this.initData();
    }
  },

  components: { UserItem },
};
</script>

<style lang="less" scoped>
.playlistDetail-wrapper {
  position: relative;
  height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  .playlistDetail-content {
    width: calc(100vw - 250px);
    .detail-content {
      width: 100%;
      margin-top: 20px;
      .cover {
        float: left;
        width: 190px;
        height: 190px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .describe {
        float: left;
        padding-left: 20px;
        width: 600px;
        height: 100%;
        box-sizing: border-box;
        .title {
          width: 100%;
          float: left;
          h2 {
            float: left;
            margin: 0 0 10px 10px;
          }
          .highQuality {
            float: left;
            padding: 2px 3px;
            margin-top: 5px;
            border: 1px solid rgb(236, 65, 65);
            color: rgb(236, 65, 65);
            font-size: 13px;
            border-radius: 5px;
          }
        }
        .create {
          float: left;
          width: 100%;
          height: 35px;
          line-height: 35px;
          .creator {
            float: left;
            img {
              width: 25px;
              height: 25px;
              margin-right: 10px;
              border-radius: 50%;
              vertical-align: middle;
            }
            span {
              font-size: 12px;
              color: rgb(80, 125, 175);
            }
            .createTime {
              color: #333;
              margin-left: 10px;
            }
          }
        }
        ul {
          float: left;
          li {
            float: left;
            width: 120px;
            height: 35px;
            line-height: 35px;
            background-color: #fff;
            border-radius: 50px;
            margin-right: 5px;
            color: #333;
            font-size: 14px;
            border: 1px solid #dddee0;
            box-sizing: border-box;
            i {
              font-size: 20px;
              margin-left: 10px;
              float: left;
            }

            &:first-child {
              width: 130px;
              .icon-zengjia {
                float: right;
                padding-right: 5px;
                border-left: 1px solid;
                box-sizing: border-box;
              }
              background-color: rgb(236, 65, 65);
              color: #fff;
              border: none;
            }
            &:nth-child(2) {
              i {
                font-size: 25px;
              }
            }
            &:last-child {
              width: 110px;
            }
          }
        }
        .msg {
          margin-top: 15px;
          float: left;
          font-size: 13px;
          text-align: left;
          .tags {
            width: 100%;
            span {
              a {
                color: rgb(80, 125, 175);
              }
              .line {
                margin: 0 4px 0 0;
              }
              &:last-child {
                .line {
                  display: none;
                }
              }
            }
          }
          .track {
            margin: 5px 0;
            .trackCount {
              margin-right: 7px;
            }
          }
          .description {
            width: 500px;
            padding-right: 20px;
            text-align: left;
            position: relative;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            // 添加遮罩层，在文字较少时覆盖i标签
            &::after {
              content: "";
              width: 100%;
              height: 20px;
              position: absolute;
              background-color: #fff;
            }
            span {
              color: #666666;
            }
            .el-icon-caret-bottom,
            .el-icon-caret-top {
              position: absolute;
              right: 0px;
              top: 2px;
              font-size: 14px;
              color: #666666;
            }
          }
          .text {
            -webkit-line-clamp: 999;
            &::after {
              content: "";
              width: 0;
              height: 0;
              position: absolute;
              background-color: #fff;
            }
          }
        }
      }
    }
    .playList-content {
      width: 100%;
      margin-top: 40px;
      margin-bottom: 10px;
      height: 100%;
      .is-active {
        font-weight: bold;
        color: #333;
        font-size: 18px;
      }

      .el-tabs__active-bar {
        background-color: rgb(236, 65, 65);
        height: 3px;
        border-radius: 10px;
      }
      .el-tabs__nav-wrap::after {
        background-color: #fff;
      }
      .el-tabs__item:hover {
        color: rgb(0, 0, 0);
      }
      .el-tabs__content {
        .el-tab-pane {
          .el-table {
            font-size: 13px;
            .cell {
              font-weight: normal;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              i {
                color: #909399;
                cursor: pointer;
              }
              .icon-xiazai1 {
                padding-left: 5px;
              }
              .icon-24gl-volumeZero {
                color: rgb(236, 65, 65);
                margin-left: 8px;
              }
              span {
                color: #909399;
                margin-left: 5px;
              }
            }
          }
        }
      }

      .el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border: none;
      }
      .el-table .el-table__cell {
        padding: 5px 0;
        cursor: pointer;
      }
      .el-tabs__content .el-tab-pane .el-table .cell .musicName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
        color: #333;
        &.active {
          color: rgb(236, 65, 65);
        }
      }
      .el-tabs__content .el-tab-pane .el-table .cell p {
        font-size: 13px;
        transform: scale(0.7);
        height: 20px;
        line-height: 20px;
        width: 30px;
        float: left;
        margin: 2px 0 0 10px;
        border: 1px solid rgb(236, 65, 65);
        border-radius: 5px;
        color: rgb(236, 65, 65);
        box-sizing: border-box;
      }
      .el-table td.el-table__cell .cell div {
        color: #909399;
      }
      .el-table_1_column_1 > .cell {
        text-align: right !important;
      }
      .el-table--scrollable-x .el-table__body-wrapper{
        overflow: hidden;
        overflow-x: hidden;
      }
      .comment-wrapper {
        .publish {
          .iconList {
            margin-top: 10px;
            text-align: left;
            span {
              margin-right: 10px;
              color: #666666;
              i {
                font-size: 20px;
              }
              &:last-child {
                float: right;
                padding: 5px 15px;
                border: 1px solid #dcdfe6;
                border-radius: 50px;
                font-size: 14px;
                margin-top: -5px;
              }
            }
          }
        }
        .comments-content {
          text-align: left;
          .comments-item {
            padding-bottom: 10px;
            margin-bottom: 20px;
            border-bottom: 1px solid #efefef;
            width: 100%;
            overflow: hidden;
            &:last-child {
              border-bottom: none;
            }
            .el-avatar {
              float: left;
            }
            .cntWrap {
              margin-left: 46px;
              font-size: 12px;
              color: #666666;
              .des {
                .name {
                  color: steelblue;
                  margin-right: 5px;
                }
              }
              .beReplied {
                background-color: #efefef;
                margin-top: 10px;
                padding: 7px;
                .name {
                  color: steelblue;
                  margin-right: 5px;
                  cursor: pointer;
                }
              }
              .otherInfo {
                margin-top: 10px;
                color: #909399;
                .operation {
                  float: right;
                  i {
                    cursor: pointer;
                    margin-left: 20px;
                    .likedCount {
                      font-size: 12px;
                    }
                    &:hover {
                      color: #333;
                    }
                  }
                  .icon-dianzan {
                    font-size: 20px;
                  }
                }
              }
            }
          }
        }
      }

      .collectors {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 30%;
          margin: 20px 0;
          text-align: left;
          .el-avatar {
            width: 80px;
            height: 80px;
            float: left;
          }
          .name {
            line-height: 82px;
            margin-left: 20px;
          }
          .el-icon-female {
            color: rgb(255, 160, 176);
            font-size: 16px;
            background-color: rgb(248, 228, 231);
            padding: 3px;
            border-radius: 50%;
            margin-left: 10px;
          }
          .el-icon-male {
            color: rgb(91, 187, 209);
            font-size: 16px;
            background-color: rgb(191, 243, 255);
            padding: 3px;
            border-radius: 50%;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .icon-volumeHighFull,
  .icon-volumeFull {
    color: rgb(236, 65, 65) !important;
  }
}
</style>
