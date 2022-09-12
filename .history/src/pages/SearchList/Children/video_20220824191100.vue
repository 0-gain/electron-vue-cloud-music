<template>
  <div>
    <mvItem :mvData="videos" @changeRoute="changeRoute" />
  </div>
</template>

<script>
import mvItem from "@/components/Mv-Item";
import { searchMixin } from "@/mixin";

export default {
  name: "Video",
  data() {
    return {
      videos: [],
    };
  },
  props: ["offset"],
  mixins: [searchMixin],
  methods: {
    // 关键字搜索
    async getSearchKeywords(keywords, offset, type = 1014) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        offset,
        type
      );
      if (result.code === 200) {
        this.videos = result.result.videos;
        let str = `找到${result.result.videoCount || 0}个视频`;
        this.$emit("handleCount", str, result.result.videoCount);
      }
    },
    changeRoute({ vid, type }) {
      // type: 0表示为mv
      this.$router.push({
        path: "/mvDetail",
        query: { id: vid, type: type == 0 ? "MV" : "video" },
      });
    },
  },
  components: { mvItem },
};
</script>

<style lang="less" scoped>
/deep/.title {
  display: none;
}
/deep/.other {
  .name {
    font-size: 12px;
    p {
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: left;
    }
  }
  .artistName {
    color: @artist-color;
  }
}
</style>
