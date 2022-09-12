<template>
  <div>
    <listItem
      :listData="collectionList"
      :isShowIcon="false"
      showType="person"
      @changeRoute="changeRoute"
    ></listItem>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
export default {
  // 收藏的歌单
  name: "Collection",
  data() {
    return {
      collectionList: [],
    };
  },
  props: ["list"],
  
  methods: {
    changeRoute({ id }) {
      this.$router.push({ path: "/playListDetail", query: { id } });
    },
  },

  computed: {

  },

  watch: {
    list(list) {
      let { id } = this.$route.query;
      list.forEach((element) => {
        if (element.userId != id) {
          this.collectionList.push(element);
        }
      });
    },
  },
  components: { listItem },
};
</script>

<style lang="less" scoped>
/deep/.list-content {
  .list-item {
    width: calc(100% / 6);
    .cover {
      aspect-ratio: 1;
    }
  }
}
</style>
