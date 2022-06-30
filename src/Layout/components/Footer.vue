<template>
  <div class="footer-wrapper">
    <audio
      :src="songUrl"
      ref="audioPlayer"
      v-if="songUrl"
      autoplay
      @play="changeState(false)"
      @pause="changeState(true)"
    ></audio>
    <!-- 左边 -->
    <div class="musicInfo">
      <div class="avatar">
        <img :src="songDetail.al.picUrl" alt="" v-if="songDetail.al" />
        <img :src="picUrl" alt="" v-else />
      </div>
      <div class="otherInfo" v-if="songDetail && songDetail.name">
        <div class="songName">
          <span>{{ songDetail.name }}</span>
          <i class="iconfont icon-aixin2"></i>
        </div>
        <span class="creator">{{ songDetail.ar[0].name }}</span>
      </div>
    </div>

    <!-- 中间 -->
    <div class="control">
      <div class="operation">
        <ul>
          <li><i class="iconfont icon-23_shunxubofang"></i></li>
          <li><i class="iconfont icon-shangyishou"></i></li>
          <li class="icon" @click="changePlayState">
            <i
              class="iconfont icon-iconstop"
              v-if="!$store.state.playList.isPlay"
            ></i>
            <i class="iconfont icon-bofang1" v-else></i>
          </li>
          <li><i class="iconfont icon-xiayishou"></i></li>
          <li><span>词</span></li>
        </ul>

        <!-- 进度条 -->
        <div class="progressBar">
          <span class="currentTime">{{ currentTime | time }}</span>
          <el-slider v-model="timeProgress"></el-slider>
          <span class="totalTime">{{ duration }}</span>
        </div>
      </div>
    </div>

    <!-- 控制音量 -->
    <div class="volume">
      <ul>
        <li><span>标准</span></li>
        <li><i class="iconfont icon-24gl-volumeHigh"></i></li>
        <li><i class="iconfont icon-caidandakai"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      picUrl: require("@/assets/images/imgLoading.png"),
      // 进度条的位置
      timeProgress: 0,
      // 当前播放的时间
      currentTime: 0,
      // 音乐总时长
      duration: "00:00",
    };
  },
  methods: {
    // 获取当前的状态并更改
    changeState(isPlay) {
      this.$store.commit("playList/CHANGEPLAYSTATE", isPlay);
    },
    // 点击暂停键更改音乐的状态
    changePlayState() {
      // console.log(this.$store.state.playList.isPlay)
      this.$store.state.playList.isPlay ? this.playMusic() : this.pauseMusic()
    },
    // 暂停播放音乐
    pauseMusic(){
      this.$refs.audioPlayer.pause();
    },

    //播放音乐
    playMusic(){
      this.$refs.audioPlayer.play();
    }
  },
  computed: {
    ...mapState({
      songUrl: (state) => {
        return state.playList.songUrl.url;
      },
      songDetail: (state) => {
        return state.playList.songInfo;
      },
    }),
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
      float: left;
      width: 50px;
      height: 50px;
      background-color: aqua;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .otherInfo {
      float: left;
      width: 170px;
      margin: 5px 0 0 10px;
      font-size: 14px;
      text-align: left;
      .songName {
        width: 100%;
        position: relative;
        i {
          font-size: 18px;
          color: #909399;
          margin-left: 5px;
        }
      }
      span {
        max-width: 140px;
        float: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .creator {
        margin-top: 5px;
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
      }
    }
  }
}
</style>
