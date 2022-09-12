<template>
  <div class="playlistDetail-wrapper clearfix">
    <div class="playlistDetail-content">
      <div class="detail-content clearfix">
        <div class="cover">
          <img
            v-lazy="
              itemData.coverImgUrl ||
              itemData.avatarUrl ||
              itemData.blurPicUrl ||
              itemData.cover
            "
            alt=""
          />
        </div>
        <div class="describe">
          <div class="title">
            <span class="highQuality" v-if="itemData.highQuality"
              >精品歌单</span
            >
            <h2>{{ itemData.name || itemData.nickname }}</h2>
          </div>

          <div class="create" v-if="itemData.creator">
            <div class="creator">
              <img :src="itemData.creator.avatarUrl" alt="" />
              <span>{{ itemData.creator.nickname }}</span>
              <span class="createTime"
                >{{ itemData.createTime | toDate }}创建</span
              >
            </div>
          </div>

          <div class="identity" v-if="itemData.avatarDetail">
            <div class="avatarDetail">
              <img v-lazy="itemData.avatarDetail.identityIconUrl" alt="" />
              <span class="detailDescription">{{
                itemData.detailDescription
              }}</span>
              <span class="level"
                >Lv{{ itemData.avatarDetail.identityLevel }}</span
              >
              <i class="el-icon-male" v-if="itemData.gender === 1"></i>
              <i class="el-icon-female" v-if="itemData.gender === 2"></i>
            </div>

            <div class="operate">
              <span class="mic"
                ><i class="iconfont icon-ziyuan50"></i> 歌手页</span
              >
              <span class="mail"
                ><i class="iconfont icon-email"></i> 发私信</span
              >
              <span class="follow"
                ><i class="iconfont el-icon-plus"></i> 加关注</span
              >
              <span class="more"><i class="iconfont el-icon-more"></i></span>
            </div>
          </div>

          <ul v-if="itemData.albumSize">
            <li>
              <i class="iconfont icon-folder-add"></i>
              <span>收藏</span>
            </li>
          </ul>

          <ul v-if="itemData.creator || itemData.info">
            <li class="playAll">
              <i class="iconfont icon-bofang1"></i>
              <span>播放全部</span>
              <i class="iconfont icon-zengjia"></i>
            </li>
            <li>
              <i class="el-icon-folder-add"></i>
              <span
                >收藏({{
                  ((itemData.subscribedCount || subCount) ? ((itemData.subscribedCount || subCount) | 'numberFormat')  : 0)
                }})</span
              >
            </li>
            <li>
              <i class="iconfont icon-fenxiang"></i>
              <span
                >分享({{
                  (itemData.shareCount || itemData.info?.shareCount) ?
                   ((itemData.shareCount || itemData.info?.shareCount) | 'numberFormat') : 0
                }})</span
              >
            </li>
            <li>
              <i class="iconfont icon-xiazai"></i>
              <span>下载全部</span>
            </li>
          </ul>

          <div class="msg">
            <div class="track" v-if="itemData.albumSize">
              <span class="musicSize"
                >单曲数:{{ itemData.musicSize | numberFormat }}</span
              >
              <span class="albumSize"
                >专辑数:{{ itemData.albumSize | numberFormat }}</span
              >
              <span class="mvSize"
                >MV数:{{ itemData.mvSize | numberFormat }}</span
              >
            </div>

            <div class="tags" v-if="itemData.tags">
              标签:
              <span v-for="tag in itemData.tags" :key="tag">
                <a href="javascript:;">{{ tag }} </a>
                <span class="line">/</span>
              </span>
            </div>

            <div class="track" v-if="itemData.trackCount">
              歌曲:
              <span class="trackCount">{{ itemData.trackCount }}</span>
              播放:
              <span class="playCount">{{
                itemData.playCount | numberFormat
              }}</span>
            </div>

            <div
              class="description"
              v-if="isShowDescription"
              :class="{ text: isAddClassText }"
            >
              简介:
              <span>{{ itemData.description }}</span>
              <i
                class="el-icon-caret-top"
                @click="isAddClassText = false"
                v-if="isAddClassText"
              ></i>

              <i
                class="el-icon-caret-bottom"
                @click="isAddClassText = true"
                v-else
              ></i>
            </div>

            <div class="create" v-if="itemData.artist">
              <div class="creator">
                <div>歌手：<a href="javascript:;" class="name">{{ itemData.artist.name }}</a></div>
                <div class="publishTime"
                  >时间：{{ itemData.publishTime | toDate }}</div
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 歌曲列表 -->
      <div class="playList-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  data() {
    return {
      //是否添加text属性
      isAddClassText: false,
    };
  },
  props: {
    // 详情信息
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 收藏的数量
    subCount: {
      type: Number,
      default() {
        return;
      },
    },
    // 是否显示简介
    isShowDescription:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
};
</script>

