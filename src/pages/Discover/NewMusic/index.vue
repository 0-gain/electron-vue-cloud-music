<template>
  <div class="newMusic-wrapper">
    <div class="switch">
      <span
        class="newSong"
        :class="{ isActive: !isNewAlbum }"
        @click="goNewSong"
        >新歌速递</span
      >
      <span
        class="newAlbum"
        :class="{ isActive: isNewAlbum }"
        @click="goNewAlbum"
        >新碟上架</span
      >
      <span class="bg" :class="isNewAlbum ? 'right' : 'left'"></span>
    </div>
    <!-- 分类 -->
    <div class="category clearfix">
      <ul>
        <li
          v-for="(t, index) in typeSort"
          :key="index"
          :class="{ isType: type == t.type || area == t.area }"
          @click="changeType(t.type, t.area)"
        >
          {{ t.name }}
        </li>
      </ul>

      <div class="operation">
        <div v-if="!isNewAlbum">
          <span class="playAll">
            <i class="iconfont icon-bofang"></i>
            <span>播放全部</span>
          </span>
          <span class="collection">
            <i class="el-icon-folder-add"></i>
            <span>收藏全部</span>
          </span>
        </div>

        <div v-else>
          <span
            class="recommendAlbum"
            :class="{ currentTag: isRecommendAlbumTag }"
            @click="recommendAlbum"
            >推荐</span
          >
          <span
            class="totalAlbum"
            :class="{ currentTag: !isRecommendAlbumTag }"
            @click="totalAlbum"
            >全部</span
          >
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="newMusic-list">
      <!-- 新歌速递 -->
      <new-song :type="type" v-if="!isNewAlbum" />

      <!-- 新碟上架 -->
      <div v-else v-loading="loading">
        <newAlbum
          :albumData="weekData"
          title="本周新碟"
          v-if="area == 'ALL' && isRecommendAlbumTag"
        />
        <div
          v-infinite-scroll="load"
          infinite-scroll-disabled="IsDisable"
          infinite-scroll-immediate="false"
          infinite-scroll-distance="200"
          infinite-scroll-delay="500"
        >
          <newAlbum :albumData="monthData" title="本月新碟" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newSong from "./Children/newSong.vue";
import newAlbum from "./Children/newAlbum.vue";
export default {
  name: "NewMusic",
  data() {
    return {
      // 是否为新碟上架
      isNewAlbum: false,
      // 是否为全部专辑类型
      isRecommendAlbumTag: true,
      // 种类菜单
      typeSort: [
        { name: "全部", type: 0, area: "ALL" },
        { name: "华语", type: 7, area: "ZH" },
        { name: "欧美", type: 96, area: "EA" },
        { name: "韩国", type: 16, area: "KR" },
        { name: "日本", type: 8, area: "JP" },
      ],
      // 当前的种类
      type: 0,
      // 当前专辑的种类
      area: "ALL",
      // 新的周专辑
      weekData: [],
      // 新的本月专辑全部数据
      monthData: [],
      // 一次获取到的本月专辑数据
      monthData: [],
      loading: true,
      // 禁止无限滚动
      IsDisable: false,
      // 当前的页数
      page: 1,
      // 一次性获取的数量
      limit: 50,
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      this.getNewAlbum("ALL");
    },

    // 新碟上架
    goNewAlbum() {
      this.isNewAlbum = true;
      this.area = "ALL";
      this.type = -1;
    },

    // 新歌速递
    goNewSong() {
      this.isNewAlbum = false;
      this.area = "";
      this.type = 0
    },

    // 获取专辑数据
    async getNewAlbum(area) {
      const result = await this.$API.newMusic.reqNewAlbum(area);
      if (result.code === 200) {
        this.loading = false;
        this.weekData = result.weekData;
        this.monthAllData = result.monthData;
        this.handleMonthAlbum();
      }
    },

    // 全部专辑数据
    async getAllNewAlbum(area, limit) {
      let offset = (this.page - 1) * this.limit;
      const result = await this.$API.newMusic.reqAllNewAlbum(
        area,
        limit,
        offset
      );
      if (result.code === 200) {
        if(!result.albums.length){
          this.IsDisable = true
        }
        this.loading = false;
        this.monthData = this.monthData.concat(result.albums);
        
      }
    },

    // 点击获取全部专辑数量
    totalAlbum() {
      this.monthData = []
      this.loading = true;
      this.page = 1
      this.isRecommendAlbumTag = false;
      this.getAllNewAlbum(this.area, this.limit);
    },

    // 获取推荐专辑数据
    recommendAlbum(){
      this.isRecommendAlbumTag = true;
      this.monthData = []
      this.getNewAlbum(this.area)
    },

    // 改变专辑的数量(由于接口的limit和offset无效，一次性返回900多的专辑数量)
    handleMonthAlbum() {
      if (!this.monthAllData.length) {
        this.IsDisable = true;
      } else {
        this.monthData = this.monthData.concat(
          this.monthAllData.splice(0, 50)
        );
      }
    },

    // 改变音乐的种类
    changeType(type, area) {
      this.loading = true;
      if (this.isNewAlbum) {
        this.monthData = [];
        this.area = area;
        if(this.isRecommendAlbumTag){
          // 当前是推荐专辑
          this.getNewAlbum(area);
        }else{
          // 全部专辑
          this.getAllNewAlbum(area,this.limit)
        }
      } else {
        this.type = type;
        this.area = "";
      }
    },

    // 无限滚顶
    load() {
      if (this.isRecommendAlbumTag) {
        this.handleMonthAlbum();
      } else {
        this.page += 1;
        this.getAllNewAlbum(this.area, this.limit);
      }
      console.log('滚动')
    },
  },
  components: { newSong, newAlbum },
};
</script>

