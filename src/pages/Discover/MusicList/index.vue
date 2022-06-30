<template>
  <div
    class="musicList-wrapper"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 精品歌单入口 -->
    <div class="high-quality">
      <img :src="highQualityInfo.coverImgUrl" class="backgroundImg" alt="" />

      <div class="coverImg">
        <img :src="highQualityInfo.coverImgUrl" alt="" />
      </div>

      <div class="entryInfo">
        <div class="tag"><i class="iconfont">&#xe857;</i>精品歌单</div>
        <div class="name">{{ highQualityInfo.name }}</div>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="musicList-navBar clearfix">
      <div class="total" @click="isShowCatList = !isShowCatList">
        <span>全部歌单</span>
        <i class="el-icon-arrow-right"></i>
      </div>

      <ul class="hotList">
        <li v-for="item in hotList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>

    <!-- 显示和隐藏全部歌单分类 -->
    <div class="catList" v-show="isShowCatList">
      <div class="title"><span>全部歌单</span></div>

      <div class="categories" v-for="(v, i) in catList" :key="i">
        <span><i class="iconfont" :class="icon[i]"></i>{{ v.name }}</span>

        <div class="lists">
          <div class="item" v-for="(li, index) in v.list" :key="index">
            {{ li.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- 全部歌单内容 -->
    <div class="musicList-content" v-loading="loading">
      <div class="musicList-item" v-for="item in playList" :key="item.id">
        <div
          class="item-coverImg"
          @mouseenter="showIcon(item)"
          @mouseleave="hiddenIcon(item)"
        >
          <a href="javascript:;">
            <img :src="item.coverImgUrl" alt="" />
          </a>
        </div>
        <div class="playCount">
          <i class="iconfont icon-24gl-play"></i>
          <span>{{ item.playCount | numberFormat }}</span>
        </div>
        <i
          v-show="item.showIcon"
          class="icon"
          :style="{
            background: 'url(' + videoBg + ') no-repeat center top',
            'background-size': '100% 100%',
          }"
        ></i>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <!-- 分页器 
    @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    -->
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
</template>

<script>
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
      icon: [
        "icon-diqiu",
        "icon-gangqin",
        "icon-kafeibeichabei",
        "icon-emoji",
        "icon-zhuti",
      ], //全部歌单得icon

      videoBg: require("@/assets/images/video.png"),
      isShowCatList: false, //显示和隐藏全部歌单种类
      loading: true, //加载
    };
  },
  mounted() {
    this.getHighQuality();
    this.getHotList();
    this.getCatList();
    this.getPlayList(this.limit);
  },
  methods: {
    // * 获取精品歌单的封面信息
    async getHighQuality() {
      const result = await this.$API.musicList.reqHighQuality(1);
      this.highQualityInfo = result.playlists[0];
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
    async getPlayList({ limit, offset }) {
      const result = await this.$API.musicList.reqPlayList({ limit, offset });
      if (result.code === 200) {
        this.playList = result.playlists;
        this.total = result.total;
        this.loading = false;
      }
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

    // 翻页请求
    handleCurrentChange(page) {
      this.loading = true
      this.page = page;
      let limit = this.limit;
      let offset = (page - 1) * this.limit;
      this.getPlayList({ limit, offset });
    },
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
.musicList-wrapper {
  position: relative;
  margin-top: 10px;
  width: 100%;
  .high-quality {
    position: relative;
    width: 100%;
    height: 170px;
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

  .musicList-navBar {
    margin-top: 20px;
    .total {
      position: relative;
      float: left;
      border: 1px solid rgb(202, 199, 199);
      border-radius: 50px;
      padding: 2px 20px 2px 15px;
      line-height: 25px;
      font-size: 14px;
      cursor: pointer;
      i {
        position: absolute;
        top: 7px;
        font-size: 16px;
      }
      &:hover {
        background-color: rgb(248, 246, 246);
      }
    }
    .hotList {
      float: right;
      line-height: 32px;
      li {
        float: left;
        font-size: 12px;
        margin-right: 18px;
        cursor: pointer;
      }
    }
  }
  .catList {
    position: absolute;
    left: 0;
    width: 720px;
    height: 700px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid rgb(240, 239, 239);
    box-shadow: 0 0 10px rgb(240, 239, 239);
    z-index: 9;
    background-color: #fff;
    .title {
      height: 60px;
      border-bottom: 1px solid rgb(224, 222, 222);
      box-sizing: border-box;
      span {
        float: left;
        margin: 18px 0 0 30px;
        padding: 5px 12px;
        font-size: 14px;
        border-radius: 50px;
        color: rgb(236, 65, 65);
        background-color: rgb(254, 243, 244);
      }
    }
    .categories {
      width: 100%;
      padding-top: 10px;
      line-height: 40px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      span {
        position: relative;
        flex: 0 0 15%;
        font-size: 13px;
        color: rgb(192, 185, 185);
        i {
          position: absolute;
          left: 0;
          font-size: 28px;
          color: rgb(160, 156, 156);
        }
      }
      .lists {
        display: flex;
        flex-wrap: wrap;
        width: 75%;
        .item {
          width: 90px;
          height: 40px;
          text-align: left;
          font-size: 13px;
          &:hover {
            color: red;
            cursor: pointer;
          }
        }
      }
    }
  }

  .musicList-content {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .musicList-item {
      position: relative;
      width: 23%;
      .item-coverImg {
        width: 100%;
        a {
          width: 100%;
          height: 100%;
          display: inline-block;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
      }
      p {
        margin: 0 0 20px 0;
        font-size: 14px;
        text-align: left;
      }
      .playCount {
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 12px;
        color: #fff;
        i {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      .icon {
        position: absolute;
        right: 10px;
        bottom: 70px;
        width: 40px;
        height: 40px;
        z-index: 1;
      }
    }
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
