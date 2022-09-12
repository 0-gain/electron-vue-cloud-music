<template>
  <div>
    <AlbumItem :albumData="albums" @changeRoute="changeRoute"></AlbumItem>
  </div>
</template>

<script>
import AlbumItem from "@/components/albumItem";
export default {
  name: "album",
  data() {
    return {
      albums: [],
    };
  },
  props: ["offset"],
  mixins: [searchMixin],
  mounted() {
    this.getSearchKeywords(this.keywords,this.$route.query.type);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords(keywords, type, limit, offset ) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        type,
        limit,
        offset
      );
      if (result.code === 200) {
        this.albums = result.result.albums;
        let str = `找到${result.result.albumCount}张专辑`;
        this.$emit("handleCount", str, result.result.albumCount);
      }
    },
    changeRoute({id}) {
      this.$router.push({ name: "album", query: { id } });
    },
  },
  components: { AlbumItem },
};
</script>

<style lang="less" scoped>
/deep/.item {
  .name {
    color: #333;
  }
  .artistName {
    color: @artist-color;
    font-size: 12px;
  }
}
</style>
