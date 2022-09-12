<template>
  <div class="follow-wrapper">
    <div class="follow-content">
      <div class="title">
        <h2>动态</h2>
        <span class="publish">
          <i class="el-icon-edit-outline"></i>
          发动态
        </span>
      </div>
      <!-- 关注的人动态 -->
      <div class="action">
        <div class="item" v-for="(e, index) in eventInfo" :key="index">
          <div class="avatar">
            <img v-lazy="e.user.avatarUrl" alt="" :key="e.user.avatarUrl" />
          </div>
          <div class="other">
            <div class="name">
              <div class="nickname">
                {{ e.user.nickname }}
              </div>
            </div>
            <div class="publishTime">
              {{ e.showTime | moment("MM月DD日 HH:mm") }}
            </div>
            <div class="des">
              {{ e.msg }}
            </div>
            <div
              class="music"
              v-show="e.program?.coverUrl || e.song?.album?.picUrl"
              @click="playMusic(e)"
            >
              <div class="cover">
                <img
                  v-lazy="e.program?.coverUrl || e.song?.album?.picUrl"
                  alt=""
                  :key="e.program?.coverUrl"
                />
                <i class="iconfont icon-bofangqi-bofang"></i>
              </div>
              <div class="music_info">
                <div class="songName">
                  {{ e.program?.name || e.song?.album.name }}
                </div>
                <div class="music_des">
                  <span class="tag" v-show="e.program">{{
                    e.program?.radio?.category
                  }}</span>
                  <span>{{
                    e.program?.radio?.name || e.song?.artists?.[0]?.name
                  }}</span>
                </div>
              </div>
            </div>
            <div class="pic">
              <div class="pic_item" v-for="(p, index) in e.pics" :key="index">
                <img v-lazy="p.squareUrl" alt="" :key="p.squareUrl" />
              </div>
            </div>
            <div class="video" v-show="e.video?.coverUrl">
              <img v-lazy="e.video?.coverUrl" alt="" />
              <i class="iconfont icon-bofang"></i>
              <span class="durationms">{{
                e.video?.durationms | moment("mm:ss")
              }}</span>
              <span class="playTime">
                <i class="iconfont icon-24gl-play"></i>
                {{ e.video?.playTime }}
              </span>
            </div>
          </div>
          <div class="comment clearfix">
            <ul>
              <li>
                <i class="iconfont icon-dianzan"></i>
                <span v-show="e.info?.likedCount"
                  >({{ e.info?.likedCount }})</span
                >
              </li>
              <li>
                <i class="iconfont icon-fenxiang1"></i>
                <span v-show="e.info?.shareCount"
                  >({{ e.info?.shareCount }})</span
                >
              </li>
              <li>
                <i class="iconfont icon-pinglun"></i>
                <span v-show="e.info?.commentCount"
                  >({{ e.info?.commentCount }})</span
                >
              </li>
              <li>
                <i class="el-icon-more"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="profile">
      <div class="n-frduser">
        <a href="javascript:;">
          <img v-lazy="profile.avatarUrl" alt="" />
        </a>
        <div class="other">
          <h5 class="f-thide">
            <a href="javascript:;">
              {{ profile.nickname }}
            </a>
            <i class="el-icon-female" v-show="profile.gender == 2"></i>
            <i class="el-icon-male" v-show="profile.gender == 1"></i>
          </h5>
          <p class="f-brk">
            {{ profile.signature }}
          </p>
        </div>
        <ul class="f-cb clearfix">
          <li>
            <a href="javascript:;">
              <em id="event_count">{{ profile.eventCount }}</em>
              <i>动态</i>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em id="event_count">{{ profile.newFollows }}</em>
              <i>关注</i>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <em id="event_count">{{ profile.followeds }}</em>
              <i>粉丝</i>
            </a>
          </li>
        </ul>
      </div>
      <div class="g-wrap">
        <div class="n-frdlist">
          <div class="hd">
            <h6>热门话题</h6>
            <a href="javascript:;">更多></a>
          </div>
          <ul id="recommendStarList">
            <li v-for="(h, index) in hotTopicData" :key="index">
              <a href="javascript:;">
                <img v-lazy="h.sharePicUrl" alt="" />
              </a>
              <div class="cnt">
                <div class="title">#{{ h.title }}#</div>
                <div class="participateCount">{{ h.participateCount }}参与</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Follow",
  data() {
    return {
      // 所有动态相关数据
      eventInfo: [],
      // 热门话题数据
      hotTopicData: [],
    };
  },
  mounted() {
    this.getEvent();
    this.getHotTopic();
  },
  methods: {
    // 获取动态消息
    async getEvent(pagesize, lasttime) {
      const result = await this.$API.user.reqEvent(pagesize, lasttime);
      if (result.code === 200) {
        // todo 深拷贝
        this.eventInfo = JSON.parse(JSON.stringify(result.event));
        // 将event中的json数据转换为对象
        this.eventInfo.forEach((item) => {
          item.json = JSON.parse(item.json);
          item = Object.assign(item, { ...item.json });
        });
      }
    },

    // 获取热门话题
    async getHotTopic(limit) {
      const result = await this.$API.search.reqHotTopic(limit);
      if (result.code === 200) {
        this.hotTopicData = result.hot;
      }
    },
    // 播放音乐
    playMusic(e){
      let id 
      if(e.hasOwnProperty('program')){
        id = e.program.mainTrackId
      }else{
        id = e.song.id
      }
      // todo 将当前的id存入vuex中
      this.$store.commit("playList/UPDATEMUSICID",id);
    }
  },
  computed: {
    ...mapState({
      profile: (state) => state.user.userDetail.profile || {},
    }),
  },
};
</script>

