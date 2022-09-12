<template>
  <div>
    <listItem :listData="createList" :isShowIcon='false'></listItem>
  </div>
</template>

<script>
import listItem from "@/components/list-item";
import { mapState } from "vuex";
export default {
  // 创建的歌单
  name: "Playlist",
  computed: {
    ...mapState({
      createList: (state) => state.user.createList,
    }),
  },
  components: { listItem },
};
</script>

<style lang='less' scoped>
/deep/.list-content{
    .cover{
        width: 100px;
        height: 100px;
        aspect-ratio: 1/1;
    }
}
</style>
