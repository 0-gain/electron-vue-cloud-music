<template>
  <div class="sideBar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="0"
        class="el-menu-vertical"
        :default-openeds="openeds"
      >
        <el-menu-item
          :index="id.toString()"
          v-for="(route, id) in routes"
          :key="route.path"
          @click="show(route)"
        >
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
        <!-- 我的音乐 -->
        <el-menu-item-group index="2">
          <template slot="title">我的音乐</template>
          <el-menu-item
            :index="('2' + index).toString()"
            v-for="(route, index) in myMusicMap"
            :key="route.path"
            @click="show(route)"
          >
            <i class="iconfont" :class="route.meta.icon"></i>
            <span>{{ route.meta.title }}</span>
          </el-menu-item>
        </el-menu-item-group>

        <!-- 创建的歌单 -->

        <el-submenu index="3">
          <template slot="title">
            <span>创建的歌单</span>
            <i class="iconfont icon-zengjia"></i>
          </template>
          <el-menu-item
            :index="('3' + index).toString()"
            v-for="(list, index) in createList"
            :key="index"
          >
            <span class="like" v-if="index === 0">
              <i class="iconfont icon-aixin2"></i>
              <span>我喜欢的音乐</span>
              <i class="iconfont icon-xindiantu"></i>
            </span>

            <span class="other" v-else>
              <i class="iconfont icon-yinleliebiao"></i>
              <span>{{ list.name }}</span>
            </span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { myMusicMap } from "@/router/modules/myMusic";
import { playListMap } from "@/router/modules/playList";
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {
      myMusicMap,
      playListMap,
      openeds: ["3"],
    };
  },
  computed: {
    routes() {
      let arr = this.$router.options.routes[0].children.slice(0, 7);
      let newArr = [];
      arr.forEach((element) => {
        if (!element.meta.icon) {
          newArr.push(element);
        }
      });
      return newArr;
    },
    //获取用户的歌单
    ...mapState({
      createList(state) {
        return state.user.createList;
      },
      collectionList(state) {
        return state.user.collectionList;
      },
    }),
  },
  methods: {
    show(route) {
      const path = route.path;
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="less">
.sideBar {
  position: fixed;
  left: 0;
  top: 60px;
  height: 100%;
  border-right: 1px solid #e5e5e6;
  box-sizing: border-box;
  width: 200px;
  overflow: hidden;
  .el-scrollbar {
    width: 200px;
    height: 100%;
    color: #333;
    text-align: left;
    .el-menu {
      padding-top: 10px;
      .el-menu-item {
        padding-left: 10px !important;
        margin: 3px 0 2px 10px;
        height: 35px;
        line-height: 35px;
        text-align: left;
        &:hover {
          background-color: rgba(173, 175, 175, 0.1);
        }
        i {
          font-size: 13px;
          margin-right: 5px;
          color: #333;
        }
        .icon-yinleliebiao {
          font-size: 50px;
        }
      }
      .is-active {
        background-color: rgba(173, 175, 175, 0.1);
        color: #333;
      }
      .el-submenu {
        background-color: transparent;
        .el-submenu__title {
          position: relative;
          height: 30px;
          line-height: 30px;
          span {
            font-size: 12px;
            color: #909399;
          }
          .el-submenu__icon-arrow {
            position: absolute;
            right: 100px;
          }
          .icon-zengjia {
            float: right;
            color: #333;
          }
          &:hover {
            background-color: transparent;
          }
        }
        .el-menu {
          padding-top: 0;
          .el-menu-item {
            i {
              font-size: 16px;
            }
            .icon-heart-line {
              float: left;
            }
            .icon-xindiantu {
              padding: 1px 10px;
              margin-left: 20px;
              border-radius: 50px;
              border: 1px solid #d5d5d6;
            }
          }
        }
      }
    }
  }
}
</style>
