<template>
  <div class="lyric-wrapper">
    <div class="musicInfo">
      <h3>{{musicList.name}}</h3>
      <template>
        <span class="album">专辑：{{musicList.al?.name}}</span>
        <span class="artist">歌手：
          <span v-for="(a,index) in musicList.ar" :key="index">
            <span>
              <span>{{a.name}}</span>
              <span class="line">/</span>
            </span>
          </span>
        </span>
      </template>
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
  height: calc(50vh - 50px);
  overflow: hidden;
  overflow-y: scroll;
  .musicInfo{
    text-align: left;
    margin-left: 30px;
    h3{
      margin-top: 0;
      font-weight: normal;
    }
    span{
      font-size: 12px;
      color: #606266;
      &:last-child{
      }
    }
  }
  .lyric-list {
    transform: translateY(100px);
    font-size: 14px;
    & > .currentLyricsItem {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
