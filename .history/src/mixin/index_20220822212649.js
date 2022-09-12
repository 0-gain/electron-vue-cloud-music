export const mixins = {
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