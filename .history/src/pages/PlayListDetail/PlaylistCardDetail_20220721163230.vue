<template>
  <div id="playlistCardDetail-wrapper">
    <div class="bg"></div>
    <div class="cardDetail">
      <CloudHeader class="header" :isVisible="isVisible" />
      <i class="el-icon-arrow-down" @click="changeCardDetailState"></i>
      <div class="content">
        <!-- 详情 -->
        <div class="m-lycifo">
          <!-- 唱片 -->
          <div class="cvrwrap">
            <div
              class="needle"
              :class="$store.state.playList.isPlay ? 'needleRotate' : ''"
            >
              <img :src="needle" alt="" />
            </div>
            <div
              class="u-cover"
              :class="$store.state.playList.isPlay ? 'coverAnimation' : ''"
            >
              <img
                :src="coverall"
                alt=""
                :style="{
                  'background-image': 'url(' + musicList[0].al.picUrl + ')',
                }"
              />
            </div>
          </div>
          <!-- 歌词 -->
          <div class="cnt">
            <!-- 歌名 -->
            <div class="title">
              <h2>{{ musicList[0].name }}</h2>
              <div class="des">{{ musicList[0].ar[0].name }}</div>
            </div>
            <Lyric ref="Lyrics" :LineHeight="LineHeight" />
          </div>
          <!-- 相关推送 -->
          <div class="otherInfo"></div>
        </div>
        <!-- 评论 -->
        <div class="comments">
          <Comment :isShowPublish ="false" type="0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CloudHeader } from "@/Layout/components";
import Comment from "@/components/Comment";
import Lyric from "@/components/Lyric";
import { mapState } from "vuex";
export default {
  name: "PlaylistCardDetail",
  data() {
    return {
      isVisible: true,
      needle: require("@/assets/images/needle.png"),
      coverall: require("@/assets/images/coverall.png"),
      //获取当前一句歌词的高度
      LineHeight: 0,
      // 当前歌词的索引
      lyricIndex: 0,
      // 当前音乐歌词数据
      lyricArr: [],
      // 当前歌曲的id
      musicId: "",
    };
  },
  mounted() {
    this.initData(this.$route.query.id);
  },
  methods: {
    // 初始化
    initData(id) {
      this.musicId = id;
      this.getLyric(id);
    },
    // 显示歌词的回调
    async getLyric(id) {
      const result = await this.$API.musicList.reqLyric(id);
      if (result.code === 200) {
        let lyrics = result.lrc.lyric;
        let arr = lyrics.split("\n");

        let lyricArr = [];

        //过滤空行,不去除后面split会出现undefined
        arr = arr.filter((item) => {
          if (item != "") {
            if (item.split("]")[1]) {
              return true;
            }
          }
        });

        arr.forEach((element) => {
          let str = element.split("[")[1];
          str = str.split("]")[0];
          let min = str.split(":")[0] * 60; //转换为分
          let sec = str.split(":")[1] * 1;
          let item = min + Math.floor(sec);

          // 二维数组
          lyricArr.push([item, element.split("]")[1]]);
        });
        this.lyricArr = lyricArr;
        this.$store.commit("playList/UPDATELYRIC", this.lyricArr);
      }
    },

    // 改变isPlaylistCardDetail的状态
    changeCardDetailState() {
      // 返回上一级
      this.$router.go(-1);
      // 改变状态
      this.$store.commit("playList/CHANGEPLAYLISTCARDDETAIL",false);
    },
  },
  computed: {
    ...mapState({
      musicList: (state) => {
        return state.playList.musicList;
      },
    }),
  },
  components: {
    CloudHeader,
    Lyric,
    Comment,
  },
  watch: {
    // 监听当前音乐的时间位置
    "$store.state.playList.currentTime"(val) {
      if (val) {
        this.$nextTick(() => {
          // 获取当前歌词的index
          this.$refs.Lyrics.getCurrentLyricLineIndex(val);
        });
      }
    },
    // 监听当前歌词的索引
    "$store.state.playList.lyricIndex"(lyricIndex, oldValue) {
      if (lyricIndex != oldValue) {
        const lyricLine = this.$refs.Lyrics.$refs.lyricLine;
        const lyricIndex = this.$store.state.playList.lyricIndex;
        this.LineHeight = -lyricLine[lyricIndex].offsetTop;
      }
    },
    // 监听vuex中musicId的变化
    "$store.state.playList.musicId"(id) {
      this.initData(id);
    },
  },
};
</script>

