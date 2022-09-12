<template>
  <div>
    <listItem :listData="createList"></listItem>
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

<style></style>
