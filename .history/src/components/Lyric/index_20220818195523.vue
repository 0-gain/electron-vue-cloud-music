<template>
  <div class="lyric-wrapper">
    <div class="musicInfo">
      <h3>{{ musicList.name }}</h3>
      <div class="other">
        <span class="album">专辑：{{ musicList.al?.name }}</span>
        <span class="artist"
          >歌手：
          <span v-for="(a, index) in musicList.ar" :key="index">
            <span>{{ a.name }}</span>
            <span class="line">/</span>
          </span>
        </span>
      </div>
    </div>
    <div class="content" ref="scrollWrap">
      <div class="lyric-list" ref="lyricWrap">
        <p
          class="text"
          ref="lyricLine"
          v-for="(line, index) in lyricList"
          :key="index"
          :class="{ currentLyricsItem: index == lyricsIndex - 1 }"
        >
          <span>{{ line[1] }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Lyric",
  data() {
    return {
      // 当前播放歌词的索引
      lyricsIndex: 0,
      LineHeight: 0,
    };
  },
  methods: {
    // 获取当前歌词的索引
    getCurrentLyricLineIndex(currentTime) {
      let lyricsIndex = 0;
      this.lyricList.forEach((item) => {
        if (lyricsIndex < this.lyricList.length) {
          if (currentTime > item[0]) {
            lyricsIndex += 1;
          }
        }
      });
      this.$store.commit("playList/UPDATELYRICINDEX", lyricsIndex);
      this.lyricsIndex = lyricsIndex;
    },
  },
  computed: {
    ...mapState({
      // 歌词
      lyricList: (state) => {
        return state.playList.lyric;
      },
      // 当前播放音乐的数据
      musicList: (state) => {
        return state.playList.musicList;
      },
    }),
  },
  watch: {
    // 监听当前音乐的时间位置
    "$store.state.playList.currentTime"(currentTime) {
      this.getCurrentLyricLineIndex(currentTime);

      const lyricIndex = this.$store.state.playList.lyricIndex
      const lyricLine = this.$refs.lyricLine

      let top = lyricLine[lyricIndex].offsetTop - 150
      this.$refs.scrollWrap.scrollTo({top,behavior:'smooth'})
      console.log(this.lyricList[lyricIndex].offsetTop)
    },

  },
};
</script>

<style lang="less" scope>
.lyric-wrapper {
  margin-top: 50px;
  width: 320px;
  .musicInfo {
    text-align: left;
    h3 {
      margin-top: 0;
      font-weight: normal;
    }
    .other {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #606266;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .artist {
        margin-left: 10px;
        span {
          color: @artist-color;
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
  .content {
    margin-top: 30px;
    height: 320px;
    overflow: hidden;
    overflow-y: scroll;
    .lyric-list {
      transform: translateY(150px);
      font-size: 13px;
      p {
        margin: 25px 0;
      }
      & > .currentLyricsItem {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
