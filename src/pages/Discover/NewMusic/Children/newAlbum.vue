<template>
  <div>
    <div class="newAlbum-wrapper">
      <div class="title showTitle">{{ title }}</div>
      <div class="newAlbum-content">
        <div class="newAlbum-item" v-for="(w, index) in albumData" :key="index">
          <div class="cover">
            <div
              class="pic"
              @mouseenter="changeIconShowState(w)"
              @mouseleave="w.isShowIcon = false"
            >
              <img
                v-lazy="w.blurPicUrl"
                :key="index"
                alt=""
                @click="goAlbumDetail(w.id)"
              />
              <transition name="fade">
                <i
                  class="iconfont icon-bofangqi-bofang"
                  v-show="w.isShowIcon"
                  @click="changePlayState(w.id)"
                ></i>
              </transition>
            </div>
          </div>
          <div class="otherInfo">
            <div class="songName">{{ w.name }}</div>
            <div class="artistsName" v-if="w.artist">{{ w.artist.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewAlbum",
  data() {
    return {
      // 当前悬浮的专辑
      currentAlbum: -1,
      // 当前专辑的歌曲列表
      SongsData: [],
      // 当前歌曲的id
      musicId: "",
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    albumData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 改变icon的状态
    changeIconShowState(w) {
      if (w.hasOwnProperty("isShowIcon")) {
        w.isShowIcon = true;
      } else {
        this.$set(w, "isShowIcon", true);
      }
    },

    // 跳转至专辑详情
    goAlbumDetail(id) {
      this.$router.push({ path: "/album", query: { id } });
    },

    // 获取专辑详情
    async getAlbumDetail(id) {
      const result = await this.$API.singer.reqAlbumDetail(id);
      if (result.code === 200) {
        this.SongsData = result.songs;
        this.musicId = result.songs[0].id;
      }
    },
    // 更新播放的状态
    changePlayState(id) {
      this.getAlbumDetail(id);
    },
  },
  watch: {
    // 监听当前音乐id的变化
    musicId(val) {
      // todo 将当前的id存入vuex中
      this.$store.commit("playList/UPDATEMUSICID", val);
      // todo 更新播放列表
      this.$store.commit("playList/GETSONGDETAIL", this.SongsData);
    },
  },
};
</script>

<style lang="less" scoped>
.newAlbum-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .title {
    width: 40px;
  }
  .newAlbum-content {
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .newAlbum-item {
      margin-bottom: 15px;
      .cover {
        width: calc(15vw);
        max-width: 190px;
        aspect-ratio: 1;
        background: url("~@/assets/images/album_cover.png") right 10% no-repeat;
        text-align: left;
        background-size: 100%;
        .pic {
          position: relative;
          width: 90%;
          height: 90%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            cursor: pointer;
          }
          .icon-bofangqi-bofang {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            color: rgb(236, 65, 65);
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 40px;
            background-color: rgba(255, 255, 255, 0.9);
          }
        }
      }
      .otherInfo {
        width: 150px;
        font-size: 14px;
        text-align: left;
        .songName {
          margin-bottom: 7px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .artistsName {
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}
</style>
