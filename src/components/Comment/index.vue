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
      <h4>
        评论<span>(已有{{ totalCount }}条评论)</span>
      </h4>
      <el-input type="textarea" v-model="commentContent"></el-input>
      <div class="iconList">
        <span><i class="iconfont icon-xiaolian"></i></span>
        <span><i class="iconfont icon-aite"></i></span>
        <span><i class="iconfont icon-huatifuhao"></i></span>
        <span @click="handleComment(1)">评论</span>
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
              item.time | moment("YYYY年MM月DD日 HH:mm:ss")
            }}</span>
            <span class="operation">
              <span
                class="dianzan"
                @click="handleDianzan(item, 1)"
                v-if="!item.liked"
              >
                <i class="iconfont icon-dianzan"></i>
                <span class="likedCount">{{ item.likedCount }}</span>
              </span>

              <span class="dianzan" @click="handleDianzan(item, 0)" v-else>
                <i class="iconfont icon-dianzan_kuai"></i>
                <span class="likedCount">{{ item.likedCount }}</span>
              </span>

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
              <span
                class="delete"
                @click="handleComment(0, item)"
                v-if="item.user?.userId === $store.state.user.uid"
                >删除</span
              >
              <span
                class="dianzan"
                @click="handleDianzan(item, 1)"
                v-if="!item.liked"
              >
                <i class="iconfont icon-dianzan"></i>
                <span class="likedCount">{{ item.likedCount }}</span>
              </span>

              <span class="dianzan" @click="handleDianzan(item, 0)" v-else>
                <i class="iconfont icon-dianzan_kuai"></i>
                <span class="likedCount">{{ item.likedCount }}</span>
              </span>
              <i class="iconfont icon-fenxiang1"></i>
              <i class="iconfont icon-pinglun" @click="handleComment(2,item)"></i>
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
      // 评论内容
      commentContent: "",
    };
  },
  props: {
    type: {
      type: String,
      default: "",
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
      default: "",
    },
  },
  mounted() {
    this.InitData();
  },

  methods: {
    // 初始化数据
    InitData() {
      this.getAllComment(this.id, this.type, this.pageSize);
      this.getAllHotComment(this.id, this.type, this.pageSize);
    },

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

    // 点赞
    async handleDianzan(item, flag) {
      if (!this.$store.state.user.uid) {
        this.$message({
          message: "需要登录才可以点赞",
          type: "error",
          offset: 100,
        });
        return;
      }
      // 评论点赞
      const res = await this.$API.mv.reqCommentLike(
        this.id,
        item.commentId,
        flag,
        this.type
      );
      if (res.code === 200) {
        this.InitData();
      } else {
        this.$message({
          message: "点赞失败,请稍后在试",
          type: "error",
          offset: 100,
        });
      }
    },

    // 发表or删除评论
    async getPublishOrDeleteComment({ t, type, id, content, commentId }) {
      const res = await this.$API.mv.reqPublishOrDeleteComment(
        t,
        type,
        id,
        content,
        commentId
      );
      if (res.code === 200) {
        this.InitData();
        this.commentContent = "";
      } else {
        this.$message({
          message: "操作失败,请稍后在试",
          type: "error",
          offset: 100,
        });
      }
    },
    
    // 处理评论
    handleComment(flag, item) {
      if (!this.$store.state.user.uid) {
        this.$message({
          message: "需要登录才可以操作",
          type: "error",
          offset: 100,
        });
        return;
      }
      const { type, id } = this;
      const t = flag;
      let commentId
      if (flag !== 1) {
        commentId = item.commentId;
      }
      const content = this.commentContent;
      switch (flag) {
        // 代表删除
        case 0:
          this.getPublishOrDeleteComment({ t, type, id, commentId });
          break;
        // 发送
        case 1:
          this.getPublishOrDeleteComment({ t, type, id, content });
          break;
        // 回复
        case 2:
          this.getPublishOrDeleteComment({ t, type, id, content, commentId });
          break;
      }
    },

    //  评论翻页
    handleCurrentChange(val) {
      this.pageNo = val;
      const { id, type, pageSize, cursor } = this;
      this.getAllComment(id, type, pageSize, val, cursor);

      // 触发自定义事件,使页面滚动
      this.$emit("changeScrollTop", "scroll");
    },
  },
  watch: {
    // 监听id的变化
    id(id) {
      this.getAllComment(id, this.type, this.pageSize);
      this.getAllHotComment(id, this.type, this.pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.comment-wrapper {
  padding-bottom: 50px;
  .publish {
    h4 {
      text-align: left;
      span {
        color: @minor-color;
        font-size: 12px;
        font-weight: normal;
      }
    }
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
            .dianzan {
              .likedCount {
                font-size: 12px;
              }
              .icon-dianzan,
              .icon-dianzan_kuai {
                font-size: 20px;
              }
              .icon-dianzan_kuai {
                color: rgb(236, 65, 65);
                &:hover {
                  color: rgb(236, 65, 65) !important;
                }
              }
            }
            i,
            span {
              cursor: pointer;

              &:hover {
                color: #333;
              }
            }
            i {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
