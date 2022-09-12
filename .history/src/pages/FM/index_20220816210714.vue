<template>
  <div class="fm-wrap">
    <div class="songInfo">
      <div class="card">
        <div class="tracks">
          <div
            class="cover"
            v-for="(t, index) in tracks"
            :key="index"
            :class="changeClass(index)"
          >
            <img v-lazy="t.album?.picUrl" alt="" @click="pre(index)" />
          </div>
          <i
            class="iconfont icon-bofangqi-bofang"
            @click="changePlayStatus(true)"
            v-if="!this.$store.state.playList.isPlay"
          ></i>
          <i
            class="iconfont icon-iconstop"
            v-else
            @click="changePlayStatus(false)"
          ></i>
        </div>

        <div class="operation">
          <!-- 喜欢 -->
          <button
            class="liked"
            @click="throttleLike(true)"
            v-if="!musicList.isLike"
          >
            <i class="iconfont icon-aixin2"></i>
          </button>

          <button class="liked" @click="throttleLike(false)" v-else>
            <i class="iconfont icon-aixin3"></i>
          </button>

          <!-- 删除 -->
          <button class="delete" @click="handleDeleteMusic">
            <i class="el-icon-delete"></i>
          </button>

          <!-- 下一首 -->
          <button class="next" @click="throttleNext">
            <i class="iconfont icon-xiayishou"></i>
          </button>

          <!-- 更多 -->
          <button class="more">
            <i class="el-icon-more"></i>
          </button>
        </div>
      </div>

      <div class="lyric">
        <div class="songName"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "@/utils";
export default {
  name: "FM",
  data() {
    return {
      // 播放列表
      tracks: [],
      // 当前所播放的歌曲的索引
      current_song_index: 0,
      // 当前播放的歌曲
      current_song: {},
      // 是否点击了下一首
      isNext: true,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      this.getPersonalFm("first");
    },

    // 获取随机播放数据
    async getPersonalFm(first) {
      const result = await this.$API.musicList.reqPersonalFm();
      if (result.code == 200) {
        const { data } = result;

        // 给每首歌曲添加isLike属性
        data.forEach((element) => {
          element.isLike = false;
        });

        this.tracks = this.tracks.concat(data);

        // todo 将tracks存储到vuex
        this.$store.commit("playList/GETSONGDETAIL", this.tracks);

        // 判断是否为第一次调用
        if (first) {
          // todo 更新当前的musicId
          this.$store.commit(
            "playList/UPDATEMUSICID",
            this.tracks[this.current_song_index].id
          );
        }
      }
    },

    // 喜欢音乐
    /* async getLikeMusic(id, like) {
      this.$API.musicList
        .reqLikeMusic(id, like)
        .then((value) => {
          this.current_song.isLike = like;
          if (like) {
            this.$message({
              message: "已添加到我喜欢的音乐",
              type: "success",
              offset: 100,
            });
          } else {
            this.$message({
              message: "取消喜欢成功",
              type: "warning",
              offset: 100,
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: "操作失败",
            type: "error",
            offset: 100,
          });
        });
    }, */

    async getLikeMusic(id, like) {
      this.$API.musicList.reqLikeMusic(id, like).then((value) => {
        console.log(value, "-");
      });
    },

    // 处理喜欢的音乐
    handleLike(flag) {
      let { id } = this.tracks[this.current_song_index];

      this.getLikeMusic(id, flag);

      // this.$store.dispatch('playList/getLikeMusic',{id,flag})
      // this.musicList.isLike = flag
    },

    throttleLike: throttle(function (flag) {
      this.handleLike(flag);
    }, 2000),

    // 添加class
    changeClass(index) {
      if (index === this.current_song_index) {
        this.current_song = this.tracks[index];
        return "center";
      } else if (index === this.current_song_index - 1) {
        return "left";
      } else if (index === this.current_song_index - 2) {
        return "before";
      }
    },

    // 切换为下一首
    next() {
      this.isNext = true;
      this.current_song_index++;
      this.changePlayStatus(true);
    },

    // 节流，控制下一首
    throttleNext: throttle(function () {
      this.next();
    }),

    // 上一首
    pre(index) {
      if (this.current_song_index == 0) return;

      this.isNext = true;

      if (this.current_song_index != index) {
        this.current_song_index = index;
      }

      this.changePlayStatus();
    },

    // 移除歌曲
    async getFm_trash(id) {
      const result = await this.$API.musicList.reqFm_trash(id);
      this.tracks.splice(this.current_song_index, 1);

      this.isNext = true;

      // todo 更新当前的musicId
      this.$store.commit(
        "playList/UPDATEMUSICID",
        this.tracks[this.current_song_index].id
      );

      this.getPersonalFm();

      this.$message({
        message: "已成功移除",
        type: "success",
        offset: 100,
      });
    },

    // 处理不喜欢的歌曲
    handleDeleteMusic() {
      let { id } = this.current_song;
      this.getFm_trash(id);
    },

    // 改变播放的状态
    changePlayStatus(flag) {
      // 修改当前播放状态
      this.$store.commit("playList/CHANGEPLAYSTATE", flag);
      const { current_song_index: index } = this;

      // 获取当前所播放歌曲的id
      let { id } = this.tracks[index];

      this.$store.commit("playList/UPDATEMUSICID", id);
    },
  },
  computed: {
    ...mapState({
      // 当前的所有歌曲列表
      musicAllList(state) {
        return state.playList.musicAllList;
      },
      // 当前歌曲详情
      musicList(state) {
        return state.playList.musicList || {};
      },
    }),
  },
  watch: {
    // 监听vuex中musicId的变化
    "$store.state.playList.musicId"(id) {
      // 是否点击了下一首
      if (!this.isNext) {
        this.current_song_index++;
      }

      if (this.current_song_index === 2) {
        // 不是第一次调用，避免this.current_song_index++
        this.getPersonalFm();
      } else if (this.current_song_index > 3) {
        this.tracks = this.tracks.slice(
          this.current_song_index - 1,
          this.tracks.length
        );
        this.current_song_index = 1;
      }

      this.isNext = false;
    },
  },
};
</script>