<style lang="less" scoped>
#playlistCardDetail-wrapper {
  // background: content-box linear-gradient(crimson, skyblue);
  width: 100%;
  height: 100%;
  z-index: 99;
  overflow: hidden;
  .bg {
    position: fixed;
    width: 100%;
    height: calc(100vh);
    background: content-box
      linear-gradient(rgb(202, 171, 179), rgb(100, 142, 184));
    // background-color: rgb(236, 239, 241);
  }
  .cardDetail {
    position: relative;
    height: calc(100vh - 80px);
    overflow-y: scroll;
    .header {
      position: fixed;
      top: 0;
    }
  }
  .el-icon-arrow-down {
    position: absolute;
    left: 30px;
    top: 25px;
    font-size: 20px;
    color: #585859;
    cursor: pointer;
    z-index: 9999;
  }
  .content {
    display: flex;
    flex-direction: column;
    margin-top: 110px;
    padding-bottom: 80px;
    .m-lycifo {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      .cvrwrap {
        position: relative;
        margin-top: 40px;
        margin-right: 10%;
        width: calc(20vw);
        .needle {
          position: absolute;
          top: 15px;
          left: 120px;
          width: 100px;
          height: 100px;
          transition: all 1s;
          transform-origin: left top;
          z-index: 999;

          &.active {
            transform: rotate(20deg);
            transform-origin: top left;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .u-cover {
          margin-top: 100px;
          border-radius: 50%;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background-color: rgba(144, 147, 153, 0.3);
          transition: all 10s;
          &.active {
            transform: rotate(360deg);
            transform-origin: center;
          }
          img {
            margin-top: 15px;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            background-size: 70%;
            background-position: center center;
          }
        }
      }
      .cnt {
        width: calc(30vw);
        height: 450px;
        .title {
          h2 {
            font-weight: normal;
            margin-bottom: 10px;
          }
          .des {
            color: #909399;
          }
        }
      }
    }
    .comments {
      width: calc(45vw);
      margin: 0 auto;
      .comment-wrapper {
        .comments-content {
          .comments-item {
            border-bottom: 1px solid rgb(144, 164, 174);
            .cntWrap {
              .des {
                color: #585859;
                .name {
                  color: rgb(207, 216, 220);
                }
              }
              .beReplied {
                background-color: transparent;
              }
            }
            .otherInfo {
              & > span {
                color: rgb(176, 190, 197);
              }
            }
          }
          & > button {
            padding: 5px 15px;
            border-radius: 50px;
            border: transparent;
            margin-left: calc(20vw + 5px);
            background-color: rgb(224, 224, 224);
            &:hover {
              background-color: rgb(207, 216, 220);
            }
          }
        }
      }
    }
  }
  .needleRotate {
    transform-origin: center;
    transform: rotate(22deg);
  }
  // 碟子设置旋转动画
  .coverAnimation {
    // 无限循环
    animation: cover 25s linear infinite;
    // 动画延迟一秒
    animation-delay: 0.8s;
  }
  @keyframes cover {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .el-pagination {
    button {
      min-width: 25px !important;
      height: 25px;
      line-height: 25px;
      border: 1px solid #dcdfe6;
      padding: 0;
      border-radius: 5px;
      background-color: transparent;
      i {
        padding: 0;
      }
      &:hover {
        color: #cfd8dc;
      }
    }
    .el-pager {
      li {
        min-width: 25px !important;
        padding: 0;
        margin: 0 5px;
        height: 25px;
        line-height: 25px;
        background-color: transparent;
        border: 1px solid #cfd8dc;
        font-size: 12px;
        box-sizing: border-box;
        border-radius: 5px !important;
        color: #666666;
        font-weight: normal;
        &:not(.disabled).active {
          color: #fff;
          background-color: transparent;
        }
        &:not(.disabled, .active):hover {
          color: #cfd8dc;
        }
      }
      .more::before {
        line-height: 20px;
      }
    }
  }
}
</style>
