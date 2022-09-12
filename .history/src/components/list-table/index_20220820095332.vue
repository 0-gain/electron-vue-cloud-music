<template>
  <div class="rank-item">
    <div class="rank-cover">
      <div
        v-show="showType === 'singerIndex' || 'rank'"
        class="coverImg"
        @mouseenter="isShowPlay = true"
        @mouseleave="isShowPlay = false"
        @click="
          officialListDetailItem.artistTopSong
            ? ''
            : clickCheckAll(officialListDetailItem.id)
        "
      >
        <img
          v-lazy="officialListDetailItem.coverImgUrl || coverImgUrl"
          alt=""
        />
        <transition name="fade">
          <i v-show="isShowPlay" class="iconfont icon-bofangqi-bofang"></i>
        </transition>
      </div>
    </div>
    <div class="rank-content">
      <div class="title" v-if="officialListDetailItem.artistTopSong">
        <h3>热门50首</h3>
        <i class="el-icon-video-play"></i>
        <i class="el-icon-folder-add"></i>
      </div>
      <table>
        <thead v-show="showType != 'rank' || != 'singerIndex'">
          <tr>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
            <th>热度</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(track, index) in (officialListDetailItem.tracks &&
              officialListDetailItem.tracks.slice(0, 5)) ||
            (officialListDetailItem.artistTopSong &&
              (officialListDetailItem.isViewTotal
                ? officialListDetailItem.artistTopSong
                : officialListDetailItem.artistTopSong.slice(0, 10))) ||
            (officialListDetailItem.songs &&
              officialListDetailItem.songs.slice(0, 10)) ||
            officialListDetailItem.totalSongs"
            :key="index"
            @dblclick="clickRow(track.id, officialListDetailItem)"
          >
            <td class="index">
              <span v-if="track.id == $store.state.playList.musicId">
                <i
                  class="iconfont icon-volumeFull"
                  v-if="isPlay && !$store.state.playList.isPlay"
                ></i>
                <i class="iconfont icon-volumeHighFull" v-else></i>
              </span>

              <span v-else>{{ index + 1 }}</span>
            </td>

            <td class="icon" v-show="showType != 'rank'">
              <i class="iconfont icon-aixin2"></i>
              <i class="iconfont icon-xiazai1"></i>
            </td>

            <td class="name">
              <span>
                {{ track.name }}
                <!-- <span class="alia" v-if="track.alia.length">
                  ({{ track.alia[0] }})
                </span> -->
                <p class="type" v-if="track.fee == 1">VIP</p>
                <p class="type" v-if="track.fee == 1">试听</p>
                <p class="mv" v-if="track.mv">
                  MV
                  <i class="iconfont icon-bofangqi-bofang"></i>
                </p>
                <p class="type" v-if="track.originCoverType">
                  {{ track.originCoverType == 1 ? "原唱" : "翻唱" }}
                </p>
              </span>
            </td>
            <!-- 显示歌曲歌手得名字 -->
            <td class="ar">
              <span>
                <span v-for="(a, index) in track.ar" :key="index">
                  <span>{{ a.name }}</span>
                  <span class="line">/</span>
                </span>
              </span>
            </td>

            <!-- 显示专辑 -->
            <td class="album" v-show="showType != 'rank' || 'singerIndex'">
              <span>{{ track.al.name }}</span>
            </td>

            <!-- 显示歌曲时间 -->
            <td class="dt" v-show="showType != 'rank'">
              {{ track.dt | moment("mm:ss") }}
            </td>

            <!-- 歌曲热度 -->
            <td class="pop" v-show="showType != 'rank' || 'singerIndex'">
              <el-progress :percentage="track.pop"></el-progress>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="checkAll"
        v-show="isShowCheckAll"
        @click="clickCheckAll(officialListDetailItem.id)"
      >
        <span>查看全部</span> <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listTable",
  data() {
    return {
      // 是否显示播放icon
      isShowPlay: false,
    };
  },
  props: {
    officialListDetailItem: {
      type: Object,
      default() {
        return {};
      },
    },
    // 封面
    coverImgUrl: {
      type: String,
      default() {
        return "";
      },
    },
    showType: {
      type: String,
      default() {
        return;
      },
    },
    // 控制显示rank组件该显示得
    isRanking: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 控制显示全部歌曲
    isShowCheckAll: {
      type: Boolean,
      default() {
        return true;
      },
    },

    //当前所点击得id
    listId: {
      type: String,
      default() {
        return "";
      },
    },

    // 当前所点击的索引号
    currentIndex: {
      type: Number,
      default() {
        return;
      },
    },
    // 是否显示封面
    isShowCover: {
      type: Boolean,
      default() {
        return true;
      },
    },

    // 是否正在播放
    isPlay: {
      type: Boolean,
      default() {
        return false;
      },
    },

    // 是否显示表格标题
    isShowThead: {
      type: Boolean,
      default() {
        return false;
      },
    },

    // 是否显示热度
    isShowProgress: {
      type: Boolean,
      default() {
        return false;
      },
    },

    // 是否时间
    isShowTime: {
      type: Boolean,
      default() {
        return true;
      },
    },

    // 是否显示下载和喜欢icon
    isShowIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },

  methods: {
    // 查看全部歌单
    clickCheckAll(id) {
      let listId = this.listId;
      this.$emit("checkTotalSong", { id, listId });
    },
    // 双击某一行音乐
    clickRow(id, tracks) {
      let songInfo = [];
      if (tracks.hasOwnProperty("tracks")) {
        songInfo = tracks.tracks;
      } else if (tracks.hasOwnProperty("artistTopSong")) {
        songInfo = tracks.artistTopSong;
      } else if (tracks.hasOwnProperty("songs")) {
        songInfo = tracks.songs;
      } else if (tracks.hasOwnProperty("totalSongs")) {
        songInfo = tracks.totalSongs;
      }
      // todo 更新播放列表
      this.$store.commit("playList/GETSONGDETAIL", songInfo);
      // todo 将当前的id存入vuex中
      this.$store.commit("playList/UPDATEMUSICID", id);
    },
  },
};
</script>

