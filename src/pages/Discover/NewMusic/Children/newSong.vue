<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="list-item" v-for="(s, index) in SongData" :key="index">
      <table>
        <tr
          @dblclick="clickRow(s.id)"
          :class="{ isCurrent: currentRow == index }"
          @click="currentRow = index"
        >
          <td class="index">
            <span class="play" v-if="s.id == $store.state.playList.musicId">
              <i
                class="iconfont icon-volumeFull"
                v-if="!$store.state.playList.isPlay"
              ></i>
              <i class="iconfont icon-volumeHighFull" v-else></i>
            </span>
            <span v-else>{{ handleIndex(index) }}</span>
          </td>
          <td class="cover">
            <img v-lazy="s.album.picUrl" alt="" :key="s.album.picUrl" />
            <span class="icon">
              <i class="iconfont icon-bofangqi-bofang"></i>
            </span>
          </td>
          <td class="songName">{{ s.name }}</td>
          <td class="artist" v-if="s.artists">{{ s.artists[0].name }}</td>
          <td class="albumName">{{ s.album.name }}</td>
          <td class="duration">{{ s.duration | moment("mm:ss") }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "newSong",
  data() {
    return {
      loading: true,
      // 当前所点击的行
      currentRow: -1,
      // 新歌的数据
      SongData: [],
    };
  },
  props: {
    type: Number,
    default() {
      return 0;
    },
  },
  mounted() {
    this.getTopSong(this.type);
  },
  methods: {
    // 获取新歌速递数据
    async getTopSong(type) {
      const result = await this.$API.newMusic.reqTopSong(type);
      if (result.code === 200) {
        this.SongData = result.data;
        this.loading = false;
      }
    },

    // 双击行的回调
    clickRow(id) {
      console.log(id)
      // 更新vuex的musicId
      this.$store.commit("playList/UPDATEMUSICID", id);

      // 更新歌单列表
      this.$store.commit("playList/GETSONGDETAIL", this.SongData);
    },

    // 处理index
    handleIndex(index) {
      index = index + 1;
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },
  },
  watch: {
    // 监听type
    type(val) {
      this.loading = true;
      this.getTopSong(val);
    },
  },
};
</script>

<style lang="less" scoped>
.list-item {
  text-align: left;
  font-size: 13px;
  width: 100%;
  margin-bottom: 10px;
  .index {
    width: 30px;
    color: #909399;
    text-align: center;
    .play {
      color: rgb(236, 65, 65);
    }
  }
  .cover {
    position: relative;
    width: 60px;
    height: 60px;
    text-align: center;
    img {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      vertical-align: middle;
    }
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      .icon-bofangqi-bofang {
        color: rgb(236, 65, 65);
        cursor: pointer;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        font-size: 25px;
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }
  .songName {
    width: calc(27vw);
    font-size: 14px;
    color: #333;
  }
  .artist {
    width: 150px;
  }
  .albumName {
    width: calc(15vw);
  }
  .duration {
    width: 50px;
    text-align: center;
    color: #909399;
  }
  table {
    // 合并边框
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    vertical-align: middle;
    tr {
      height: 80px;
      line-height: 80px;
      td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &:hover {
        background-color: rgba(173, 175, 175, 0.1);
      }
      &.isCurrent {
        background-color: rgba(173, 175, 175, 0.1);
      }
    }
  }
}
</style>
