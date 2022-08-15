<template>
  <div class="topMv">
    <div class="title clearfix">
      <slot name="title"></slot>

      <ul class="tags">
        <li
          :class="{ currentTag: type == a.name }"
          v-for="(a, index) in areaSort"
          :key="index"
          @click="clickTags(a.name)"
        >
          {{ a.name }}
        </li>
      </ul>
    </div>

    <div class="topMv-content">
      <div
        class="topMv-item"
        v-for="(t, index) in topMvData"
        :key="index"
        @click="changeRoute(t.id)"
      >
        <div class="index">
          {{ handleIndex(index) }}
          <i
            class="iconfont icon-down"
            v-if="t.lastRank == -1 || t.lastRank < index + 1"
          ></i>
          <i class="iconfont icon-up" v-if="t.lastRank > index + 1"></i>
          <i v-if="t.lastRank == index + 1">—</i>
        </div>
        <div class="cover">
          <img :src="t.cover" alt="" />
        </div>
        <div class="otherInfo">
          <p class="name">{{ t.name }}</p>
          <div class="artistName">
            <span class="item" v-for="(a, index) in t.artists" :key="index">
              <span>{{ a.name }}</span>
              <span class="line">/</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvRankItem",
  data() {
    return {
      type: "内地",
    };
  },
  props: {
    areaSort: {
      type: Array,
      default() {
        return [];
      },
    },
    topMvData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 处理index
    handleIndex(index) {
      index += 1;
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },
    clickTags(name) {
      this.type = name;
      console.log(name);
      this.$emit("changeSort", name);
    },
    changeRoute(id){
      this.$emit('changeRoute',id)
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  .tags {
    float: right;
    li {
      float: left;
      font-size: 12px;
      margin-left: 20px;
      padding: 2px 9px;
      border-radius: 50px;
      color: #909399;
      cursor: pointer;
      &:not(.currentTag):hover {
        color: #333;
      }
    }
    .currentTag {
      background-color: #fef3f4;
      color: rgb(236, 65, 65);
    }
  }
}
.topMv-content {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .topMv-item {
    width: 50%;
    display: flex;
    margin-bottom: 40px;
    .index {
      position: relative;
      font-size: 25px;
      line-height: 90px;
      color: #909399;
      i {
        top: 20px;
        right: 5px;
        font-size: 12px;
        position: absolute;
      }
      .icon-down {
        color: rgb(64, 46, 209);
      }
      .icon-up {
        color: rgb(236, 65, 65);
      }
    }
    .cover {
      width: 180px;
      aspect-ratio: 2/1;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .otherInfo {
      flex: 1;
      font-size: 13px;
      .name,.artistName{
        width: 60%;
        min-width: 140px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .artistName {
        font-size: 12px;
        color: #555555;
        .item {
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
  }
}
</style>
