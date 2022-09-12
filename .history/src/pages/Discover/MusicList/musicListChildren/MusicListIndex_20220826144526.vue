<template>
  <div
    class="musicList-wrapper"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    ref="musicList"
  >
    <!-- 精品歌单入口 -->
    <div
      class="high-quality"
      @click="
        $router.push({
          path: '/discover/musicList/highQuality',
          query: {
            cat,
          },
        })
      "
      v-if="isShowEntry"
    >
      <img v-lazy="highQualityInfo.coverImgUrl" class="backgroundImg" alt="" />

      <div class="coverImg">
        <img v-lazy="highQualityInfo.coverImgUrl" alt="" :onerror="errorImg" />
      </div>

      <div class="entryInfo">
        <div class="tag"><i class="iconfont">&#xe857;</i>精品歌单</div>
        <div class="name">{{ highQualityInfo.name }}</div>
      </div>
    </div>

    <categoryNav
      :hotList="hotList"
      :catList="catList"
      :cat="cat"
      title="全部歌单"
      @changeCatList="changeCatList"
      :icon="icon"
    />

    <!-- 全部歌单内容 -->
    <div class="musicList-content">
      <List-item
        :listData="playList"
        :isShowIcon="false"
        @changeRoute="changeRoute"
      />
    </div>

    <div class="pagination">
      <el-pagination
        style="text-align: center"
        :current-page="page"
        :page-size="limit"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import categoryNav from "@/components/categoryNav";
import ListItem from "@/components/list-item";
export default {
  name: "MusicList",
  data() {
    return {
      highQualityInfo: {}, //精品歌单入口
      hotList: [], //热门歌单分类
      catList: [], //全部歌单分类
      playList: [], //全部歌单
      page: 1,
      limit: 80,
      total: 1,
      cat: "全部",
      icon: [
        "icon-diqiu",
        "icon-gangqin",
        "icon-kafeibeichabei",
        "icon-emoji",
        "icon-zhuti",
      ], //全部歌单得icon

      videoBg: require("@/assets/images/video.png"),

      loading: true, //加载
      // 是否显示高质量歌单入口
      isShowEntry: true,
      errorImg: require("@/assets/images/imgLoading.png"),
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      this.getHighQuality(1, this.cat);
      this.getHotList();
      this.getCatList();
      const { limit } = this;
      this.getPlayList({ limit });
    },
    // * 获取精品歌单的封面信息
    async getHighQuality(limit, cat) {
      this.loading = true;
      const result = await this.$API.musicList.reqHighQuality({ limit, cat });
      if (result.code === 200) {
        if (result.msg) {
          this.isShowEntry = false;
        } else {
          this.isShowEntry = true;
        }
        this.highQualityInfo = result.playlists[0];
        // 初始化精品歌单时间
        this.$store.commit("playList/UPDATELASTTIME");
        this.loading = false;
      }
    },

    // * 获取热门歌单分类
    async getHotList() {
      const result = await this.$API.musicList.reqHotList();
      this.hotList = result.tags;
    },

    // * 获取全部歌单分类
    async getCatList() {
      const result = await this.$API.musicList.reqCatList();
      let newArr = [];
      for (let i in result.categories) {
        let newObj = { name: result.categories[i], list: [] };
        result.sub.map((v) => {
          if (v.category == i) {
            newObj.list.push(v);
          }
        });
        newArr.push(newObj);
      }
      this.catList = newArr;
    },

    // * 获取全部歌单
    async getPlayList({ limit, offset, cat }) {
      this.loading = true;
      const result = await this.$API.musicList.reqPlayList({
        limit,
        offset,
        cat,
      });
      if (result.code === 200) {
        this.playList = result.playlists;
        this.total = result.total;
        this.loading = false;
        this.cat = result.cat;
      }
      if (this.isShowCatList) {
        this.isShowCatList = !this.isShowCatList;
      }
    },

    // 获取热门标签歌单
    changeCatList({ tag }) {
      // 点击标签，精品歌单也要跟着一起获取所点击的分类歌单，如果精品歌单没有，则隐藏
      this.cat = tag;
      let cat = tag;
      const { limit } = this;
      this.getPlayList({ limit, cat });
      this.getHighQuality(1, cat);
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

    // 跳转到歌单详情
    changeRoute({ id }) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },
    // 翻页请求
    handleCurrentChange(page) {
      this.loading = true;
      this.page = page;
      let limit = this.limit;
      let offset = (page - 1) * this.limit;
      this.getPlayList({ limit, offset });

      // 全局事件总线，滚动到顶部
      this.$bus.$emit("scrollTop", 200);
    },
  },
  components: {
    ListItem,
    categoryNav,
  },
};
</script>

<style lang="less" scoped>
.musicList-wrapper {
  position: relative;
  width: 95%;
  height: 100%;
  .high-quality {
    position: relative;
    width: 100%;
    height: 170px;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    // background: content-box radial-gradient(crimson, skyblue);
    .backgroundImg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      filter: blur(30px) brightness(60%);
    }
    .coverImg {
      float: left;
      width: 140px;
      height: 140px;
      margin: 14px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .entryInfo {
      float: left;
      margin-top: 30px;
      .tag {
        float: left;
        width: 95px;
        height: 30px;
        line-height: 30px;
        border: 1px solid rgb(230, 170, 90);
        color: rgb(230, 170, 90);
        border-radius: 50px;
        font-size: 12px;
        i {
          margin-right: 5px;
        }
      }
      .name {
        float: left;
        margin: 50px -95px;
        color: #fff;
      }
    }
  }
  .musicList-content {
    margin-top: 15px;
    /deep/ .list-content {
      .list-item {
        .cover {
          aspect-ratio: 1;
          .icon-bofangqi-bofang {
            font-size: 40px;
          }
        }
      }
      .lg{
        width: ;
      }
    }
  }

  .pagination {
    margin-bottom: 30px;
  }
}

//设置文字颜色
.el-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: rgb(151, 147, 147);
  }
}
</style>
