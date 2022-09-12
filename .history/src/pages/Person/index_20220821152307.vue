<template>
  <div class="person-Wrapper clearfix">
    <div class="person-info">
      <div class="avatar">
        <img v-lazy="userDetail.profile?.avatarUrl" alt="" />
      </div>
      <div class="info">
        <h3 class="nickname">
          {{ userDetail.profile?.nickname }}
        </h3>
        <div class="level">
          <p>Lv{{ userDetail.level }}</p>
          <i class="el-icon-female" v-if="userDetail.profile?.gender === 2"></i>
          <i class="el-icon-male" v-if="userDetail.profile?.gender === 1"></i>
          <button class="edit">
            <i class="el-icon-edit"></i>
            编辑个人信息
          </button>
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
      userDetail: {},
    };
  },
  mounted() {
    this.getUser_detail(this.$route.query.id);
  },
  methods: {
    // 获取用户详情
    async getUser_detail(id) {
      const result = await this.$API.user.reqUser_detail(id);
      if (result.code === 200) {
        this.userDetail = result;
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

<style lang="less" scoped>
.person-Wrapper {
  margin: 0 30px;
  .person-info {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .avatar {
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: 1px solid @border-color;
      }
    }
    .info {
      width: calc(100% - 200px);
      text-align: left;
      h3 {
        margin: 0;
      }
      .level {
        margin-top: 10px;
        p{
          margin: 0;
          display: inline-block;
          font-size: 12px;
          background-color:@bg-deep-color-hover;
          padding: 3px 7px;
          border-radius: 50px;
          transform: scale(.9);
        }
        .edit{
          float: right;
          border-radius: 50px;
          border-color: @border-color;
        }
      }
    }
  }
}
</style>
