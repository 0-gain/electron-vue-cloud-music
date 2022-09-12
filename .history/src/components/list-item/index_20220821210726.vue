<template>
  <div class="list-content">
    <div
      class="list-item"
      v-for="(item, index) in listData"
      :key="index"
      @click="goRoute(item)"
      v-loading="!listData.length"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <div
        class="cover"
        @mouseenter="currentIndex = index"
        @mouseleave="currentIndex = -1"
      >
        <img
          v-lazy="
            item.picUrl || item.coverImgUrl || item.imgurl || item.coverUrl || item.cover
          "
          alt=""
          :key="item.id"
        />

        <i class="iconfont icon-bofang" v-show="isShowIcon && !hiddenIcon"></i>

        <i class="iconfont icon-huangguan" v-show="item.highQuality"></i>

        <span class="icon" v-show="isShowCounts && !hiddenIcon">
          <i class="iconfont icon-24gl-play"></i>
          <span>{{
            (item.playCount ? item.playCount : item.playTime) | numberFormat
          }}</span>
        </span>

        <transition name="fade">
          <i
            class="iconfont icon-bofangqi-bofang"
            v-show="isShowBoFang && currentIndex == index && !hiddenIcon"
          ></i>
        </transition>
      </div>
      <p class="des" v-show="item.name">{{ item.name }}</p>

      <p class="title" v-show="item.title">{{ item.title }}</p>
      <p class="creator" v-if="item.creator">by {{ item.creator.nickname }}</p>
      <p v-if="item.artists" class="artistsName">{{ item.artists[0].name }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {
      // 当前鼠标悬浮的歌单id
      currentIndex: -1,
    };
  },
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否显示播放icon
    isShowIcon: {
      type: Boolean,
      default() {
        return true;
      },
    },

    // 是否显示播放次数
    isShowCounts: {
      type: Boolean,
      default() {
        return true;
      },
    },

    // 是否显示bofang
    isShowBoFang: {
      type: Boolean,
      default() {
        return true;
      },
    },

    // 是否全不显示icon
    hiddenIcon: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    // 与父组件通信
    goRoute(item) {
      const { id, vid } = item;
      this.$emit("changeRoute", { id, vid });
    },
  },
};
</script>

<style lang="less" scoped>
.list-content {
  background-color: red;
  margin: 0 -10px;
  .list-item {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    width: 372px;
    margin-bottom: 15px;
    cursor: pointer;
    box-sizing: border-box;
    .cover {
      position: relative;
      width: 100%;
      aspect-ratio: 2.8/1;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .icon-bofang {
        position: absolute;
        left: 5px;
        top: 5px;
        color: #d1d1d1;
        font-size: 25px;
      }
      .icon-bofangqi-bofang {
        position: absolute;
        right: 10px;
        bottom: 15px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        color: rgb(236, 65, 65);
        font-size: 30px;
      }
      .icon {
        position: absolute;
        right: 8px;
        top: 5px;
        color: #fff;
        font-size: 12px;
        .icon-24gl-play {
          font-size: 12px;
          margin-right: 5px;
        }
      }
      .icon-huangguan {
        position: absolute;
        left: 0;
        background-color: rgb(243, 176, 104);
        color: #fff;
        padding: 12px 27px 2px 20px;
        font-size: 15px;
        transform: rotate(-40deg) translateX(-9px) translateY(-18px);
        z-index: 1;
      }
    }
    p {
      width: 100%;
      font-size: 14px;
      text-align: left;
      margin-top: 5px;
      margin-bottom: 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .title {
      font-size: 12px;
    }
    .creator {
      font-size: 12px;
      color: #909399;
    }
    .artistsName {
      font-size: 12px;
    }
  }

  // 过渡
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
