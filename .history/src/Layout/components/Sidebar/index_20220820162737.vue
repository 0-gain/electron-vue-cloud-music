<template>
  <div class="sideBar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      

      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { myMusicMap } from "@/router/modules/myMusic";
import { playListMap } from "@/router/modules/playList";
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
      }
      .el-submenu {
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
      .is-active {
        background-color: rgba(173, 175, 175, 0.1);
        color: #333;
      }
    }
  }
}
</style>
