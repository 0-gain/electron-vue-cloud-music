<template>
  <div>
    <!-- 种类的菜单 -->
    <div class="musicList-navBar clearfix">
      <div class="total" @click="isShowCatList = !isShowCatList" v-if="title">
        <span>{{ cat == "全部" ? title : cat }}</span>
        <i class="el-icon-arrow-right"></i>
      </div>

      <slot name="headLine"></slot>

      <ul class="hotList">
        <li
          @click="hotTagList(item.name, item.id)"
          v-for="(item, index) in hotList"
          :key="index"
        >
          <span :class="{ currentTag: item.name == cat}">{{
            item.name
          }}</span>
        </li>
      </ul>
    </div>

    <!-- 显示和隐藏全部歌单分类 -->
    <div class="catList" v-show="isShowCatList">
      <div class="title">
        <span
          :class="{ currentTag: cat == '全部' }"
          @click="hotTagList('全部')"
          >{{ title }}</span
        >
      </div>

      <div v-if="icon.length">
        <div class="categories" v-for="(v, i) in catList" :key="i">
          <span><i class="iconfont" :class="icon[i]"></i>{{ v.name }}</span>

          <div class="lists">
            <div
              class="item"
              :class="{ currentTag: li.name == cat }"
              v-for="(li, index) in v.list"
              :key="index"
              @click="hotTagList(li.name)"
            >
              {{ li.name }}
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="cateList-content">
          <div
            class="item"
            v-for="(c, index) in catList"
            :key="index"
            @click="hotTagList(c.name, c.id)"
            :class="{ currentTag: c.name == cat }"
          >
            {{ c.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryNav",
  data() {
    return {
      isShowCatList: false, //显示和隐藏全部歌单种类
    };
  },
  props: {
    // 热门标签分类列表
    hotList: {
      type: Array,
      default() {
        return [];
      },
    },

    // 全部的分类列表
    catList: {
      type: Array,
      default() {
        return [];
      },
    },

    // 当前所点击的分类
    cat: {
      type: String,
      default() {
        return "";
      },
    },

    // 分类名
    title: {
      type: String,
      default() {
        return "";
      },
    },

    // 全部分类列表的icon
    icon: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 获取当前点击的分类内容
    hotTagList(tag, id) {
      // id给视频分类用
      this.isShowCatList = false;
      this.$emit("changeCatList", { tag, id });
    },
  },
};
</script>

<style lang="less" scoped>
.musicList-navBar {
  margin-top: 20px;
  .total {
    position: relative;
    float: left;
    width: 100px;
    height: 30px;
    text-align: center;
    border: 1px solid rgb(202, 199, 199);
    border-radius: 50px;
    line-height: 25px;
    font-size: 14px;
    cursor: pointer;
    span {
      vertical-align: middle;
      line-height: 30px;
    }
    i {
      font-size: 18px;
      vertical-align: middle;
    }
    &:hover {
      background-color: rgb(248, 246, 246);
    }
  }
  .hotList {
    float: right;
    li {
      float: left;
      font-size: 12px;
      margin-left: 10px;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
      span {
        padding: 4px 10px;
        &.currentTag {
          border-radius: 50px;
          color: rgb(236, 65, 65);
          background-color: rgb(254, 243, 244);
        }
      }
    }
  }
}
.catList {
  position: absolute;
  left: 0;
  width: 720px;
  height: 500px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid rgb(240, 239, 239);
  box-shadow: 0 0 10px rgb(240, 239, 239);
  z-index: 9;
  background-color: #fff;
  overflow-y: scroll;

  .title {
    height: 60px;
    border-bottom: 1px solid rgb(224, 222, 222);
    box-sizing: border-box;
    span {
      float: left;
      margin: 18px 0 0 30px;
      font-size: 14px;
      padding: 5px 12px;
      border-radius: 50px;
      cursor: pointer;
    }
  }
  .categories {
    width: 100%;
    padding-top: 10px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    span {
      position: relative;
      flex: 0 0 15%;
      font-size: 13px;
      color: rgb(192, 185, 185);
      i {
        position: absolute;
        left: 0;
        font-size: 28px;
        color: rgb(160, 156, 156);
      }
    }
    .lists {
      display: flex;
      flex-wrap: wrap;
      width: 75%;
      .item {
        width: 90px;
        height: 40px;
        text-align: left;
        font-size: 13px;
        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
  }
  .cateList-content {
    display: flex;
    flex-wrap: wrap;
    width: 85%;
    margin: 0 auto;
    text-align: center;
    .item {
      width: 100px;
      line-height: 50px;
      font-size: 13px;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .currentTag {
    color: rgb(236, 65, 65);
  }
}
</style>
