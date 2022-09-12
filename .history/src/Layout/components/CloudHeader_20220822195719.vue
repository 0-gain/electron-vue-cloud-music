<template>
  <div id="header">
    <div class="logo">
      <img :src="logo" alt="" />
    </div>
    <div class="search_wrapper">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      <i class="el-icon-arrow-right" @click="$router.back(1)"></i>

      <div class="search" @click="clickSearch">
        <i class="iconfont searchIcon">&#xe6e1;</i>
        <el-input v-model="searchWord" :placeholder="defaultKeyword"></el-input>
      </div>

      <!-- 隐藏层 -->
      <div class="searchHot" v-show="isShowSearchHot">
        <div class="title">热搜榜</div>
        <div
          class="search-item"
          v-for="(s, index) in searchHotData"
          :key="index"
          @click="search(s.searchWord)"
        >
          <div class="index" :class="{ topThree: index <= 2 }">
            {{ index + 1 }}
          </div>
          <div class="content">
            <div class="name" :class="{ topBold: index <= 2 }">
              <span>{{ s.searchWord }}</span>
              <span class="count">{{ s.score }}</span>
              <img :src="s.iconUrl" alt="" v-if="s.iconUrl" />
            </div>
            <div class="other">
              <span>{{ s.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div
      class="mask"
      v-if="isShowSearchHot"
      @click="isShowSearchHot = false"
    ></div>

    <ul class="login">
      <li @click="checkLoginStatus">
        <div class="user" v-if="!uid">
          <i class="iconfont">&#xe682;</i>
          <span>未登录 <i class="iconfont">&#xe688;</i></span>
        </div>
        <div class="userInfo" v-else>
          <img
            @click="$router.push({ path: '/person', query: { id: uid } })"
            :src="profileInfo.avatarUrl"
            alt=""
          />
          <span
            >{{ profileInfo.nickname }} <i class="iconfont">&#xe688;</i></span
          >
        </div>
      </li>
      <li><i class="iconfont">&#xe656;</i></li>
      <li><i class="iconfont">&#xe642;</i></li>
      <li>
        <i class="iconfont">&#xe675;</i>
      </li>
      <li><span class="line">|</span></li>
      <li><i class="iconfont">&#xe618;</i></li>
      <li>
        <i class="iconfont" @click="minimizeWin">&#xe650;</i>
      </li>
      <li>
        <i class="iconfont" @click="maximizeWin">&#xea6b;</i>
      </li>
      <li><i class="iconfont" @click="closeWin">&#xe611;</i></li>
      <!-- <li><i class="el-icon-full-screen" @click="closeWin"></i></li> -->
    </ul>

    <div class="qrcode" ref="qrcode" v-show="isShowQrCode">
      <div class="qrcode-content">
        <h2>扫码登录</h2>
        <img :src="qrImg" alt="" />
        <p>使用网易云音乐APP扫码登录</p>
      </div>

      <p>选择其他登录模式 ></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CloudTitle",
  data() {
    return {
      logo: require("@/assets/images/logo.png"),
      // 搜索关键词
      searchWord: "",
      // 默认搜索关键词
      defaultKeyword: "搜索",
      qrImg: null, //二维码图片
      isShowQrCode: false, //是否二维码
      profileInfo: {}, //用户信息
      uid: null, //用户id
      // 搜索榜数据
      searchHotData: [],
      // 是否显示热搜榜
      isShowSearchHot: false,
    };
  },
  mounted() {
    this.loginStatus(localStorage.getItem("cookie"));
    this.getSearch_default();
  },
  methods: {
    minimizeWin() {
      window.ipcRenderer.send("window-min");
    },
    maximizeWin() {
      window.ipcRenderer.send("window-max");
    },
    closeWin() {
      window.ipcRenderer.send("window-close");
    },

    // 检查登录状态
    checkLoginStatus() {
      // 检查当前的cookie是否有数据
      const cookie = localStorage.getItem("cookie");
      if (cookie) {
        return;
      } else {
        this.toLogin();
      }
    },

    // 登录
    async toLogin() {
      let timer;
      // const cookie = localStorage.getItem("cookie");
      // this.loginStatus(cookie);

      // 生成key
      const res = await this.$API.user.reqQr_key();
      if (res.code === 200) {
        let key = res.data.unikey;

        // 生成二维码
        const res2 = await this.$API.user.reqQr_create(key);
        if (res2.code === 200) {
          this.qrImg = res2.data.qrimg;
          this.isShowQrCode = true;
          // 确认二维码状态
          timer = setInterval(async () => {
            const statusRes = await this.checkStatus(key);
            if (statusRes.code === 800) {
              this.$message({
                message: "二维码已过期，请重新获取",
                type: "warning",
                offset: 100,
              });
              clearInterval(timer);
            }
            if (statusRes.code === 803) {
              clearInterval(timer);
              this.$message({
                message: "授权登录成功",
                type: "success",
                offset: 100,
              });
              this.isShowQrCode = false;
              await this.loginStatus(statusRes.cookie);
              // 存储cookie
              localStorage.setItem("cookie", statusRes.cookie);
            }
          }, 3000);
        }
      }
    },

    // 获取扫码状态
    async checkStatus(key) {
      const res = await this.$API.user.reqQr_checkStatus(key);
      return res;
    },

    // 获取登录状态
    async loginStatus(cookie = "") {
      if (!cookie) {
        return;
      }
      const res = await this.$API.user.loginStatus(cookie);
      if (res.data.code === 200) {
        this.profileInfo = res.data.profile;
        this.uid = res.data.account.id;

        // 存储用户的uid
        this.$store.commit("user/USER_ID", this.uid);
        // 获取用户的所有信息
        this.$store.dispatch("user/getUserAllData", this.uid);
      }
    },

    // 获取搜索排行榜
    async getSearchHot() {
      const result = await this.$API.search.reqSearchHot();
      if (result.code === 200) {
        this.searchHotData = result.data;
      }
    },

    // 默认搜索关键词
    async getSearch_default() {
      const result = await this.$API.search.reqSearch_default();
      if (result.code === 200) {
        this.defaultKeyword = result.data.showKeyword;
      }
    },

    // 点击搜索
    clickSearch() {
      this.isShowSearchHot = true;
      this.getSearchHot();
    },

    // 点击搜索
    search(keywords) {
      this.isShowSearchHot = false;
      this.$router.push({ path: "/search/song", query: { keywords } });
    },
  },
};
</script>

<style lang="less" scoped>
#header {
  position: fixed;
  // position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(236, 65, 65);
  /* 设置可拖拽 */
  -webkit-app-region: drag;
  color: rgb(233, 225, 225);
  z-index: 9999;
  &.active {
    background-color: rgb(192, 168, 180) !important;
    color: #585859;
  }
  .logo {
    float: left;
    height: 100%;
    img {
      transform: scale(0.5) translateX(-110px) translateY(-5px);
    }
  }
  .search_wrapper {
    position: relative;
    float: left;
    i {
      padding: 5px;
      font-size: 14px;
      background-color: rgba(100, 150, 150, 0.1);
      border-radius: 50%;
      margin-left: 10px;
      -webkit-app-region: no-drag;
    }
    .search {
      position: relative;
      display: inline-block;
      margin-left: 10px;
      width: 150px;
      line-height: 60px;
      /deep/input {
        border: none;
        height: 30px;
        border-radius: 50px;
        background-color: rgba(100, 150, 150, 0.1);
        outline: none;
        text-indent: 20px;
        -webkit-app-region: no-drag;
        color: #fff;
      }
      .searchIcon {
        position: absolute;
        padding: 0;
        font-size: 18px;
        background-color: transparent;
      }
    }
    .searchHot {
      position: absolute;
      margin-top: 10px;
      width: 350px;
      height: calc(75vh);
      background-color: #fff;
      text-align: left;
      box-sizing: border-box;
      overflow-y: scroll;
      box-shadow: 0px 0px 5px 0px #dddddd;
      z-index: 10;
      cursor: pointer;
      .title {
        margin: 10px 0 10px 20px;
        color: #909399;
      }
      .search-item {
        display: flex;
        height: 40px;
        padding: 10px 20px;
        .index {
          width: 30px;
          line-height: 50px;
          color: #c0c4cc;
        }
        .content {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          height: 100%;
          font-size: 12px;
          .name {
            width: 100%;
            font-size: 13px;
            color: #333;
            .count {
              color: #c0c4cc;
              font-size: 12px;
              margin-left: 5px;
              vertical-align: top;
              font-weight: normal;
            }
            img {
              width: 20px;
              height: 10px;
              margin-left: 5px;
              vertical-align: top;
            }
          }
          .topBold {
            font-weight: bold;
          }
          .other {
            color: #909399;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        &:hover {
          background-color: rgba(95, 95, 95, 0.1);
        }
      }
      .topThree {
        color: rgb(236, 65, 65) !important;
      }
    }
  }

  .login {
    margin: 0 0;
    line-height: 60px;
    padding: 0;
    float: right;
    -webkit-app-region: no-drag;
    li {
      float: left;
      list-style: none;
      margin-right: 23px;
      height: 100%;

      box-sizing: border-box;
      cursor: pointer;
      i {
        font-size: 18px;
      }
      .user {
        width: 100%;
        height: 100%;
        i {
          font-size: 30px;
        }

        span {
          float: right;
          margin-left: 5px;
          font-size: 12px;
          i {
            font-size: 10px;
            margin-left: 5px;
          }
        }
      }
      .userInfo {
        width: 100%;
        height: 100%;
        img {
          margin-top: 12px;
          margin-right: 5px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        span {
          width: 80px;
          float: right;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          i {
            font-size: 10px;
            margin-left: 5px;
          }
        }
      }
    }
    li:hover {
      color: #fff;
    }
    .Info {
      margin-left: -20px;
      font-size: 12px;
      i {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }

  .qrcode {
    position: absolute;
    right: 320px;
    top: 50px;
    width: 320px;
    height: 500px;
    color: #333;
    box-shadow: 0 0 5px rgb(161, 159, 159);
    background-color: #fff;
    .qrcode-content {
      width: 100%;
      margin-top: 80px;
      h2 {
        font-weight: normal;
      }
    }
    & > p {
      width: 100%;
      margin-top: 80px;
      font-size: 14px;
      color: gray;
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    margin: 0;
    background-color: transparent;
    z-index: 9;
  }
}
</style>
