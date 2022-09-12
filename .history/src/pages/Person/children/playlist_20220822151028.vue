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
  props:['playlist'],
  mounted() {
  console.log(this.playlist);    
  },
  methods: {
    changeRoute({id}){
        this.$router.push({ path: "/playListDetail", query: { id } });
    }
  },
  watch:{
    playlist(list){
      console.log(list)
    }
  },
  computed: {
    ...mapState({
      createList: (state) => state.user.createList,
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
