<template>
  <div>
    <div class="content" v-show="!isShowPlayListDetail">
      <Carousel />

      <!-- 推荐歌单 -->
      <div class="songMenu">
        <div class="title clearfix">
          <h3>推荐歌单</h3>
          <i class="iconfont">&#xe743;</i>
        </div>
        <div class="menu-content">
          <ul>
            <li>
              <a href="javascript:;">
                <img src="" alt="" />
              </a>
              <i
                class="icon"
                :style="{
                  background: 'url(' + videoBg + ') no-repeat center top',
                  'background-size': '100% 100%',
                }"
              ></i>
              <p class="name">每日歌曲推荐</p>
            </li>
            <li
              v-for="item in menuInfo"
              :key="item.id"
              @click="showPlaylistDetail(item.id)"
            >
              <a
                href="javascript:;"
                @mouseenter="showIcon(item)"
                @mouseleave="hiddenIcon(item)"
              >
                <img :src="item.picUrl" alt="" />
              </a>
              <i
                v-if="item.showIcon"
                class="icon"
                :style="{
                  background: 'url(' + videoBg + ') no-repeat center top',
                  'background-size': '100% 100%',
                }"
              ></i>
              <div class="counts">
                <i class="iconfont">&#xea6d;</i>
                <span>{{ item.playCount | numberFormat }}</span>
              </div>
              <p class="name">{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 独家放送 -->
      <div class="privateContent">
        <div class="title clearfix">
          <h3>{{ privateContentInfo.name }}</h3>
          <i class="iconfont">&#xe743;</i>
        </div>
        <div class="content">
          <ul>
            <li v-for="item in privateContentInfo.result" :key="item.id">
              <a href="javascript:;">
                <img :src="item.sPicUrl" alt="" />
              </a>
              <i class="iconfont">&#xe607;</i>
              <p class="msg">{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 最新音乐 -->
      <div class="newSong">
        <div class="title clearfix">
          <h3>最新音乐</h3>
          <i class="iconfont">&#xe743;</i>
        </div>
        <div class="wrapper">
          <div
            class="content"
            @mouseenter="currentId = item.id"
            @mouseleave="currentId = null"
            v-for="item in newSongInfo"
            :key="item.id"
            :class="{ active: currentId === item.id }"
          >
            <div class="pic">
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
        <div class="title clearfix">
          <h3>推荐MV</h3>
          <i class="iconfont">&#xe743;</i>
        </div>
        <div class="content">
          <ul>
            <li v-for="item in mvInfo" :key="item.id">
              <a href="javascript:;">
                <img :src="item.picUrl" alt="" />
              </a>
              <p>{{ item.name }}</p>
              <span>{{ item.artists[0].name }}</span>

              <div class="counts">
                <i class="iconfont">&#xea6d;</i>
                <span>{{ item.playCount | numberFormat }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 歌单详情 -->
    <PlaylistDetail v-if="isShowPlayListDetail" :id = 'id'/>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import PlaylistDetail from "@/components/PlaylistDetail";
export default {
  name: "Recommend",
  data() {
    return {
      limit: 9, //显示多少条推荐歌单的歌单数量
      menuInfo: [], //推荐歌单的数据
      privateContentInfo: {}, //独家欢送数据
      newSongInfo: [], //新歌信息
      mvInfo: [], //mv相关信息
      videoBg: require("@/assets/images/video.png"),
      currentId: null,
      isShowPlayListDetail: false, //是否显示歌单详情
      id:null,
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
      this.id = id
      this.isShowPlayListDetail = true
      // 通知父组件隐藏nav
      this.$emit("update:visible", false);
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
      this.privateContentInfo = result;
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
  },
  components: {
    Carousel,
    PlaylistDetail,
  },
};
</script>

<style lang="less">
.clearfix::after,
.clearfix::before {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}

.content {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  .songMenu {
    width: 100%;
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
          height: 34%;
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
          }
          .icon {
            position: absolute;
            right: 5px;
            top: 100px;
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

  .privateContent {
    width: 100%;
    .content {
      width: 100%;
      margin-top: 0;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          position: relative;
          width: 32%;
          height: 10%;
          a {
            display: block;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          i {
            position: absolute;
            left: 5px;
            top: 8px;
            font-size: 25px;
            color: rgb(196, 191, 191);
          }
          p {
            margin: 0;
            text-align: left;
            font-size: 14px;
          }
        }
      }
    }
  }

  .newSong {
    width: 100%;
    margin-top: 20px;
    .title {
      position: relative;
      h3 {
        float: left;
        margin-bottom: 10px;
      }
      i {
        position: absolute;
        left: 70px;
        top: 18px;
        font-size: 28px;
      }
    }
    .wrapper {
      display: flex;
      width: 100%;
      height: 300px;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
      .content {
        width: 30%;
        height: 55px;
        border-radius: 5px;
        .pic {
          position: relative;
          float: left;
          width: 25%;
          height: 100%;
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
            z-index: 999;
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
      }
    }
  }

  .video-wrapper {
    margin-top: 20px;
    .content {
      width: 100%;
      height: 100%;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          position: relative;
          width: 24%;
          text-align: left;
          a {
            width: 100%;
            height: 120px;
            display: inline-block;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 2px 0 0 0;
            font-size: 14px;
          }
          span {
            font-size: 12px;
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

  .title {
    position: relative;
    h3 {
      float: left;
      margin-bottom: 10px;
    }
    i {
      position: absolute;
      left: 70px;
      top: 18px;
      font-size: 28px;
    }
  }
  .active {
    background-color: rgb(238, 235, 235);
  }
}
</style>
