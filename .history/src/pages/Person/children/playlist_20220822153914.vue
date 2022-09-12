<template>
  <div>
    <listItem :listData="createList" :isShowIcon="false" showType="person" @changeRoute="changeRoute"></listItem>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import { mapState } from "vuex";
export default {
  // 创建的歌单
  name: "Playlist",
  props:['createList'],
  methods: {
    changeRoute({id}){
        this.$router.push({ path: "/playListDetail", query: { id } });
    }
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
