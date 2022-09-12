<template>
  <div class="person-Wrapper">
    <div class="person-info">
      <div class="avatar">
        <img v-lazy="userDetail.profile.avatarUrl" alt="">
      </div>
      <div class="info">
        <div class="nickname">
          {{userDetail.profile.nickname}}
        </div>
        <div class="level">
          LV{{userDetail.level}}
        </div>
        <div class="counts"></div>
        <div class="location"></div>
        <div class="society"></div>
        <div class="des"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Person",
  data() {
    return {
        userDetail:{}
    };
  },
  mounted() {
    this.getUser_detail(this.$route.query.id)
  },
  methods: {
    // 获取用户详情
    async getUser_detail(id) {
      const result = await this.$API.user.reqUser_detail(id);
      if(result.code === 200){
        this.userDetail = result
      }
    },

    // 获取歌手详情
    async getArtistDetail(id) {
      const result = await this.$API.singer.reqArtistDetail(id);
      if (result.code === 200) {
        // this.userDetail = result.data.user;
        console.log(this.userDetail);
      }
    },
  },
};
</script>

<style></style>
