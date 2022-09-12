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
};
