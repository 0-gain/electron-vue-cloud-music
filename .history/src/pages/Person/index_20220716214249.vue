<template>
  <div class="person-Wrapper">
    <UserItem :itemData="userDetail"/>
  </div>
</template>

<script>
import UserItem from "@/components/UserItem";
export default {
  name: "Person",
  data() {
    return {
        userDetail:{}
    };
  },
  mounted() {
    // this.getUser_detail(97137413);
    this.getArtistDetail(this.$route.query.id)
  },
  methods: {
    // 获取用户详情
    async getUser_detail(id) {
      const result = await this.$API.user.reqUser_detail(id);
      console.log(result);
    },

    // 获取歌手详情
    async getArtistDetail(id) {
      const result = await this.$API.singer.reqArtistDetail(id);
      if (result.code === 200) {
        this.userDetail = result.data.user;
        console.log(this.userDetail);
      }
    },
  },
  components: { UserItem },
};
</script>

<style></style>
