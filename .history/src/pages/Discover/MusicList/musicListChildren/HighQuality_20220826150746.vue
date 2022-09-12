<template>
  <div
    class="highQuality-wrapper"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="title">
      <h3>精品歌单</h3>
      <i class="iconfont icon-wenhao"></i>
      <div class="total" @click="isShowCatList = !isShowCatList">
        <i class="iconfont icon-shaixuanshalou"></i>
        <span>{{ cat }}</span>
      </div>
    </div>

    <!-- 显示和隐藏全部歌单分类 -->
    <div class="catList" v-show="isShowCatList">
      <div class="title">
        <span @click="changeCatList('全部')">全部歌单</span>
      </div>

      <div class="catList-content">
        <div
          class="item"
          v-for="item in tags"
          :key="item.id"
          @click="changeCatList(item.name)"
          :class="{ currentTag: item.name == cat }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div
      class="highQuality-content"
      :infinite-scroll-disabled="isMore"
      infinite-scroll-immediate="false"
      v-infinite-scroll="load"
      :infinite-scroll-distance="2000"
      :infinite-scroll-delay="1000"
    >
      <div
        class="highQuality-item"
        v-for="(item, index) in playlists"
        :key="index"
        @click="
          $router.push({
            path: '/playListDetail',
            query: { id: item.id },
          })
        "
      >
        <i class="iconfont icon-huangguan"></i>
        <div class="cover">
          <img
            v-lazy="item.coverImgUrl"
            alt=""
            :onerror="errorImg"
            :key="item.coverImgUrl"
          />
          <span
            ><i class="iconfont icon-24gl-play"></i
            >{{ item.playCount | numberFormat }}</span
          >
        </div>
        <ul class="otherInfo">
          <li class="name">{{ item.name }}</li>
          <li class="creator">
            <span>by {{ item.creator.nickname }}</span>
          </li>
          <li class="des">
            <span class="tags">
              {{ item.tag }}
            </span>
            <span class="copywriter" v-if="item.copywriter">{{
              item.copywriter
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighQuality",
  data() {
    return {
      limit: 0, //一次加载歌单的数量
      playlists: [], //歌单数据
      isMore: false, //是否还有歌单
      // 加载
      loading: true,
      // 歌单分类标签
      tags: [],
      // 是否显示分类选项卡
      isShowCatList: false,
      // 当前歌单的分类
      cat: "全部",
      errorImg: require("@/assets/images/imgLoading.png"),
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      this.getHighQualityList(this.$route.query.cat);
      this.getHighQualityTags();
    },
    // * 获取歌单
    async getHighQualityList(cat) {
      // 存储一开始的cat
      this.cat = cat;
      // 从vuex中捞取存储的时间
      const before = this.$store.state.playList.lastTime;
      const result = await this.$API.musicList.reqHighQuality({ before, cat });
      if (result.code === 200) {
        this.loading = false;
        this.playlists = this.playlists.concat(result.playlists);
        // 决定是否还可以无限滚动下去
        this.isMore = !result.more;
        this.$store.commit("playList/UPDATELASTTIME", result.lasttime);
      }
    },

    // * 获取歌单分类
    async getHighQualityTags() {
      const result = await this.$API.musicList.reqHighQualityTags();
      this.tags = result.tags;
    },
    // 无限滚动
    load() {
      this.getHighQualityList(this.cat);
    },

    // 更改当前歌单分类
    changeCatList(cat) {
      this.isShowCatList = false;
      this.playlists = [];
      const before = new Date().getTime();
      this.$store.commit("playList/UPDATELASTTIME", before);
      this.getHighQualityList(cat);
    },
  },
};
</script>

<style lang="less" scoped>
.highQuality-wrapper {
  position: relative;
  width: calc(80vw);
  height: 100%;
  .title {
    text-align: left;
    margin-right: 50px;
    h3 {
      display: inline-block;
    }
    i {
      margin-left: 10px;
      color: #919090;
    }
    .total {
      float: right;
      padding: 2px 10px;
      margin-top: 18px;
      border: 1px solid #b7b7b7;
      border-radius: 15px;
      i {
        font-size: 13px;
        margin-right: 5px;
        margin-left: 0;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .catList {
    position: absolute;
    right: 0;
    width: 500px;
    height: 450px;
    border-radius: 5px;
    border: 1px solid rgb(240, 239, 239);
    box-shadow: 0 0 10px rgb(240, 239, 239);
    z-index: 9;
    background-color: #fff;
    .title {
      height: 60px;
      border-bottom: 1px solid rgb(224, 222, 222);
      box-sizing: border-box;
      &:hover {
        color: red;
        cursor: pointer;
      }
      span {
        float: left;
        margin: 18px 0 0 30px;
        font-size: 14px;
        padding: 5px 12px;
        border-radius: 50px;
      }
    }
    .catList-content {
      width: 100%;
      padding-top: 10px;
      line-height: 40px;
      display: flex;
      justify-items: center;
      flex-wrap: wrap;
      .item {
        width: 60px;
        height: 50px;
        margin-left: 40px;
        text-align: left;
        font-size: 13px;
        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
    .currentTag {
      color: rgb(236, 65, 65);
    }
  }
  .highQuality-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .highQuality-item {
      position: relative;
      padding-right: 20px;
      width: calc(100% / 3);
      margin-bottom: 20px;
      overflow: hidden;
      box-sizing: border-box;
      background-color: red;
      .cover {
        position: relative;
        width: 135px;
        aspect-ratio: 1/1;
        border-radius: 5px;
        overflow: hidden;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
        & > span {
          position: absolute;
          color: #fff;
          font-size: 12px;
          right: 5px;
          top: 3px;
          i {
            margin-right: 5px;
            font-size: 12px;
          }
        }
      }
      .otherInfo {
        float: left;
        width: calc(100% - 135px);
        padding: 5px 0 0 10px;
        font-size: 14px;
        box-sizing: border-box;
        li {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 15px 0;
          text-align: left;
          &.creator {
            font-size: 12px;
            color: #909399;
          }
          &.des {
            margin-top: 30px;
            .tags {
              display: inline-block;
              font-size: 12px;
              color: rgb(236, 65, 65);
              padding: 0 2px;
              border: 1px solid rgb(236, 65, 65);
              border-radius: 2px;
              transform: scale(0.8);
              transform-origin: left;
            }
            .copywriter {
              font-size: 12px;
              color: #d1d1d1;
              margin-left: -10px;
            }
          }
        }
      }
      .icon-huangguan {
        position: absolute;
        left: 0;
        background-color: rgb(243, 176, 104);
        color: #fff;
        padding: 8px 20px 2px 15px;
        font-size: 12px;
        transform: rotate(-40deg) translateX(-8px) translateY(-15px);
        z-index: 1;
      }
    }
  }
}
@media only screen and (max-width: 1100px) {
  .highQuality-item{
    width: calc(100% / 2) !important;
  }
}
</style>
