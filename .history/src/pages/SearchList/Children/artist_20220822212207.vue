<template>
  <div>
    <AlbumItem :albumData="artists" @changeRoute="changeRoute" />
  </div>
</template>

<script>
import AlbumItem from "@/components/albumItem";
import {mapState} from 'vuex'
export default {
  name: "artist",
  data() {
    return {
      // 歌手数据
      artists: [],
    };
  },
  props: ["offset"],
  mounted() {
    this.getSearchKeywords(this.$route.query);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords({ keywords, type, limit, offset }) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        type,
        limit,
        offset
      );
      if (result.code === 200) {
        this.artists = result.result.artists;
        let str = `找到${result.result.artistCount}位歌手`;
        this.$emit("handleCount", str, result.result.artistCount);
      }
    },

    // 路由跳转
    changeRoute({id}) {
      this.$router.push({
        path: "/singerDetail",
        query: { id },
      });
    },
  },
  
  components: { AlbumItem },
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

<style></style>
