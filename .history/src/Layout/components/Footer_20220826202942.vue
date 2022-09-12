<template>
  <div class="footer-wrapper">
    <audio
      :src="currentMusicUrl"
      ref="audioPlayer"
      v-if="currentMusicUrl"
      autoplay
      @play="changeState(true)"
      @pause="changeState(false)"
      @ended="changeMusic('next')"
      @timeupdate="timeupdate"
    ></audio>
    <!-- 左边 -->
    <div class="musicInfo">
      <div
        class="avatar"
        @mouseenter="isMask = true"
        @mouseleave="isMask = false"
      >
        <img :src="musicList.al?.picUrl" alt="" v-if="musicList.al" />
        <img :src="picUrl" alt="" v-else />
        <i
          class="el-icon-arrow-up"
          :class="{ active: isMask }"
          @click="showCardDetail"
        ></i>
      </div>

      <div class="otherInfo">
        <div class="songName">
          <span>{{ musicList.name }}</span>
          <i
            class="iconfont icon-aixin2"
            @click="handleLike(true)"
            v-if="!isLike"
          ></i>
          <i class="iconfont icon-aixin3" @click="handleLike(false)" v-else></i>
        </div>
        <div class="creator clearfix">
          <span
            v-for="(a, index) in musicList.ar"
            :key="index"
            class="nameItem"
          >
            <span>{{ a.name }}</span>
            <span class="line">/</span>
          </span>
        </div>
      </div>
    </div>

    <!-- 中间 -->
    <div class="control">
      <div class="operation">
        <ul>
          <li>
            <i class="iconfont icon-23_shunxubofang"></i>
          </li>

          <li @click="changeMusic('pre')">
            <i class="iconfont icon-shangyishou"></i>
          </li>
          <li class="icon" @click="musicList.id ? changePlayState() : ''">
            <i
              class="iconfont icon-bofang1"
              v-if="!$store.state.playList.isPlay"
            ></i>
            <i class="iconfont icon-iconstop" v-else></i>
          </li>
          <li @click="changeMusic('next')">
            <i class="iconfont icon-xiayishou"></i>
          </li>
          <li @click="musicId ? showMusicWord() : ''"><span>词</span></li>
        </ul>

        <!-- 进度条 -->
        <div class="progressBar">
          <span class="currentTime">{{ currentTime | time }}</span>
          <el-slider
            v-model="timeProgress"
            :disabled="musicList.length === 0"
            :max="maxTime"
            @change="changeProgress"
          ></el-slider>
          <span class="totalTime">{{ duration | time }}</span>
        </div>
      </div>
    </div>

    <!-- 控制音量 -->
    <div class="volume">
      <ul>
        <li><span>标准</span></li>
        <li
          @mouseenter="isShowVolumeSlider = true"
          @mouseleave="isShowVolumeSlider = false"
        >
          <i
            @click="changeVolumeState(true)"
            class="iconfont icon-24gl-volumeHigh"
            v-if="!isVolumeCross"
          ></i>
          <i
            @click="changeVolumeState(false)"
            class="iconfont icon-24gl-volumeCross"
            v-else
          ></i>
          <el-slider
            v-model="volume"
            :class="{ active: isShowVolumeSlider }"
            vertical
            height="70px"
            :show-tooltip="false"
            @input="changeVolume"
          >
          </el-slider>
        </li>
        <li @click="showDrawer">
          <i class="iconfont icon-caidandakai"></i>
        </li>
      </ul>
    </div>

    <!-- 播放列表 -->
    <el-drawer
      title="当前播放"
      :visible.sync="isShowDialog"
      direction="rtl"
      :modal="false"
      :show-close="false"
    >
      <ul>
        <li class="totalSongs">总{{ drawerList.length }}首</li>
        <li class="cleanList" @click="cleanDrawerList">清空列表</li>
        <li class="collect">
          <i class="iconfont icon-folder-add"></i>
          <span>收藏全部</span>
        </li>
      </ul>
      <el-table
        :data="drawerList"
        stripe
        style="width: 100%"
        @row-dblclick="clickRow"
        highlight-current-row
        :row-class-name="tableRowClass"
      >
        <el-table-column width="20">
          <template slot-scope="{ row }">
            <div class="icon" v-show="musicId == row.id">
              <i
                class="iconfont icon-iconstop"
                v-if="$store.state.playList.isPlay"
              ></i>
              <i class="iconfont icon-bofang1" v-else></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name"> </el-table-column>
        <el-table-column prop="ar[0].name"> </el-table-column>
        <el-table-column width="50">
          <template slot-scope="{ row }">
            {{ row.dt | time }}
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Test from "@/components/Test";
// 保存当前的变量
let currentVolume = 0;
export default {
  name: "Footer",
  data() {
    return {
      picUrl: require("@/assets/images/imgLoading.png"),
      drawerList: [], //抽屉播放列表的音乐数据
      // 进度条的位置
      timeProgress: 0,
      // 当前播放的时间
      currentTime: 0,
      // 音乐总时长
      duration: 0,
      // 当前音乐的id
      musicId: "",
      maxTime: 100, //滑块最大的值
      isVolumeCross: false, //当前是否静音
      volume: 50, //当前的音量
      isShowVolumeSlider: false,
      isShowDialog: false, //是否显示抽屉
      isMask: false, //悬浮是否给avatar显示蒙版
      loading: false,
    };
  },
  mounted() {
    this.$store.dispatch("user/getUserLikeList");
  },
  methods: {
    // 点击切换歌曲
    changeMusic(str) {
      let index = this.musicAllList.findIndex(
        (list) => list.id === this.musicList.id
      );
      if (str === "next") {
        this.musicId = this.musicAllList[index + 1].id;
      } else {
        if (index != 0) {
          this.musicId = this.musicAllList[index - 1].id;
        } else {
          this.musicId = this.musicAllList[this.musicAllList.length - 1].id;
        }
      }
      // 更改id的状态
      this.$store.commit("playList/UPDATEMUSICID", this.musicId);
    },

    //显示歌词
    showMusicWord() {
      // this.getLyric();
    },

    // 显示音乐详情页
    showCardDetail() {
      if(this.$route.name == "FM") return
      const id = this.musicId
        ? this.musicId
        : this.$store.state.playList.musicId;
      // 改变状态
      const flag = this.$store.state.playList.isPlaylistCardDetail;
      if (!flag) {
        this.$router.push({ path: "/playListCardDetail", query: { id } });
        this.$store.commit("playList/CHANGEPLAYLISTCARDDETAIL", true);
      } else {
        this.$router.back();
        this.$store.commit("playList/CHANGEPLAYLISTCARDDETAIL", false);
      }
    },

    // 获取当前的状态并更改
    changeState(isPlay) {
      this.$store.commit("playList/CHANGEPLAYSTATE", isPlay);
    },

    // 点击暂停键更改音乐的状态
    changePlayState() {
      !this.$store.state.playList.isPlay ? this.playMusic() : this.pauseMusic();
    },

    // 当前播放时间位置
    timeupdate() {
      // fee：1 试听歌曲
      if (this.currentMusicUrl) {
        // 当前播放的时间
        let time = this.$refs.audioPlayer.currentTime;
        // 获取总时间
        this.duration = this.$store.state.playList.duration;
        // 当前歌曲总时长
        let totalTime = this.duration / 1000;

        this.maxTime = Math.floor(totalTime);
        this.timeProgress = Math.floor(time);
        this.currentTime = time * 1000;
        // 更新当前播放时间的位置
        this.$store.commit("playList/UPDATECURRENTTIME", Math.ceil(time));
      }
    },

    // 拖动滑块
    changeProgress(val) {
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = val;
    },

    // 是否显示为静音
    changeVolumeState(flag) {
      this.isVolumeCross = flag;
      if (flag) {
        // 显示为静音
        currentVolume = this.volume;
        this.volume = 0;
      } else {
        this.volume = currentVolume;
      }
    },
    // 拖动改变音量
    changeVolume(val) {
      this.$refs.audioPlayer.volume = val / 100;
      if (this.isVolumeCross && val > 0) {
        this.isVolumeCross = false;
      } else if (val == 0 && this.isVolumeCross == false) {
        this.isVolumeCross = true;
      }
    },
    // 暂停播放音乐
    pauseMusic() {
      this.$store.commit("playList/CHANGEPLAYSTATE", false);
    },

    //播放音乐
    playMusic() {
      this.$store.commit("playList/CHANGEPLAYSTATE", true);
    },

    // 双击播放（播放列表）
    clickRow(e) {
      this.$store.commit("playList/UPDATEMUSICID", e.id);
    },

    // 给当前播放的musicId添加class
    tableRowClass({ row }) {
      if (row.id == this.musicId) {
        return "active-row";
      }
      return "";
    },

    // 显示抽屉的播放列表
    showDrawer() {
      this.isShowDialog = !this.isShowDialog;
      this.drawerList = this.musicAllList;
    },

    // 喜欢歌曲
    handleLike(flag) {
      if(flag){
        this.userLikeList.push(this.musicId)
      }else{
        this.userLikeList.splice(this.userLikeList.indexOf(this.musicId),1)
      }
      this.$store.dispatch('playList/getLikeMusic',{id:this.musicId,flag})
    },

    // 清空抽屉的播放列表
    cleanDrawerList() {
      this.drawerList = [];
      this.pauseMusic();
      // 清空当前播放音乐的数据
      this.$store.commit("playList/RESETCURRENTMUSICK");
      this.currentTime = 0;
      this.timeProgress = 0;
      this.duration = 0;
    },
  },
  computed: {
    ...mapState({
      musicList: (state) => {
        return state.playList.musicList || {};
      },
      musicAllList: (state) => {
        return state.playList.musicAllList || [];
      },
      currentMusicUrl: (state) => {
        return state.playList.songUrl;
      },
      userLikeList: (state) => {
        return state.user.userLikeList
      },
    }),

    ...mapGetters(["isLike"]),
  },

  watch: {
    // 监听vuex中musicId的变化
    "$store.state.playList.musicId"(id) {
      this.musicId = id;
      // todo 获取当前歌曲的url
      this.$store.dispatch("playList/getSongUrl", id);

      // todo 获取当前歌曲详情
      this.$store.dispatch("playList/getSongDetail", id);
    },

    // 监听vuex中的播放状态
    "$store.state.playList.isPlay"(isPlay) {
      isPlay ? this.$refs.audioPlayer.play() : this.$refs.audioPlayer.pause();
    },
  },
  components: {
    Test,
  },
};
</script>

