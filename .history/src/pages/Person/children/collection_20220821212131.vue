<template>
  <div>
    <listItem :listData="collection" :isShowIcon="false" showType="person" @changeRoute="changeRoute"></listItem>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import { mapState } from "vuex";
export default {
  // 收藏的歌单
  name: "Collection",
  methods: {
    changeRoute({id}){
        this.$router.push({ path: "/playListDetail", query: { id } });
    }
  },
  computed: {
    ...mapState({
      collection: (state) => state.user.collection,
    }),
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
