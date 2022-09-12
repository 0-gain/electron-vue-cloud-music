<template>
  <div>
    <albumItem :albumData="playlists" @changeRoute="changeRoute" />
  </div>
</template>

<script>
import albumItem from "@/components/albumItem";
import { mapState } from "vuex";
export default {
  name: "playlist",
  data() {
    return {
      playlists: [],
    };
  },
  props: ["offset"],
  mounted() {
    this.getSearchKeywords(this.keywords);
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
        console.log(result)
        this.playlists = result.result.playlists;
        let str = `找到${result.result.playlistCount}个歌单`;
        this.$emit("handleCount", str, result.result.playlistCount);
      }
    },
    changeRoute({ id }) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },
  },
  computed: {
    ...mapState({
      keywords: (state) => state.search.keywords,
    }),
  },

  components: { albumItem },
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

<style lang="less" scoped>
/deep/.item {
  .name {
    color: #333;
  }
  .trackCount {
    display: inline-block;
    font-size: 12px;
    color: @minor-color;
    width: 10%;
  }
  .artistName {
    display: inline-block;
    font-size: 12px;
    width: 30%;
  }
  .playCount {
    font-size: 12px;
    color: @minor-color;
    i {
      font-size: 12px;
    }
  }
}
</style>