<style lang="less" scoped>
.fm-wrap {
  width: 75vw;
  margin: 0 auto;
  .songInfo {
    width: 50vw;
    margin: 100px auto;
    .card {
      position: relative;
      width: 350px;
      overflow: hidden;
      .tracks {
        height: 300px;
        position: relative;
        .cover {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid @border-color;
          border-radius: 10px;
          overflow: hidden;
          box-sizing: border-box;
          transform: translateX(50px);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .left {
          transform: scale(0.8);
          transform-origin: left;
          transition: all 0.5s ease;
        }
        .right {
          transform: scale(0.8) translateX(200px);
          transition: all 0.5s ease;
          z-index: -1;
        }
        .before {
          display: none;
        }
        .center {
          z-index: 1;
          transition: all 0.5s ease;
        }
        i {
          position: absolute;
          z-index: 2;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          color: rgb(236, 65, 65);
          cursor: pointer;
        }
        .icon-bofangqi-bofang {
          right: 125px;
          font-size: 50px;
          top: 125px;
        }
        .icon-iconstop {
          right: 10px;
          bottom: 10px;
          font-size: 20px;
          padding: 10px;
        }
      }
      .operation {
        margin-top: 50px;
        width: 300px;
        text-align: left;
        transform: translateX(50px);
        display: flex;
        justify-content: space-between;
        button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid @border-color;
          cursor: pointer;
          background-color: transparent;
          &:hover {
            background-color: @bg-color-hover;
          }
          i {
            font-size: 22px;
          }
        }
        .icon-aixin3 {
          color: rgb(236, 65, 65);
        }
      }
    }
  }
}
</style>