<style lang="less" scoped>
.rank-item {
  display: flex;
  width: 100%;
  margin-bottom: 50px;
  .rank-cover {
    .coverImg {
      position: relative;
      width: 180px;
      aspect-ratio: 1;
      margin-right: 50px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
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
  .rank-content {
    width: 100%;
    flex: 1;
    text-align: right;
    .title {
      text-align: left;
      h3 {
        display: inline-block;
        margin-top: 0;
      }
      i {
        font-size: 20px;
        color: #ada9a9;
        cursor: pointer;
        &:hover {
          color: #333;
        }
      }
      .el-icon-video-play {
        margin: 0 30px;
      }
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 5px;
      overflow: hidden;
      text-align: left;
      tr {
        .ar,
        .album {
          & > span {
            width: inherit;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
      }
      thead {
        tr {
          font-size: 13px;
          color: #909399;
          line-height: 40px;
          th {
            font-weight: normal;
          }
        }
      }
      tbody {
        tr {
          color: #ada9a9;
          font-size: 12px;
          height: 40px;
          .index {
            width: 30px;
            text-align: center;
            font-size: 14px;
            i {
              color: rgb(236, 65, 65);
            }
          }
          .name {
            color: #333;
            text-align: left;
            .alia {
              display: inline-block;
              vertical-align: text-bottom;
              color: #ada9a9;
              margin: 0 5px;
              width: calc(9vw);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .mv,
            .type {
              display: inline-block;
              vertical-align: top;
              margin: 0;
              padding-left: 2px;
              line-height: 14px;
              font-size: 12px;
              border: 1px solid rgb(236, 65, 65);
              color: rgb(236, 65, 65);
              text-align: center;
              transform: scale(0.8);
              border-radius: 3px;
              i {
                font-size: 12px;
                margin-left: -5px;
              }
            }
            .type {
              padding-right: 2px;
            }
          }
          .ar {
            text-align: right;
            span {
              color: #909399;
              .line {
                margin: 0 5px;
              }
              & > :last-child {
                .line {
                  display: none;
                }
              }
            }
          }
          .icon {
            width: 60px;
            text-align: center;
            .icon-aixin2 {
              float: left;
              cursor: pointer;
              &:hover {
                color: #333;
              }
            }
            .icon-xiazai1 {
              cursor: pointer;
              &:hover {
                color: #333;
              }
            }
          }
          .dt {
            text-align: left;
            width: 5vw;
          }
          .pop {
            width: 80px;
          }
          &:nth-child(odd) {
            background-color: #f9f9f9;
          }
          &:nth-child(-n + 3) > .index {
            color: red;
          }
          &:hover {
            background-color: #f4f4f4;
          }
        }
      }
    }
    .checkAll {
      display: inline-block;
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
      color: #ada9a9;
      &:hover {
        color: #333;
      }
      span {
        vertical-align: middle;
      }
      i {
        vertical-align: middle;
      }
    }
  }

  // 过渡
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
/deep/.el-progress {
  .el-progress-bar {
    margin: 0;
    padding: 0;
    .el-progress-bar__outer {
      width: 100%;
      background-color: rgb(229, 229, 229);
      .el-progress-bar__inner {
        background-color: rgb(202, 202, 202);
      }
    }
  }
  .el-progress__text {
    display: none;
  }
}
</style>
