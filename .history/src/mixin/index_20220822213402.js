import { mapState } from "vuex";
export const mixins = {
  computed: {
    ...mapState({
      keywords: (state) => state.search.keywords,
    }),
  },
  watch: {
    // 监听offset的状态，进行翻页
    offset(offset) {
      this.getSearchKeywords(this.keywords, 1, 50, offset);
    },
    "$store.state.search.keywords"(val) {
      this.getSearchKeywords(val);
    },
  },
};
