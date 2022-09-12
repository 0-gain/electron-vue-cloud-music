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
      lyricsIndex: -1,
      LineHeight: 0,
    };
  },
  methods: {
    // 获取当前歌词的索引
    getCurrentLyricLineIndex(currentTime) {
      console.log(currentTime);
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
    "$store.state.playList.currentTime"(currentTime) {
      getCurrentLyricLineIndex(currentTime)
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
      transform: translateY(100px);
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
