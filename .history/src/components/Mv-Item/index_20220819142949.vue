<template>
  <div class="mv-wrapper">
    <div class="title clearfix">
      <slot name="title"></slot>
      <!-- <ul class="tags" v-if="isShowTags">
        <li
          :class="{ currentTag: type === a.name }"
          v-for="(a, index) in mvSort"
          :key="index"
          @click="clickTags(a.name)"
        >
          {{ a.name }}
        </li>
      </ul> -->
    </div>

    <div class="mv-content">
      <div
        class="mv-item col-lg col-md"
        v-for="(n, index) in mvData"
        :key="index"
        :class="{ 'hidden-md-only': index >= hidden }"
      >
        <div class="cover" @click="goRoute(n)">
          <img
            v-lazy="n.cover || n.picUrl || n.coverUrl"
            alt=""
            :key="n.cover"
          />
          <span class="playCount">
            <i class="iconfont icon-24gl-play"></i>
            <span>{{ (n.playCount || n.playTime) | numberFormat }}</span>
          </span>
          <span class="durationms">
            {{ n.durationms | moment("mm:ss") }}
          </span>
        </div>
        <div class="other">
          <div class="name">
            <p class="tag" v-show="n.creator && n.type != 1">MV</p>
            {{ n.name || n.title }}
          </div>
          <ul class="artistName clearfix" v-if="isShowArtistName">
            <li
              v-for="(v, index) in n.artists ? n.artists : n.creator"
              :key="index"
            >
              <span style="color: #c0c4cc" v-if="n.creator && n.type == 1"
                >by {{ v.userName }}</span
              >
              <span v-else>{{ v.name || v.userName }}</span>
              <span class="line">/</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvItem",
  data() {
    return {
      type: "",
    };
  },
  props: {
    // mv的数据
    mvData: {
      type: Array,
      default() {
        return [];
      },
    },
    // mv分类
    mvSort: {
      type: Array,
      default() {
        return [];
      },
    },
    // 标题
    title: {
      type: String,
      default() {
        return "";
      },
    },
    // 是否显示分类
    isShowTags: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 是否显示艺术家名字
    isShowArtistName: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 动态决定哪几个隐藏
    hidden: {
      type: Number,
      default() {
        return;
      },
    },
  },
  methods: {
    // 点击种类的自定义事件
    clickTags(area) {
      this.type = area;
      this.$emit("changeSort", area);
    },

    // 点击跳转到mv详情页
    goRoute(n) {
      this.$emit("changeRoute", n);
    },
  },
};
</script>

<style lang="less" scoped>
.mv-wrapper {
  width: 100%;
}
.title {
  margin: 10px 0 20px 0;
  h4 {
    float: left;
  }
  .tags {
    float: right;
    li {
      float: left;
      font-size: 12px;
      margin-left: 20px;
    }
  }
}
.mv-content {
  width: 100%;
  overflow: hidden;
  margin: 0 -10px;
  .mv-item {
    display: inline-block;
    vertical-align: top;
    padding: 0 10px;
    margin-bottom: 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
.cover {
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  border-radius: 5px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  .playCount {
    position: absolute;
    right: 5px;
    top: 5px;
    color: #fff;
    font-size: 12px;
    i {
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .durationms {
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #fff;
    font-size: 12px;
  }
}
.other {
  text-align: left;
  height: 50px;
  .name {
    margin: 5px 0;
    font-size: 14px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .tag{
    display: inline-block;
    margin: 0;
    border: 1px solid rgb(236, 65, 65);
    color: rgb(236, 65, 65);
    padding: 0 2px;
    font-size: 14px;
    border-radius: 3px;
  }
  .artistName {
    margin-top: 5px;
    font-size: 12px;
    color: #555555;
    li {
      float: left;
      span {
        margin-right: 5px;
      }
      &:last-child {
        .line {
          display: none;
        }
      }
    }
  }
}
</style>
