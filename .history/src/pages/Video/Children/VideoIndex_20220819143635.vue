<template>
  <div class="wrapper">
    <categoryNav
      v-if="catList.length && hotList.length"
      :catList="catList"
      :hotList="hotList"
      :cat="cat"
      @changeCatList="changeCatList"
      title="全部视频"
    />

    <div class="video-content">
      <div
        v-infinite-scroll="load"
        infinite-scroll-distance="500"
        infinite-scroll-delay="1000"
        :infinite-scroll-disabled="hasMore"
      >
        <listItem
          :listData="videoData"
          :isShowIcon="false"
          @changeRoute="changeRoute"
        />
      </div>
    </div>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import categoryNav from "@/components/categoryNav";
export default {
  name: "VideoIndex",
  data() {
    return {
      // 热门视频标签分类
      hotList: [],
      // 全部视频标签分类
      catList: [],
      // 视频数据
      videoData: [],
      // 当前的标签分类
      cat: "全部",
      // 是否还可以获取数据
      hasMore: true,
      // 加载
      loading: true,
      // 分页参数
      page: 1,
      // 当前的标签id
      catId: "",
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    // 初始化数据
    InitData() {
      this.getVideoCategoryList();
      this.getVideo_Group_list();
      this.getVideoTimelineAll();
    },

    // 获取热门视频标签列表
    async getVideoCategoryList() {
      const result = await this.$API.video.reqVideoCategoryList();
      if (result.code === 200) {
        this.hotList = result.data;
      }
    },

    // 获取视频标签列表
    async getVideo_Group_list() {
      const result = await this.$API.video.reqVideo_Group_list();
      if (result.code === 200) {
        this.catList = result.data;
        this.loading = false;
      }
    },

    // 获取全部视频列表
    async getVideoTimelineAll() {
      let offset = (this.page - 1) * 50;
      const result = await this.$API.video.reqVideoTimelineAll(offset);
      if (result.code === 200) {
        let data = result.datas;
        this.hasMore = !result.hasmore;

        // 处理数据方便组件使用
        this.handleVideoData(data);
      }
    },

    // 获取分类视频
    async getVideoGroup(id) {
      let offset = (this.page - 1) * 50;
      const result = await this.$API.video.reqVideoGroup(id, offset);
      if (result.code === 200) {
        let data = result.datas;
        this.hasMore = result.hasMore;
        // 处理数据方便组件使用
        this.handleVideoData(data);
      }
    },

    // 处理视频数据
    handleVideoData(data) {
      let arr = [];
      // 处理数据，方便list-item组件的使用
      data.forEach((element) => {
        // 判断下element是否为直播
        if (!element.data.hasOwnProperty("liveData")) {
          arr.push(element.data);
        }
      });
      // 实现无限滚动，将数据合并
      this.videoData = this.videoData.concat(arr);
    },

    // 无限滚动
    load() {
      this.page += 1;
      if (this.catId) {
        this.getVideoGroup(this.catId);
      } else {
        this.getVideoTimelineAll();
      }
      console.log("滚动");
    },

    // 分类视频
    changeCatList({ tag, id }) {
      this.cat = tag;
      this.catId = id;
      this.page = 1;
      this.videoData = [];
      this.load();
      if (id) {
        this.getVideoGroup(id);
      } else {
        // 获取全部视频
        this.getVideoTimelineAll();
      }
    },

    // 跳转到视频详情
    changeRoute({ vid }) {
      this.$router.push({
        path: "/mvDetail",
        query: { id: vid, type: "video" },
      });
    },
  },
  activated() {
    this.hasMore = false;
  },
  deactivated() {
    this.hasMore = true;
  },

  components: { categoryNav, listItem },
};
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  .video-content {
    margin-top: 20px;
    /deep/ .list-item {
      width: 250px;
      .cover {
        aspect-ratio: 1.8/1;
      }
    }
  }
}
</style>