<style lang="less" scoped>
.follow-wrapper {
  display: flex;
  justify-content: space-between;
  overflow-y: scroll;
  height: calc(100vh - 130px);
  .follow-content {
    flex: 1;
    width: calc(100% - 300px);
    margin-left: 30px;
    text-align: left;
    margin-top: 25px;
    .title {
      h2 {
        display: inline-block;
        margin: 0;
      }
      .publish {
        margin-left: 20px;
        padding: 7px 12px;
        background-color: rgb(236, 65, 65);
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
      }
    }
    .action {
      margin-top: 30px;
      .item {
        padding: 20px 0;
        border-bottom: 1px solid @border-color;
        .avatar {
          display: inline-block;
          vertical-align: top;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid @border-color;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .other {
          width: calc(100% - 52px);
          margin-left: 10px;
          display: inline-block;
          font-size: 12px;
          .name {
            .nickname {
              color: @artist-color;
              font-size: 14px;
            }
          }
          .publishTime {
            color: @minor-color;
            margin: 5px 0;
          }
          .des {
            font-size: 14px;
            white-space: pre-line;
          }
          .music {
            margin: 10px 0;
            padding: 8px;
            background-color: @bg-color-hover;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
              background-color: @bg-deep-color-hover;
            }
            .cover {
              position: relative;
              display: inline-block;
              vertical-align: middle;
              width: 40px;
              height: 40px;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
              i {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                color: rgb(236, 65, 65);
                font-size: 25px;
                width: 25px;
                height: 25px;
              }
            }
            .music_info {
              display: inline-block;
              vertical-align: middle;
              margin-left: 10px;
              .songName {
                font-size: 14px;
              }
              .music_des {
                color: @minor-color;
                .tag {
                  border: 1px solid rgb(236, 65, 65);
                  color: rgb(236, 65, 65);
                  margin-right: 5px;
                }
              }
            }
          }
          .pic {
            width: 465px;
            .pic_item {
              display: inline-block;
              margin-right: 5px;
              width: 150px;
              height: 150px;
              border-radius: 10px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .video {
            position: relative;
            display: inline-block;
            margin-top: 10px;
            img {
              width: 380px;
              aspect-ratio: 1.8/1;
              border-radius: 7px;
              cursor: pointer;
            }
            & > span {
              position: absolute;
              color: #fff;
              bottom: 10px;
            }
            .durationms {
              right: 10px;
            }
            .playTime {
              left: 10px;
              i {
                font-size: 12px;
              }
            }
            .icon-bofang {
              position: absolute;
              width: 40px;
              height: 40px;
              color: #fff;
              font-size: 40px;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              cursor: pointer;
            }
          }
        }
        .comment {
          ul {
            margin-top: 10px;
            float: right;
            li {
              float: left;
              margin-left: 25px;
              color: @minor-color;
              cursor: pointer;
              span {
                margin-left: 5px;
                font-size: 12px;
                vertical-align: top;
              }
              &:hover {
                color: #333;
              }
            }
          }
        }
      }
    }
  }
  .profile {
    width: 300px;
    margin-left: 20px;
    border-left: 1px solid @border-color;
    box-sizing: border-box;
    .n-frduser {
      padding: 15px;
      text-align: left;
      background-color: @bg-color-hover;
      a {
        display: inline-block;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .other {
        width: calc(100% - 60px);
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        h5 {
          margin: 0;
          font-size: 12px;
          a {
            display: inline-block;
            color: #333;
            font-weight: normal;
            max-width: 160px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .f-brk {
          font-size: 12px;
          margin-top: 0;
          color: @minor-color;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .f-cb {
        margin-top: 10px;
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
            }
          }
          &:nth-child(even) {
            border-left: 1px solid @border-color;
            border-right: 1px solid @border-color;
            box-sizing: border-box;
          }
        }
      }
    }
    .g-wrap {
      padding: 0 15px;
      .n-frdlist {
        .hd {
          text-align: left;
          h6 {
            display: inline-block;
            margin: 10px 0;
          }
          a {
            color: #333;
            float: right;
            margin-top: 10px;
            font-size: 12px;
          }
        }
        #recommendStarList {
          li {
            margin-bottom: 5px;
            a {
              display: inline-block;
              img {
                width: 35px;
                height: 35px;
                border-radius: 5px;
              }
            }
            .cnt {
              display: inline-block;
              vertical-align: top;
              width: calc(100% - 45px);
              margin-left: 10px;
              text-align: left;
              font-size: 12px;

              .participateCount {
                color: @minor-color;
              }
              .title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
