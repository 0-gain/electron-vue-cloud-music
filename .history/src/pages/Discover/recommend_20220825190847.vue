<template>
  <div>
    <div class="content" ref="content">
      <Carousel />

      <!-- 推荐歌单 -->
      <div class="songMenu">
        <div class="title clearfix">
          <h3>
            推荐歌单
            <i class="iconfont">&#xe743;</i>
          </h3>
        </div>
        <List-item
          :listData="menuInfo"
          :isShowIcon="false"
          @changeRoute="goRoutePlaylist"
        />
      </div>

      <!-- 独家放送 -->
      <div class="private-content">
        <div
          class="title clearfix"
          @click="$router.push({ path: '/video/privateContentList' })"
        >
          <h3>独家放送</h3>
          <i class="iconfont icon-arrow-right"></i>
        </div>

        <List-item
          :listData="privateContentInfo"
          :isShowIcon="true"
          @changeRoute="goRouteMvDetail"
          :isShowCounts="false"
        />
      </div>

      <!-- 最新音乐 -->
      <div class="newSong">
        <div class="title clearfix">
          <h3>最新音乐</h3>
          <i class="iconfont">&#xe743;</i>
        </div>
        <div class="wrapper">
          <div class="content" v-for="item in newSongInfo" :key="item.id">
            <div class="pic" @click="changePlayState(item.id)">
              <a href="javascript:;">
                <img :src="item.picUrl" alt="" />
              </a>
              <i
                :style="{
                  background: 'url(' + videoBg + ') no-repeat center',
                  'background-size': '100% 100%',
                }"
              ></i>
            </div>
            <div class="msg">
              <p class="name">{{ item.name }}</p>
              <span>{{ item.song.artists[0].name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐MV -->
      <div class="video-wrapper">
        <MvItem :mvData="mvInfo" :hidden="3" @changeRoute="goRouteMvDetail">
          <template v-slot:title>
            <h3>推荐MV</h3>
            <i class="iconfont icon-arrow-right"></i>
          </template>
        </MvItem>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import ListItem from "@/components/list-item";
import MvItem from "@/components/Mv-Item";

export default {
  name: "Recommend",
  data() {
    return {
      limit: 10, //显示多少条推荐歌单的歌单数量
      menuInfo: [], //推荐歌单的数据
      privateContentInfo: [], //独家欢送数据
      newSongInfo: [], //新歌信息
      mvInfo: [], //mv相关信息
      videoBg: require("@/assets/images/video.png"),
      currentId: null,
      id: null,
    };
  },

  mounted() {
    this.getRecommendSongMenu();
    this.getPrivateContent();
    this.getNewSong();
    this.getMV();
  },
  methods: {
    // * 获取推荐歌单
    async getRecommendSongMenu() {
      const result = await this.$API.recommend.reqRecommendSongMenu(this.limit);
      this.menuInfo = result.result;
    },

    // *显示当前歌单详情
    showPlaylistDetail(id) {
      this.$router.push({
        path: "/playList",
        query: {
          id,
        },
      });
    },

    // 显示推荐歌单的Icon
    showIcon(item) {
      if (item.hasOwnProperty("showIcon")) {
        item.showIcon = true;
      } else {
        this.$set(item, "showIcon", true);
      }
    },

    // 隐藏推荐歌单的Icon
    hiddenIcon(item) {
      item.showIcon = false;
    },

    // * 获取独家放送
    async getPrivateContent() {
      const result = await this.$API.recommend.reqPrivateContent();
      this.privateContentInfo = result.result;
    },

    // * 获取新音乐
    async getNewSong() {
      const result = await this.$API.recommend.reqNewSong(12);
      this.newSongInfo = result.result;
    },

    //* 获取MV
    async getMV() {
      const result = await this.$API.recommend.reqMV();
      this.mvInfo = result.result;
    },

    // 路由跳转(自定义事件)
    goRouteMvDetail(data) {
      let id;
      if (data.hasOwnProperty("id")) {
        id = data.id;
      } else {
        id = data;
      }
      this.$router.push({ path: "/mvDetail", query: { id, type: "MV" } });
    },

    // 路由跳转(自定义事件)
    goRoutePlaylist({ id }) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },

    // 点击播放新歌
    changePlayState(id) {
      // todo 将当前的id存入vuex中
      this.$store.commit("playList/UPDATEMUSICID", id);
    },
  },
  components: {
    Carousel,
    ListItem,
    MvItem,
  },
};
</script>

<style lang="less" scoped>
.content {
  margin-top: 10px;
  height: 90%;
  .songMenu {
    width: 100%;
    /deep/.list-content {
      .list-item {
        width: calc(100% / 5);
        .cover {
          aspect-ratio: 1;
        }
      }
    }
    .menu-content {
      width: 100%;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          position: relative;
          width: 18%;
          height: 35%;
          text-align: left;
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          .name {
            margin-top: 0;
            font-size: 14px;
            height: 40px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
          }
          .icon {
            position: absolute;
            right: 5px;
            bottom: 60px;
            width: 30px;
            height: 30px;
          }
          .counts {
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 12px;
            color: #fff;
            i {
              font-size: 12px;
              margin-right: 2px;
            }
          }
        }
      }
    }
  }

  .private-content {
    width: 100%;
    /deep/.list-content {
      .list-item {
        width: calc(100% / 3);
        height: 10%;
        margin-right: 0;
        .cover {
          aspect-ratio: 2/1;
        }
      }
    }
  }

  .newSong {
    width: 100%;
    margin-top: 20px;
    .wrapper {
      display: flex;
      width: 100%;
      height: 300px;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      .content {
        width: 32%;
        height: 55px;
        border-radius: 5px;
        .pic {
          position: relative;
          float: left;
          width: 55px;
          height: 55px;
          a {
            display: block;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          i {
            position: absolute;
            left: 12px;
            top: 12px;
            display: inline-block;
            width: 30px;
            height: 30px;
            z-index: 1;
            cursor: pointer;
          }
        }
        .msg {
          float: left;
          width: 70%;
          height: 100%;
          margin-left: 10px;
          p {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            float: left;
            margin: 5px 0;
            font-size: 14px;
          }
          span {
            font-size: 12px;
            float: left;
            color: rgb(173, 169, 169);
          }
        }
        &:hover {
          background-color: rgb(238, 235, 235);
        }
      }
    }
  }

  .video-wrapper {
    margin-top: 20px;
  }

  .title {
    width: 100px;
    cursor: pointer;
    h3 {
      display: inline-block;
      margin-bottom: 10px;
    }
    i {
      font-size: 28px;
    }
  }
  .active {
    background-color: rgb(238, 235, 235);
  }
}
</style>
