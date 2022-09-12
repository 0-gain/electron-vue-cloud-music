<template>
  <div class="person-Wrapper clearfix">
    <div class="content">
      <div class="person-info">
        <div class="avatar">
          <img v-lazy="userDetail.profile?.avatarUrl" alt="" />
        </div>
        <div class="info">
          <h3 class="nickname">
            {{ userDetail.profile?.nickname }}
          </h3>
          <div class="level clearfix">

            <div class="allAuthTypes" v-for="(a,index) in userDetail.profile?.allAuthTypes" :key="index">
              <img v-lazy="userDetail.profile?.avatarDetail?.identityIconUrl" alt="" :key="index">
              {{a.desc}}
            </div>

            <p>Lv{{ userDetail.level }}</p>
            <i
              class="el-icon-female"
              v-if="userDetail.profile?.gender === 2"
            ></i>
            <i class="el-icon-male" v-if="userDetail.profile?.gender === 1"></i>
            <button class="edit">
              <i class="el-icon-edit"></i>
              编辑个人信息
            </button>
          </div>
          <ul class="f-cb clearfix">
            <li>
              <a href="javascript:;">
                <em id="event_count">{{ userDetail.profile?.eventCount }}</em>
                <i>动态</i>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <em id="event_count">{{ userDetail.profile?.follows }}</em>
                <i>关注</i>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <em id="event_count">{{ userDetail.profile?.followeds }}</em>
                <i>粉丝</i>
              </a>
            </li>
          </ul>
          <div class="des">
            个人介绍: <span>{{ userDetail.profile?.signature ? userDetail.profile?.signature : '暂无介绍'}}</span>
          </div>
        </div>
      </div>

      <HomeNav
        :navBarData="navData"
        :fiexdTop="false"
        @clickBarItem="clickBarItem"
      >
      </HomeNav>

      <div class="person-playlist">
        <router-view
          :createList="createList"
          :collectionList="collectionList"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNav from "@/components/HomeNav";
export default {
  name: "Person",
  data() {
    return {
      // 导航的数据
      navData: [
        { name: "创建的歌单", path: "/person/createPlaylist" },
        { name: "收藏的歌单", path: "/person/collection" },
        { name: "创建的音乐专栏", path: "/person/column" },
      ],
      // 用户详情
      userDetail: {},
      // 用户歌单
      playlist: [],
      // 创建的歌单
      createList: [],
      // 收藏的歌单
      collectionList: [],
    };
  },
  mounted() {
    this.getUser_detail(this.$route.query.id);
    this.getUser_playlist(this.$route.query.id);
    this.reqUser_dj(this.$route.query.id);
  },
  methods: {
    // 获取歌手详情
    async getArtistDetail(id) {
      const result = await this.$API.singer.reqArtistDetail(id);
      if (result.code === 200) {
        // this.userDetail = result.data.user;
        console.log(this.userDetail);
      }
    },

    // 获取用户歌单
    async getUser_playlist(id) {
      const result = await this.$API.user.reqUser_playlist(id);
      if (result.code === 200) {
        console.log(result)
        let { id } = this.$route.query;
        result.playlist.forEach((element) => {
          if (element.userId == id) {
            this.createList.push(element);
          } else {
            this.collectionList.push(element);
          }
        });
      }
    },

    // 获取用户详情
    async getUser_detail(id) {
      const result = await this.$API.user.reqUser_detail(id);
      if (result.code === 200) {
        this.userDetail = result;
      }
    },

    // 获取用户电台
    async reqUser_dj(id){
      const result = await this.$API.user.reqUser_dj(id)
      console.log(result)
    },

    //跳转路由
    clickBarItem({ path }) {
      this.$router.push({ path, query: { id: this.$route.query.id } });
    },
  },

  components: { HomeNav },
};
</script>

<style lang="less" scoped>
.person-Wrapper {
  height: calc(100vh - 130px);
  overflow: hidden;
  overflow-y: scroll;
  .content {
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
          padding-bottom: 5px;
          border-bottom: 1px solid @border-color;
          .allAuthTypes{
            display: inline-block;
            font-size: 12px;
            vertical-align: top;
            img{
              width: 15px;
              height: 15px;
            }
          }
          p {
            margin: 0;
            display: inline-block;
            font-size: 12px;
            background-color: @bg-deep-color-hover;
            padding: 3px 7px;
            border-radius: 50px;
            transform: scale(0.9);
          }
          .edit {
            float: right;
            border-radius: 50px;
            border: 1px solid @border-color;
            padding: 5px 10px;
            background-color: transparent;
            cursor: pointer;
            i {
              margin-right: 5px;
            }
            &:hover {
              background-color: @bg-deep-color-hover;
            }
          }
        }
        .f-cb {
          margin-top: 20px;
          width: 25%;
          li {
            width: calc(100% / 3);
            float: left;
            text-align: center;
            a {
              color: #333;
              em {
                display: block;
                font-style: normal;
              }
              i {
                font-style: normal;
                color: @minor-color;
                font-size: 12px;
              }
            }
            &:nth-child(even) {
              border-left: 1px solid @border-color;
              border-right: 1px solid @border-color;
              box-sizing: border-box;
            }
          }
        }
        .des {
          font-size: 12px;
          margin-top: 10px;
          span {
            color: @minor-color;
          }
        }
      }
    }
  }
}
</style>
