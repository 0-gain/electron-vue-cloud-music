<template>
  <div class="mvDetail-wrapper" ref="wrapper">
    <CloudHeader />
    <div class="detail-wrap">
      <div class="title clearfix">
        <i class="iconfont icon-arrow-left"></i>
        <h3>{{ type == "MV" ? "MV详情" : "视频详情" }}</h3>
      </div>
      <div class="detail-content">
        <vue-core-video-player
          :src="videoSource"
          preload="none"
          autoplay
          @error="errorHandle"
          v-if="videoSource.length"
        >
        </vue-core-video-player>

        <div class="artists" v-if="mvDetailData.artists">
          <img
            :src="mvDetailData.artists[0].img1v1Url"
            alt=""
            v-if="mvDetailData.artists"
          />
          <img :src="avatar" alt="" v-else />
          <span v-if="mvDetailData.artists">
            <span> {{ mvDetailData.artists[0].name }} </span>
            <span v-if="mvDetailData.artists.length > 1">
              /{{ mvDetailData.artists[1].name }}
            </span>
          </span>
        </div>

        <div class="artists" v-else>
          <img
            :src="mvDetailData.creator.avatarUrl"
            alt=""
            v-if="mvDetailData.creator"
          />
          <img :src="avatar" alt="" v-else />
          <span v-if="mvDetailData.creator"> {{ mvDetailData.creator.nickname }} </span>
        </div>

        <div class="otherInfo">
          <div class="name">
            <h2>
              {{ mvDetailData.name || mvDetailData.title }}
              <i
                class="el-icon-caret-bottom"
                @click="isShowDesc = true"
                v-if="!isShowDesc"
              ></i>
              <i
                class="el-icon-caret-top"
                @click="isShowDesc = false"
                v-else
              ></i>
            </h2>
          </div>

          <div class="publishInfo">
            <span>发布：{{ mvDetailData.publishTime }}</span>
            <span class="playCount"
              >播放：{{
                (mvDetailData.playCount
                  ? mvDetailData.playCount
                  : mvDetailData.playTime) | numberFormat
              }}次</span
            >
          </div>

          <!-- tag标签 -->
          <ul class="videoGroup clearfix">
            <li v-for="tag in mvDetailData.videoGroup" :key="tag.id">
              {{ tag.name }}
            </li>
          </ul>

          <!-- 视频的描述 -->
          <div class="desc" v-show="isShowDesc">
            {{ mvDetailData.desc || mvDetailData.description }}
          </div>

          <!-- 相关操作 -->
          <div class="operation">
            <a href="javascript:;">
              <i class="iconfont icon-dianzan"></i>
              <span>赞({{ likedCount | numberFormat }})</span>
            </a>
            <a href="javascript:;">
              <i class="iconfont icon-folder-add"></i>
              <span>收藏({{ (mvDetailData.subCount ? mvDetailData.subCount : mvDetailData.subscribeCount) | numberFormat }})</span>
            </a>
            <a href="javascript:;">
              <i class="iconfont icon-fenxiang1"></i>
              <span>分享({{ mvDetailData.shareCount | numberFormat }})</span>
            </a>
            <a href="javascript:;">
              <i class="iconfont icon-xiazai"></i>
              <span>下载MV</span>
            </a>
          </div>

          <!-- 评论 -->
          <Comment v-if="commentType" ref="comments" :type="commentType" @changeScrollTop="changeScrollTop" />
        </div>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="related-recommend">
      <div class="title">
        <h3>相关推荐</h3>
      </div>
      <div class="recommend-content">
        <div
          class="content-item clearfix"
          v-for="(v, index) in relatedVideoData"
          :key="index"
        >
          <div class="cover">
            <img :src="v.coverUrl" />
            <span class="icon">
              <i class="iconfont icon-24gl-play"></i>
              <span class="playTime">{{ v.playTime | numberFormat }}</span>
            </span>
            <span class="duration">{{ v.durationms | moment("HH:mm") }}</span>
          </div>
          <div class="other">
            <div class="name">{{ v.title }}</div>
            <p class="creator" v-if="v.creator">
              by {{ v.creator[0].userName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
import CloudHeader from "@/Layout/components/CloudHeader.vue";
export default {
  name: "MvDetail",
  data() {
    return {
      // 视频的url
      videoSource: [],
      // 分辨率
      resolution: [360, 720, 1080],
      // mv数据
      mvDetailData: {},
      // 头像
      avatar: require("@/assets/images/imgLoading.png"),
      // 点赞的数据
      likedCount: 0,
      // 是否显示mv描述
      isShowDesc: false,
      // 加载
      loading: true,
      // 相关推荐
      relatedVideoData: [],
      // 评论的类型
      commentType:'',
      // 视频类型
      type:''
    };
  },
  mounted() {
    this.InitData();
  },
  

  methods: {
    // 初始化数据
    InitData() {
      this.type = this.$route.query.type
      if (this.type == "MV") {
        this.commentType = '1'
        this.getMvUrl(this.$route.query.id, this.resolution);
        this.getMvDetail(this.$route.query.id);
        this.getRelatedVideo(this.$route.query.id);
        this.reqMvOtherData(this.$route.query.id);
      } else {
        this.commentType = '5'
        this.getVideoDetail(this.$route.query.id);
        this.getVideoOtherInfo(this.$route.query.id);
        this.getVideoUrl(this.$route.query.id);
        this.getRelatedVideo(this.$route.query.id);
      }
    },

    // 自定义事件(滚动到顶部)
    changeScrollTop(val) {
      // 实现滚动到顶部
      this.$refs.wrapper.scrollTo({ top: 743, behavior: "smooth" });
    },
    // * 获取mv地址
    async getMvUrl(id, resolution) {
      for (let i = 0; i < resolution.length; i++) {
        const result = await this.$API.mv.reqMvUrl(id, resolution[i]);
        console.log(result)
        if (result.code == 200) {
          this.loading = false;
          this.videoSource.push({
            src: result.data.url,
            resolution: resolution[i],
          });
        }
      }
    },

    // * 获取mv数据
    async getMvDetail(id) {
      const result = await this.$API.mv.reqMvDetail(id);
      if (result.code === 200) {
        this.mvDetailData = result.data;
        console.log(result);
      }
    },

    // * 获取相关视频
    async getRelatedVideo(id) {
      const result = await this.$API.video.reqRelatedVideo(id);
      if (result.code === 200) {
        this.relatedVideoData = result.data;
        console.log(result);
      }
    },

    // * 获取mv的点赞转发评论数据（getMvDetail数据里面没有点赞的数据）
    async reqMvOtherData(mvid) {
      const result = await this.$API.mv.reqMvOtherData(mvid);
      this.likedCount = result.likedCount;
    },
    // 视频加载错误的回调
    errorHandle(e) {
      console.log(e);
    },

    // * 获取视频详情
    async getVideoDetail(id) {
      const result = await this.$API.video.reqVideoDetail(id);
      if(result.code === 200){
        this.mvDetailData = result.data
      }
    },

    // * 获取视频点赞转发评论数据
    async getVideoOtherInfo(id) {
      const result = await this.$API.video.reqVideoOtherInfo(id);
      this.likedCount = result.likedCount
    },

    // * 获取视频播放地址
    async getVideoUrl(vid) {
        const result = await this.$API.video.reqVideoUrl(vid);
        if (result.code == 200) {
          const {url,r} = result.urls[0]
          let arr = {src:url,resolution:r}
          this.videoSource.push(arr)
          console.log(result)
        }
    },
  },
  components: {
    Comment,
    CloudHeader,
  },
};
</script>

<style lang="less" scoped>
.mvDetail-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: left;
  margin-top: 60px;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  .detail-wrap {
    width: 600px;
    margin-right: 30px;
    .title {
      position: relative;
      width: 100%;
      cursor: pointer;
      h3 {
        margin-left: 30px;
        margin-bottom: 10px;
      }
      i {
        position: absolute;
        left: 0;
        top: 19px;
        font-size: 25px;
        color: #909399;
      }
    }
    .detail-content {
      .vcp-container {
        width: 600px;
        aspect-ratio: 1.8/1;
      }

      .artists {
        height: 50px;
        margin-top: 20px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 5px;
        }
        span {
          color: #909399;
          vertical-align: middle;
        }
      }

      .otherInfo {
        .name {
          h2 {
            display: inline-block;
          }
          i {
            margin-left: 10px;
            font-size: 25px;
            cursor: pointer;
          }
        }
        .publishInfo {
          color: #d1d1d1;
          font-size: 12px;
          .playCount {
            margin-left: 20px;
          }
        }
        .videoGroup {
          width: 100%;
          margin-top: 20px;
          li {
            float: left;
            margin-right: 15px;
            line-height: 20px;
            background-color: #f7f7f7;
            padding: 0 5px;
            border-radius: 15px;
            font-size: 12px;
          }
        }
        .desc {
          margin-top: 20px;
          font-size: 12px;
        }
        .operation {
          margin: 20px 0;
          a {
            display: inline-block;
            cursor: pointer;
            color: #333;
            padding: 5px 20px;
            border: 1px solid #d1d1d1;
            margin-right: 10px;
            font-size: 12px;
            border-radius: 50px;
            i {
              margin-right: 5px;
              font-size: 20px;
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
  .related-recommend {
    .content-item {
      height: 90px;
      cursor: pointer;
      .cover {
        position: relative;
        float: left;
        width: 150px;
        img {
          width: 100%;
          aspect-ratio: 1.8/1;
          border-radius: 5px;
        }
        .icon {
          position: absolute;
          right: 5px;
          top: 3px;
          color: #fff;
          font-size: 12px;
          i {
            font-size: 13px;
            margin-right: 5px;
          }
        }
        .duration {
          position: absolute;
          color: #fff;
          right: 5px;
          bottom: 10px;
          font-size: 12px;
        }
      }
      .other {
        position: relative;
        height: 100%;
        float: left;
        font-size: 13px;
        padding: 10px 0 0 10px;
        box-sizing: border-box;
        .name {
          width: 140px;
          //溢出内容隐藏
          overflow: hidden;
          //文本溢出部分用省略号表示
          text-overflow: ellipsis;
          //特别显示模式
          display: -webkit-box;
          //行数
          -webkit-line-clamp: 2;
          line-clamp: 2;
          //盒子中内容竖直排列
          -webkit-box-orient: vertical;
        }
        .creator {
          position: absolute;
          bottom: 20px;
          margin: 0;
          color: #d1d1d1;
        }
      }
    }
  }
}
</style>
