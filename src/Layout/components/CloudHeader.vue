<template>
  <div id="header">
    <div class="logo">
      <img :src="logo" alt="" />
    </div>
    <div class="search_wrapper">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      <i class="el-icon-arrow-right" @click="$router.back(1)"></i>

      <div class="search">
        <i class="iconfont searchIcon">&#xe6e1;</i>
        <el-input v-model="searchWord"></el-input>
      </div>
      <i class="iconfont">&#xe971;</i>
    </div>
    <ul class="login">
      <li @click="toLogin">
        <div class="user" v-if="!profileInfo.avatarUrl">
          <i class="iconfont">&#xe682;</i>
          <span>未登录 <i class="iconfont">&#xe688;</i></span>
        </div>
        <div class="userInfo" v-else>
          <img :src="profileInfo.avatarUrl" alt="" />
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
// const { ipcRenderer } = require("electron");
export default {
  name: "CloudTitle",
  data() {
    return {
      logo: require("@/assets/images/logo.png"),
      searchWord: "",
      qrImg: null, //二维码图片
      isShowQrCode: false, //是否二维码
      profileInfo: {}, //用户信息
      uid: null, //用户id
    };
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

    // 登录
    async toLogin() {
      let timer;
      const cookie = localStorage.getItem("cookie");
      this.loginStatus(cookie);

      // 生成key
      const res = await this.$API.user.reqQr_key();
      /* if (res.code === 200) {
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
              alert("二维码已过期，请重新获取");
              clearInterval(timer);
            }
            if (statusRes.code === 803) {
              clearInterval(timer);
              alert("授权登录成功");
              this.isShowQrCode = false;
              await this.loginStatus(statusRes.cookie);
              // 存储cookie
              localStorage.setItem("cookie", statusRes.cookie);

              // 获取用户详情
              // this.getUser_detail(this.uid)
              
            }
          }, 3000);
        }
      } */
    },

    // 查看扫码状态
    async checkStatus(key) {
      const res = await this.$API.user.reqQr_checkStatus(key);
      return res;
    },

    // 查看登录状态
    async loginStatus(cookie = "") {
      const res = await this.$API.user.loginStatus(cookie);
      if (res.data.code === 200) {
        this.profileInfo = res.data.profile;
        this.uid = res.data.account.id;
        this.getUser_detail(this.uid);
        this.getSubcount(this.uid);
        this.getAcoount(this.uid);
      }
    },

    // 查看用户详情
    async getUser_detail(uid) {
      const res = await this.$API.user.reqUser_detail(uid);
      console.log(res, "]");
    },

    // 获取用户信息，歌单....的数量
    async getSubcount(uid) {
      const res = await this.$API.user.reqSubcount(uid);
      console.log(res, ".");
    },

    // 获取用户账户信息
    async getAcoount(uid) {
      const res = await this.$API.user.reqAccount(uid);
      console.log(res, "-");
    },
  },
};
</script>

<style lang="less">
#header {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: rgb(236, 65, 65);
  /* 设置可拖拽 */
  -webkit-app-region: drag;
  color: rgb(233, 225, 225);
  z-index: 9999;
  .logo {
    img {
      transform: scale(0.5) translateX(-110px) translateY(-5px);
    }
  }
  .search_wrapper {
    line-height: 60px;
    transform: translateX(-80px);
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
      input {
        border: none;
        height: 30px;
        border-radius: 50px;
        background-color: rgba(100, 150, 150, 0.1);
        outline: none;
        text-indent: 20px;
        -webkit-app-region: no-drag;
      }
      .searchIcon {
        position: absolute;
        padding: 0;
        font-size: 18px;
        background-color: transparent;
      }
    }
  }
  .login {
    margin: 0 0;
    line-height: 60px;
    padding: 0;
    float: left;
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
}
</style>
