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
  watch:{
    // 监听offset
    offset(offset){
      this.getSearchKeywords(this.keywords,this.$route.query.type,50,offset)
    }
  }
};
