import { mapState } from "vuex";
export const searchMixin = {
  mounted() {
    this.getSearchKeywords(this.keywords, this.$route.query.type);
  },
  computed: {
    ...mapState({
      keywords: (state) => state.search.keywords,
    }),
  },
  // watch: {
  //   // 监听offset的状态，进行翻页
  //   offset(offset) {
  //     this.getSearchKeywords(this.keywords, this.$route.query.type, 50, offset);
  //   },
  //   "$store.state.search.keywords"(val) {
  //     this.getSearchKeywords(val);
  //   },
  // },
};