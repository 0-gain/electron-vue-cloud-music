<template>
  <div class="playlistDetail-wrapper clearfix">
    <div class="detail-content clearfix">
      <div class="cover">
        <img :src="playlistInfo.coverImgUrl" alt="" />
      </div>
      <div class="describe">
        <div class="title">
          <span class="highQuality">精品歌单</span>
          <h2>{{ playlistInfo.name }}</h2>
        </div>

        <div class="create">
          <div class="creator">
            <img :src="creator.avatarUrl" alt="" />
            <span>{{ creator.nickname }}</span>
            <span class="createTime"
              >{{ playlistInfo.createTime | toDate }}创建</span
            >
          </div>
        </div>

        <ul>
          <li>
            <i class="iconfont icon-arrow-right-filling"></i>
            <span>播放全部</span>
            <i class="iconfont icon-zengjia"></i>
          </li>
          <li>
            <i class="iconfont icon-folder-add"></i>
            <span>收藏({{ playlistInfo.subscribedCount | numberFormat }})</span>
          </li>
          <li>
            <i class="iconfont icon-fenxiang"></i>
            <span>分享({{ playlistInfo.shareCount | numberFormat }})</span>
          </li>
          <li>
            <i class="iconfont icon-xiazai"></i>
            <span>下载全部</span>
          </li>
        </ul>

        <div class="msg">
          <div class="tags">
            标签:
            <span v-for="tag in playlistInfo.tags" :key="tag">
              <a href="javascript:;">{{ tag }} </a>
              <span class="line">/</span>
            </span>
          </div>

          <div class="track">
            歌曲:
            <span class="trackCount">{{ playlistInfo.trackCount }}</span>
            播放:
            <span class="playCount">{{
              playlistInfo.playCount | numberFormat
            }}</span>
          </div>

          <div class="description" :class="{ text: isAddClassText }">
            简介:
            <span>{{ playlistInfo.description }}</span>
            <i
              class="el-icon-caret-top"
              @click="isAddClassText = false"
              v-if="isAddClassText"
            ></i>

            <i
              class="el-icon-caret-bottom"
              @click="isAddClassText = true"
              v-else
            ></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="playList-content">
      <el-tabs value="first" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table
            :data="songsData"
            style="width: 100%"
            stripe
            @row-dblclick="clickRow"
          >
            <el-table-column
              label=""
              width="40"
              type="index"
              :index="handleIndex"
            >
            </el-table-column>
            <el-table-column label="操作" width="70">
              <i class="iconfont icon-aixin2"></i>
              <i class="iconfont icon-xiazai1"></i>
            </el-table-column>
            <el-table-column label="标题" prop="name" min-width="320">
            </el-table-column>
            <el-table-column label="歌手" min-width="120" prop="ar[0].name">
            </el-table-column>
            <el-table-column label="专辑" prop="al.name" min-width="170">
            </el-table-column>
            <el-table-column label="时间" width="100">
              <template slot-scope="{ row }">
                {{ row.dt | time }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="`评论(${playlistInfo.commentCount})`" name="second"
          >配置管理</el-tab-pane
        >
        <el-tab-pane label="收藏者" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistDetail",
  data() {
    return {
      playlistInfo: {}, //歌单详情
      creator: {}, //创作者详情
      isAddClassText: false, //是否添加text
      trackIds: [], //歌曲的所有ID
      songsData: [], //歌曲的相关数据
      songId:null,//双击歌曲的id
    };
  },
  props: ["id"],
  mounted() {
    this.getPlaylistDetail(this.id);
  },
  methods: {
    // * 获取当前歌单详情
    async getPlaylistDetail(id) {
      const result = await this.$API.musicList.reqPlaylistDetail(id);
      this.playlistInfo = result.playlist;
      this.creator = result.playlist.creator;

      this.trackIds = result.playlist.trackIds.map((item) => {
        return Number(item.id);
      });
      this.getSongDetail(this.trackIds.join(","));
    },

    // * 获取歌单音乐详情
    async getSongDetail(trackIds) {
      const result = await this.$API.musicList.reqSongDetail(trackIds);
      if (result.code === 200) {
        this.songsData = result.songs;
      }
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 双击某一行音乐
    clickRow(row){
      this.songId = row.id

      // * 获取当前所点击的歌曲信息
      this.$store.dispatch('playList/getSongUrl',this.songId)
      this.$store.dispatch('playList/getSongDetail',this.songId)
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
};
</script>

<style lang="less" scope>
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.playlistDetail-wrapper {
  position: relative;
  padding-top: 30px;
  .detail-content {
    width: 800px;
    height: 100%;
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
    margin-top: 40px;
    width: 100%;
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
            i {
              color: #909399;
              cursor: pointer;
            }
            .icon-xiazai1 {
              padding-left: 5px;
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
    }
    .el-tabs__content .el-tab-pane .el-table .cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-table td.el-table__cell .cell div {
      color: #909399;
    }
  }
}
</style>