<style lang="less">
.playlistDetail-wrapper {
  position: relative;
  height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  .playlistDetail-content {
    width: calc(100vw - 250px);
    .detail-content {
      width: 100%;
      display: flex;
      margin-top: 20px;
      .cover {
        float: left;
        width: 190px;
        height: 190px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .circle {
        float: left;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #dcdfe6;
      }
      .describe {
        flex: 1;
        float: left;
        margin-left: 20px;
        height: 100%;
        box-sizing: border-box;
        .title {
          width: 100%;
          float: left;
          h2 {
            float: left;
            margin: 0 0 10px 0;
          }
          .highQuality {
            float: left;
            padding: 2px 3px;
            margin-top: 5px;
            border: 1px solid rgb(236, 65, 65);
            color: rgb(236, 65, 65);
            font-size: 13px;
            border-radius: 5px;
          }
        }
        .create {
          float: left;
          width: 100%;
          height: 35px;
          line-height: 35px;
          .creator {
            float: left;
            img {
              width: 25px;
              height: 25px;
              margin-right: 10px;
              border-radius: 50%;
              vertical-align: middle;
            }
            span {
              font-size: 12px;
              color: rgb(80, 125, 175);
            }
            .createTime {
              color: #333;
              margin-left: 10px;
            }
            .name{
              color: rgb(80, 125, 175);
            }
          }
        }
        .identity {
          float: left;
          width: 100%;
          height: 40px;
          line-height: 35px;
          .avatarDetail {
            float: left;
            font-size: 12px;
            position: relative;
            img {
              position: absolute;
              top: 9px;
              width: 17px;
              height: 17px;
            }
            .detailDescription {
              color: rgb(236, 65, 65);
              background-color: #ffe6e8;
              padding: 2px 5px 2px 18px;
              border-radius: 50px;
            }
            .level {
              margin-left: 10px;
              background-color: #efefef;
              padding: 2px 7px;
              border-radius: 50px;
            }
            .el-icon-male {
              color: rgb(91, 187, 209);
              font-size: 16px;
              background-color: rgb(191, 243, 255);
              border-radius: 50%;
              margin-left: 10px;
              vertical-align: middle;
            }
          }
          .operate {
            float: right;
            span {
              border: 1px solid #dcdfe6;
              padding: 7px 15px;
              border-radius: 50px;
              font-size: 14px;
              margin-left: 10px;
              .el-icon-plus {
                color: rgb(236, 65, 65);
              }
            }
          }
          border-bottom: 1px solid #dcdfe6;
        }
        ul {
          float: left;
          width: 100%;
          li {
            padding: 3px 15px;
            float: left;
            background-color: #fff;
            border-radius: 50px;
            margin-right: 5px;
            color: #333;
            font-size: 14px;
            border: 1px solid #dddee0;
            box-sizing: border-box;
            i {
              font-size: 20px;
              margin-right: 5px;
              vertical-align: middle;
            }

            .icon-xiazai,
            .icon-fenxiang {
              font-size: 18px;
            }

            span {
              vertical-align: middle;
            }
            .icon-folder-add {
              color: #666666;
            }
          }
          .playAll {
            padding-right: 2px;
            background-color: rgb(236, 65, 65);
            color: #fff;
            .icon-bofang1 {
              font-size: 15px;
            }
            span {
              margin-right: 5px;
            }
            .icon-zengjia {
              float: right;
              font-size: 18px;
              margin-right: 5px;
            }
          }
        }
        .msg {
          margin-top: 15px;
          float: left;
          font-size: 13px;
          text-align: left;
          .tags {
            width: 100%;
            span {
              a {
                color: rgb(80, 125, 175);
              }
              .line {
                margin: 0 4px 0 0;
              }
              &:last-child {
                .line {
                  display: none;
                }
              }
            }
          }
          .track {
            span {
              margin-right: 20px;
            }
          }
          .description {
            width: 500px;
            padding-right: 20px;
            text-align: left;
            position: relative;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            // 添加遮罩层，在文字较少时覆盖i标签
            &::after {
              content: "";
              width: 100%;
              height: 20px;
              position: absolute;
              background-color: #fff;
            }
            span {
              color: #666666;
            }
            .el-icon-caret-bottom,
            .el-icon-caret-top {
              position: absolute;
              right: 0px;
              top: 2px;
              font-size: 14px;
              color: #666666;
            }
          }
          .text {
            -webkit-line-clamp: 999;
            &::after {
              content: "";
              width: 0;
              height: 0;
              position: absolute;
              background-color: #fff;
            }
          }
        }
      }
    }
    .playList-content {
      width: 100%;
      margin-top: 40px;
      margin-bottom: 10px;
      height: 100%;
      .is-active {
        font-weight: bold;
        color: #333;
        font-size: 18px;
      }

      .el-tabs__active-bar {
        background-color: rgb(236, 65, 65);
        height: 3px;
        border-radius: 10px;
      }
      .el-tabs__nav-wrap::after {
        background-color: #fff;
      }
      .el-tabs__item:hover {
        color: rgb(0, 0, 0);
      }
      .el-tabs__content {
        .el-tab-pane {
          .el-table {
            font-size: 13px;
            .cell {
              font-weight: normal;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              i {
                color: #909399;
                cursor: pointer;
              }
              .icon-xiazai1 {
                padding-left: 5px;
              }
              .icon-24gl-volumeZero {
                color: rgb(236, 65, 65);
                margin-left: 8px;
              }
              span {
                color: #909399;
                margin-left: 5px;
              }
            }
          }
        }
      }

      .el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border: none;
      }
      .el-table .el-table__cell {
        padding: 5px 0;
        cursor: pointer;
      }
      .el-tabs__content .el-tab-pane .el-table .cell .musicName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
        color: #333;
        &.active {
          color: rgb(236, 65, 65);
        }
      }
      .el-tabs__content .el-tab-pane .el-table .cell p {
        font-size: 13px;
        transform: scale(0.7);
        height: 20px;
        line-height: 20px;
        width: 30px;
        float: left;
        margin: 2px 0 0 10px;
        border: 1px solid rgb(236, 65, 65);
        border-radius: 5px;
        color: rgb(236, 65, 65);
        box-sizing: border-box;
      }
      .el-table td.el-table__cell .cell div {
        color: #909399;
      }
      .el-table_1_column_1 > .cell {
        text-align: right !important;
      }
      .comment-wrapper {
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

      .collectors {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 30%;
          margin: 20px 0;
          text-align: left;
          .el-avatar {
            width: 80px;
            height: 80px;
            float: left;
          }
          .name {
            line-height: 82px;
            margin-left: 20px;
          }
          .el-icon-female {
            color: rgb(255, 160, 176);
            font-size: 16px;
            background-color: rgb(248, 228, 231);
            padding: 3px;
            border-radius: 50%;
            margin-left: 10px;
          }
          .el-icon-male {
            color: rgb(91, 187, 209);
            font-size: 16px;
            background-color: rgb(191, 243, 255);
            padding: 3px;
            border-radius: 50%;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
