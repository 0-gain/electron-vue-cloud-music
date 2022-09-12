<template>
  <div>
    <AlbumItem :albumData="artists" @changeRoute="changeRoute" />
  </div>
</template>

<script>
import AlbumItem from "@/components/albumItem";

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
    this.getSearchKeywords(this.$route.query.keywords);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords(keywords, offset, type = 100) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        offset,
        type
      );
      if (result.code === 200) {
        this.artists = result.result.artists;
        let str = `找到${result.result.artistCount}位歌手`;
        this.$emit("handleCount", str, result.result.artistCount);
      }
    },

    // 路由跳转
    changeRoute({ id }) {
      this.$router.push({
        path: "/singerDetail",
        query: { id },
      });
    },
  },
  components: { AlbumItem },
};
</script>

<style></style>
