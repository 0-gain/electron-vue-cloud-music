<template>
    <div>
        <mvItem :mvData="videos" @changeRoute="changeRoute"/>
    </div>
</template>

<script>
import mvItem from '@/components/Mv-Item'
export default {
  name: "Video",
  data() {
    return {
        videos:[]
    }
  },
  props:['offset'],
  mounted() {
    this.getSearchKeywords(this.$route.query)
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords({ keywords, type,limit,offset }) {
      const result = await this.$API.search.reqSearchKeywords(keywords, type,limit,offset);
      if (result.code === 200) {
        this.videos = result.result.videos;
        let str = `找到${result.result.videoCount}个视频`;
        this.$emit("handleCount", str,result.result.videoCount);
      }
    },
    changeRoute({vid,type}){
      
      // type: 0表示为mv
      this.$router.push({
        path: "/mvDetail",
        query: { id: vid, type: type == 0 ? "MV" : "video" },
      });
    }
  },
  components:{mvItem},
  watch: {
    // 监听offset的状态
    offset(offset) {
      const { keywords, type } = this.$route.query;
      let searchObj = {
        keywords,
        type,
        offset,
      };
      this.getSearchKeywords(searchObj);
    },
  },
};
</script>

<style lang='less' scoped>
/deep/.title{
    display: none;
}
/deep/.other{
    .name{
        font-size: 12px;
        p{
            font-size: 12px;
            transform: scale(.8);
            transform-origin: left;
        }
    }
    .artistName{
        color: @artist-color;
    }
}
</style>
