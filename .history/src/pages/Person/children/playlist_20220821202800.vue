<template>
  <div>
    <h2>11222334546454</h2>
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