<style lang="less" scoped>
.newMusic-wrapper {
  .switch {
    position: relative;
    width: 250px;
    height: 30px;
    line-height: 30px;
    border: 1px solid rgb(187, 187, 187);
    border-radius: 50px;
    overflow: hidden;
    font-size: 14px;
    margin: 20px auto;
    .newSong {
      position: absolute;
      width: 125px;
      border-radius: 50px;
      z-index: 1;
      left: 0;
    }
    .newAlbum {
      position: absolute;
      width: 125px;
      border-radius: 50px;
      z-index: 1;
      right: 0;
    }
    .bg {
      position: absolute;
      width: 125px;
      height: 100%;
      background-color: rgb(187, 187, 187);
      border-radius: 50px;
      transition: transform 0.2s;
    }
    .left {
      transform: translateX(-126px);
    }
    .right {
      transform: translateX(0);
    }
    .isActive {
      color: #fff;
    }
  }
  .category {
    ul {
      float: left;
      font-size: 14px;
      li {
        float: left;
        margin-right: 20px;
        cursor: pointer;
        &.isType {
          font-weight: bold;
        }
      }
    }
    .operation {
      float: right;
      font-size: 14px;
      .playAll {
        margin: 0 20px;
        padding: 4px 10px 6px 10px;
        background-color: rgb(236, 65, 65);
        color: #fff;
        border-radius: 50px;
        cursor: pointer;
      }
      i {
        vertical-align: middle;
        margin-right: 5px;
      }
      span {
        vertical-align: middle;
      }
      .collection {
        padding: 4px 10px 6px 10px;
        border: 1px solid #d5d5d6;
        border-radius: 50px;
        cursor: pointer;
        &:hover {
          background-color: #f8f6f6;
        }
        i {
          font-size: 16px;
        }
      }
      .recommendAlbum,
      .totalAlbum {
        display: inline-block;
        border-radius: 50px;
        width: 40px;
        line-height: 25px;
        font-size: 12px;
        cursor: pointer;
      }
      .recommendAlbum {
        margin-right: 20px;
      }
      .currentTag {
        color: rgb(236, 65, 65);
        background-color: #fef3f4;
      }
    }
  }
  .newMusic-list {
    margin-top: 20px;
  }
}
</style>
