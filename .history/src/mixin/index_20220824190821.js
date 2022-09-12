export const searchMixin = {
  mounted() {
    this.getSearchKeywords(this.$route.query.keywords);
  },
  watch:{
    // 监听offset
    offset(offset){
      this.getSearchKeywords(this.$route.query.keywords,offset)
    }
  }
};
