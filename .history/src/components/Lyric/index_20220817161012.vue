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
    <div class="lyric-list" ref="lyricWrap">
      <p
        class="text"
        ref="lyricLine"
        v-for="(line, index) in lyricList"
        :key="index"
        :class="{ currentLyricsItem: index == lyricsIndex - 1 }"
        :style="{
          transform: 'translateY(' + LineHeight + 'px)',
        }"
      >
        <span>{{ line[1] }}</span>
      </p>
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
      lyricsIndex: null,
    };
  },
  props: ["LineHeight"],
  mounted() {},
  methods: {
    // 获取当前歌词的索引
    getCurrentLyricLineIndex(currentTime) {
      let lyricsIndex = 0;
      console.log(lyricsIndex);
      this.lyricList.some((item) => {
        if (lyricsIndex < this.lyricList.length - 1) {
          if (currentTime > item[0]) {
            lyricsIndex += 1;
          }
          return currentTime <= item[0];
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
  watch: {},
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
      }
      .artist{
        span{
          color: @artist-color;
          .line{
            margin: 0 5px;
          }
          &:last-child{
            .line{
              display: none;
            }
          }
        }
      }
    }
  }
  .lyric-list {
    transform: translateY(100px);
    height: 400px;
    overflow-y: scroll;
    font-size: 14px;
    & > .currentLyricsItem {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
