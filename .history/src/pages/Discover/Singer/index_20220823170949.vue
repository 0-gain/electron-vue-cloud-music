<template>
  <div class="div">
    <div class="singer-wrapper">
      <div class="nav-content">
        <!-- 语种 -->
        <div class="language">
          <div class="title">语种:</div>
          <SingerNavBar :navData="areaSort" @changeArtistsList="changeArea" />
        </div>
        <!-- 分类 -->
        <div class="category">
          <div class="title">分类:</div>
          <SingerNavBar :navData="typeSort" @changeArtistsList="changeType" />
        </div>
        <!-- 筛选 -->
        <div class="selector">
          <div class="title">筛选:</div>
          <singer-nav-bar
            :navData="initialSort"
            @changeArtistsList="changeInitial"
          />
        </div>
      </div>
      <div
        class="artist-content"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="!isMore"
        infinite-scroll-delay="800"
        infinite-scroll-immediate="false"
        infinite-scroll-distance="300"
      >
        <listItem
          :listData="artistsData"
          :hiddenIcon="true"
          @changeRoute="goRouteSingerDetail"
        />
      </div>
    </div>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import SingerNavBar from "@/components/SingerNavBar/SingerNavBar.vue";
export default {
  name: "Singer",
  data() {
    return {
      // 语种的菜单数据
      areaSort: [
        { area: -1, name: "全部" },
        { area: 7, name: "华语" },
        { area: 96, name: "欧美" },
        { area: 8, name: "日本" },
        { area: 16, name: "韩国" },
        { area: 0, name: "其它" },
      ],
      // 歌手的分类数据
      typeSort: [
        { type: -1, name: "全部" },
        { type: 1, name: "男歌手" },
        { type: 2, name: "女歌手" },
        { type: 3, name: "乐队" },
      ],
      // 字母的数据
      initialSort: [
        { initial: -1, name: "热门" },
        { initial: "a", name: "A" },
        { initial: "b", name: "B" },
        { initial: "c", name: "C" },
        { initial: "d", name: "D" },
        { initial: "e", name: "E" },
        { initial: "f", name: "F" },
        { initial: "g", name: "G" },
        { initial: "h", name: "H" },
        { initial: "i", name: "I" },
        { initial: "j", name: "J" },
        { initial: "k", name: "K" },
        { initial: "l", name: "L" },
        { initial: "m", name: "M" },
        { initial: "n", name: "N" },
        { initial: "o", name: "O" },
        { initial: "p", name: "P" },
        { initial: "q", name: "Q" },
        { initial: "r", name: "R" },
        { initial: "s", name: "S" },
        { initial: "t", name: "T" },
        { initial: "u", name: "U" },
        { initial: "v", name: "V" },
        { initial: "w", name: "W" },
        { initial: "x", name: "X" },
        { initial: "y", name: "Y" },
        { initial: "z", name: "Z" },
        { initial: 0, name: "#" },
      ],

      // 歌手的数据
      artistsData: [],
      // 歌手分类的值
      type: -1,
      // 语种分类的值
      area: -1,
      // 字母的值
      initial: -1,
      // 一次渲染的歌手数量
      limit: 30,
      // 当前的页数
      currentPage: 1,
      // 是否还有数据
      isMore: true,
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      const { type, area, initial } = this;
      this.getArtistList(type, area, initial);
    },
    // * 获取歌手列表
    async getArtistList(type, area, initial) {
      let offset = (this.currentPage - 1) * this.limit;
      const result = await this.$API.singer.reqArtistList(
        type,
        area,
        initial,
        offset
      );
      if (result.code === 200) {
        this.artistsData = this.artistsData.concat(result.artists);
        this.isMore = result.more;
      }
    },

    // 筛选语种的回调
    changeArea(index) {
      // 清空数据
      this.artistsData = [];

      this.area = this.areaSort[index].area;

      // 发送请求
      this.InitData();
    },

    // 筛选分类的回调
    changeType(index) {
      // 清空数据
      this.artistsData = [];

      this.type = this.typeSort[index].type;

      // 发送请求
      this.InitData();
    },

    // 筛选字母的回调
    changeInitial(index) {
      // 清空数据
      this.artistsData = [];

      this.initial = this.initialSort[index].initial;

      // 发送请求
      this.InitData();
    },

    // 自定义事件
    goRouteSingerDetail({ id, accountId }) {
      this.$router.push({
        path: "/singerDetail",
        query: { id, accountId },
      });
    },
    // 无限滚动事件
    load() {
      this.currentPage += 1;
      this.InitData();
    },
  },
  components: { SingerNavBar, listItem },
};
</script>

<style lang="less" scoped>
.singer-wrapper {
  .nav-content {
    & > div {
      display: flex;
      margin-bottom: 10px;
      .title {
        text-align: left;
        line-height: 20px;
        margin-top: 10px;
        width: 50px;
        font-size: 12px;
      }
    }
  }
  .artist-content {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .artist-item {
      margin-bottom: 20px;
      text-align: left;
      .cover {
        width: 180px;
        aspect-ratio: 1;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .des {
        margin-top: 5px;
        font-size: 14px;
        span {
          cursor: pointer;
        }
        .icon-user2 {
          background-color: rgb(236, 65, 65);
          color: #fff;
          border-radius: 50%;
          padding: 1px;
          font-size: 14px;
          float: right;
          cursor: pointer;
        }
      }
    }
  }
  /deep/.list-content {
    .list-item {
      // width: 12.5vw;
      width: 200px;
      min-width: 100px;
      margin-bottom: 20px;
      .cover {
        aspect-ratio: 1;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