<style lang="less" scope>
.footer-wrapper {
  margin: 0 10px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  .musicInfo {
    width: 250px;
    height: 100px;
    margin: 10px 0 0 10px;
    .avatar {
      position: relative;
      float: left;
      width: 50px;
      height: 50px;
      background-color: aqua;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      i {
        position: absolute;
        left: 0;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background-color: rgba(12, 12, 12, 0.1);
        backdrop-filter: blur(1px);
        z-index: 99;
        color: #e4e7ed;
        border-radius: 5px;
        display: none;
        &.active {
          display: inline-block;
        }
      }
    }
    .otherInfo {
      float: left;
      width: 170px;
      margin: 5px 0 0 10px;
      font-size: 14px;
      text-align: left;
      .songName {
        span {
          display: inline-block;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
        }
        i {
          font-size: 18px;
          color: #909399;
          margin-left: 5px;
        }
        .icon-aixin3 {
          color: rgb(236, 65, 65);
        }
      }
      .creator {
        margin-top: 5px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .nameItem {
          .line {
            margin: 0 5px;
          }
          &:last-child {
            .line {
              display: none;
            }
          }
        }
      }
    }
  }
  .control {
    width: 400px;
    height: 70px;
    .operation {
      overflow: hidden;
      ul {
        margin: 10px 0 0 55px;
        height: 30px;
        li {
          float: left;
          width: 30px;
          height: 30px;
          line-height: 30px;

          border-radius: 50%;
          margin: 0 10px;
          font-size: 14px;
          cursor: pointer;
          i {
            font-size: 20px;
          }
          &:hover {
            color: rgb(236, 65, 65);
          }
        }
        .icon {
          margin-top: -5px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          background-color: rgba(181, 183, 183, 0.1);
          i {
            font-size: 20px;
            color: #333;
            margin-left: 5px;
          }
          &:hover {
            background-color: rgba(100, 150, 150, 0.1);
          }
          .icon-iconstop {
            margin-left: 0;
          }
        }
      }
      .progressBar {
        position: relative;
        height: 25px;
        line-height: 25px;
        .currentTime {
          position: absolute;
          left: 0;
          font-size: 12px;
        }
        .totalTime {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 12px;
        }
      }
      .el-slider__runway {
        top: -4px;
        width: 80%;
        margin-left: 40px;
        height: 3px;
      }
      .el-slider__button {
        margin-top: -3px;
        width: 7px;
        height: 7px;
        border: none;
        background-color: #fff;
        border: 1px solid #e4e7ed;
      }
      .el-slider__bar {
        background-color: rgb(236, 65, 65);
        height: 3px;
      }
    }
  }
  .volume {
    width: 200px;
    height: 70px;
    line-height: 70px;
    ul {
      float: left;
      li {
        position: relative;
        float: left;
        margin-left: 30px;
        span {
          border: 1px solid;
          font-size: 12px;
          padding: 2px 3px;
        }
        i {
          font-size: 20px;
        }
        .is-vertical {
          position: absolute;
          display: none;
          width: 25px;
          bottom: 50px;
          left: -5px;
          background-color: #fff;
          box-shadow: 0 0 10px #e5e5e5;
          height: 100px;
          .el-slider__runway {
            width: 3px;
            margin-top: 15px;
            left: -5px;
            .el-slider__bar {
              width: 3px;
              background-color: rgb(236, 65, 65);
            }
            .el-slider__button-wrapper {
              left: -16.5px;
              .el-slider__button {
                width: 6px;
                height: 6px;
                background-color: rgb(236, 65, 65);
                border: 1px solid rgb(236, 65, 65);
              }
            }
          }
        }
        .active {
          display: block;
          z-index: 9999;
        }
      }
    }
  }
  .el-drawer__wrapper {
    top: 60px;
    bottom: 70px;

    .el-drawer__header {
      text-align: left;
      margin-bottom: 0;
      span {
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .el-drawer__body {
      ul {
        float: left;
        position: fixed;
        z-index: 9;
        width: 420px;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
        background-color: #fff;
        border-bottom: 1px solid #e6e4e4;
        li {
          float: left;
          &.totalSongs {
            font-size: 12px;
            color: #909399;
          }
          &.collect {
            float: right;
            font-size: 13px;
            i {
              float: left;
              font-size: 20px;
              margin-right: 3px;
            }
          }
          &.cleanList {
            float: right;
            margin: 0 10px;
            font-size: 13px;
            color: steelblue;
          }
        }
      }
      .el-table {
        padding-top: 10px;
      }
      .el-table .el-table__cell {
        padding: 5px 0;
      }
      .el-table td.el-table__cell div {
        padding-left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        i {
          font-size: 12px;
          color: rgb(236, 65, 65);
        }
      }
      .el-table td.el-table__cell .icon {
        text-align: center;
      }
    }
    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
      border-bottom: none;
    }
    .el-table .cell {
      padding-right: 0;
    }
    .el-table__body tr.current-row > td {
      background-color: #e6e4e4 !important;
    }
    .active-row div {
      color: rgb(236, 65, 65) !important;
    }
  }
}
</style>
