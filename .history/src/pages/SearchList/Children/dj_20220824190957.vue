<template>
  <div>
    <albumItem :albumData="djRadios" />
  </div>
</template>

<script>
import albumItem from "@/components/albumItem";
import {searchMixin} from '@/mixin'

export default {
  name: "playlist",
  data() {
    return {
      djRadios: [],
    };
  },
  props: ["offset"],
  mounted() {
    this.getSearchKeywords(this.$route.query.keywords);
  },
  methods: {
    // 关键字搜索
    async getSearchKeywords(keywords, offset, type = 1009) {
      const result = await this.$API.search.reqSearchKeywords(
        keywords,
        offset,
        type
      );
      if (result.code === 200) {
        this.djRadios = result.result.djRadios;
        let str = `找到${result.result.djRadiosCount}个播客`;
        this.$emit("handleCount", str, result.result.djRadiosCount);
      }
    },
  },
  components: { albumItem },
};
</script>

<style lang="less" scoped>
/deep/.item {
  .name {
    color: #333;
    width: 60%;
  }
  .dj {
    font-size: 12px;
    float: right;
    width: 20%;
  }
}
</style>
