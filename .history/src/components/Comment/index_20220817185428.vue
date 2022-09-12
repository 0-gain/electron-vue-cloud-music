<template>
  <div
    class="comment-wrapper"
    ref="commentWrap"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 发表评论 -->
    <div class="publish" v-if="isShowPublish">
      <el-input type="textarea"></el-input>
      <div class="iconList">
        <span><i class="iconfont icon-xiaolian"></i></span>
        <span><i class="iconfont icon-aite"></i></span>
        <span><i class="iconfont icon-huatifuhao"></i></span>
        <span>评论</span>
      </div>
    </div>

    <!-- 热评 -->
    <div class="comments-content" v-if="pageNo == 1 && hotComments.length">
      <h4>精彩评论</h4>
      <div
        class="comments-item"
        v-for="(item, index) in hotComments"
        :key="index"
      >
        <el-avatar
          :src="item.user.avatarUrl"
          icon="el-icon-user-solid"
          size="medium"
        ></el-avatar>
        <div class="cntWrap">
          <div class="des">
            <span class="name">{{ item.user.nickname }}:</span>
            <span class="comment">{{ item.content }}</span>
          </div>
          <div class="beReplied" v-if="item.beReplied[0]">
            <span class="name">@{{ item.beReplied[0].user.nickname }}:</span>
            <span class="comment">{{ item.beReplied[0].content }}</span>
          </div>
          <div class="otherInfo">
            <span class="createTime">{{
              item.time | moment("YYYY年MM月DD日 HH:mm")
            }}</span>
            <span class="operation">
              <i class="iconfont icon-dianzan"
                ><span class="likedCount">{{ item.likedCount }}</span></i
              >
              <i class="iconfont icon-fenxiang1"></i>
              <i class="iconfont icon-pinglun"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新评论 -->
    <div class="comments-content">
      <h4>最新评论({{ totalCount }})</h4>
      <div class="comments-item" v-for="(item, index) in comments" :key="index">
        <el-avatar
          :src="item.user.avatarUrl"
          icon="el-icon-user-solid"
          size="medium"
        ></el-avatar>
        <div class="cntWrap">
          <div class="des">
            <span class="name">{{ item.user.nickname }}:</span>
            <span class="comment">{{ item.content }}</span>
          </div>
          <div class="beReplied" v-if="item.beReplied">
            <span class="name">@{{ item.beReplied[0].user.nickname }}:</span>
            <span class="comment">{{ item.beReplied[0].content }}</span>
          </div>
          <div class="otherInfo">
            <span class="createTime">{{
              item.time | moment("YYYY年MM月DD日 HH:mm")
            }}</span>
            <span class="operation">
              <i class="iconfont icon-dianzan"
                ><span class="likedCount">{{ item.likedCount }}</span></i
              >
              <i class="iconfont icon-fenxiang1"></i>
              <i class="iconfont icon-pinglun"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="pageNo"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalCount"
      background
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      // 当前页
      pageNo: 1,
      // 一页展示多少条评论
      pageSize: 20,
      // 是否还有更多的热评
      moreHot: false,
      // 全部评论
      comments: [],
      // 全部热评
      hotComments: [],
      // 获取翻页的时间
      cursor: "",
      // 总共评论数量
      totalCount: 0,
      // 加载
      loading: true,
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return;
      },
    },
    // 是否显示评论框
    isShowPublish: {
      type: Boolean,
      default() {
        return true;
      },
    },
    id: {
      type: String,
      default() {
        return;
      },
    },
  },
  mounted() {
    this.getAllComment(this.id, this.type, this.pageSize);
    this.getAllHotComment(this.id, this.type, this.pageSize);
  },
  methods: {
    // 获取所有的评论
    async getAllComment(id, type, pageSize, pageNo, cursor) {
      const result = await this.$API.mv.reqAllComment(
        id,
        type,
        pageSize,
        pageNo,
        cursor
      );
      if (result.code == 200) {
        this.comments = result.data.comments;
        this.cursor = result.data.cursor;
        this.totalCount = result.data.totalCount;
        this.loading = false;
      }
    },

    // 获取所有的热评
    async getAllHotComment(id, type, pageSize) {
      const result = await this.$API.mv.reqAllHotComment(id, type, pageSize);
      if (result.code == 200) {
        this.hotComments = result.hotComments;
        this.moreHot = !result.hasMore;
        this.loading = false;
      }
    },

    //  评论翻页
    handleCurrentChange(val) {
      this.pageNo = val;
      const { type, pageSize, cursor } = this;
      this.getAllComment(this.$route.query.id, type, pageSize, val, cursor);

      // 触发自定义事件,使页面滚动
      this.$emit("changeScrollTop", "scroll");
    },
  },
};
</script>

<style lang="less" scoped>
.comment-wrapper {
  padding-bottom: 50px;
  .publish {
    .iconList {
      margin-top: 10px;
      text-align: left;
      span {
        margin-right: 10px;
        color: #666666;
        i {
          font-size: 20px;
        }
        &:last-child {
          float: right;
          padding: 5px 15px;
          border: 1px solid #dcdfe6;
          border-radius: 50px;
          font-size: 14px;
          margin-top: -5px;
        }
      }
    }
  }
  .comments-content {
    text-align: left;
    .comments-item {
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #efefef;
      width: 100%;
      overflow: hidden;
      &:last-child {
        border-bottom: none;
      }
      .el-avatar {
        float: left;
      }
      .cntWrap {
        margin-left: 46px;
        font-size: 12px;
        color: #666666;
        .des {
          .name {
            color: steelblue;
            margin-right: 5px;
          }
        }
        .beReplied {
          background-color: #efefef;
          margin-top: 10px;
          padding: 7px;
          .name {
            color: steelblue;
            margin-right: 5px;
            cursor: pointer;
          }
        }
        .otherInfo {
          margin-top: 10px;
          color: #909399;
          .operation {
            float: right;
            i {
              cursor: pointer;
              margin-left: 20px;
              .likedCount {
                font-size: 12px;
              }
              &:hover {
                color: #333;
              }
            }
            .icon-dianzan {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
