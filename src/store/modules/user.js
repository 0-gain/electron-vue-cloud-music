import {
  reqSubcount,
  reqUser_playlist,
  loginStatus,
  logoOut,
  reqQr_create,
  reqQr_checkStatus,
  reqQr_key,
  reqLikeList,
} from "@/api/user";

import { Message } from "element-ui";
const state = {
  // 用户ID
  uid: "",
  // 用户个人信息
  profile: {},

  // 用户信息，歌单....的数量
  userCounts: {},
  // 用户喜欢的列表
  userLikeList: [],
  // 用户收藏歌单
  collectionList: [],
  // 用户创建歌单
  createList: [],
  // 用户登录二维码
  qrimg: "",
  // 用户的cookie
  cookie: localStorage.getItem("COOKIE"),
  // 是否显示二维码
  isShowQrCode: false,
};
const mutations = {
  // 用户详情信息
  USER_ALL_DATA(state, data) {
    state.userCounts = data[0];
    state.userLikeList = data[2].ids;
    let playlist = data[1].playlist;
    let createList = [];
    let collectionList = [];
    playlist.forEach((element) => {
      if (element.userId === state.uid) {
        createList.push(element);
      } else {
        collectionList.push(element);
      }
    });
    state.createList = createList;
    state.collectionList = collectionList;
  },

  // 用户id
  USER_ID(state, uid) {
    state.uid = uid;
  },

  // 用户个人信息
  USER_PROFILE(state, profile) {
    state.profile = profile;
  },

  // 存储二维码
  USER_LOGIN_AR(state, qrimg) {
    console.log(qrimg);
    state.qrimg = qrimg;
  },

  // 存储cookie
  USER_LOGIN_COOKIE(state, cookie) {
    state.cookie = cookie;
  },

  // 更新二维码状态
  UPDATE_QR_CORE(state, isShowQrCode) {
    state.isShowQrCode = isShowQrCode;
  },

  // 重置
  REST_DATA(state) {
    state.uid = "";
    state.profile = {};
    state.userCounts = {};
    state.userLikeList = [];
    state.collectionList = [];
    state.createList = [];
    state.qrimg = "";
    state.cookie = "";
    localStorage.removeItem("COOKIE");
  },
};
const actions = {
  // 获取用户所有的数据
  async getUserAllData({ commit }, uid) {
    // 获取用户信息，歌单....的数量
    const getUser_count = await reqSubcount(uid);
    // 获取用户歌单
    const getUser_playlist = await reqUser_playlist(uid);

    // 获取用户喜欢的音乐列表
    const getLikeList = await reqLikeList(uid);
    Promise.all([getUser_count, getUser_playlist, getLikeList]).then(
      (values) => {
        commit("USER_ALL_DATA", values);
      }
    );
  },

  // 获取登录状态
  async loginStatus({ commit, dispatch }, cookie) {
    if (!cookie) return;

    const res = await loginStatus(cookie);
    if (res.data.code === 200) {
      const { profile } = res.data;
      const { id } = res.data.account;
      // 存储用户的uid
      commit("USER_ID", id);
      // 存储用户的信息
      commit("USER_PROFILE", profile);

      // 获取用户数据
      dispatch("getUserAllData", id);
    }
  },

  // 退出登录
  async logoOut({ commit }) {
    const res = await logoOut();
    if (res.code === 200) {
      commit("REST_DATA");
      Message({
        message: "退出登录成功",
        type: "success",
        offset: 100,
      });
    }
  },
  // 生成二维码
  async getQr_create({ commit, dispatch, state }) {
    // 二维码生成key
    const res = await reqQr_key();
    if (res.code === 200) {
      const { unikey } = res.data;

      // 生成二维码
      let res2 = await reqQr_create(unikey);
      if (res2.code === 200) {
        const { qrimg } = res2.data;
        // 存储二维码
        commit("USER_LOGIN_AR", qrimg);
        // 更新显示二维码状态
        commit("UPDATE_QR_CORE", true);
        // 设置定时器
        let timer;

        timer = setInterval(async () => {
          // 检测扫码状态
          const res3 = await reqQr_checkStatus(unikey);
          if (res3.code === 800) {
            clearInterval(timer);
            // 更新显示二维码状态
            commit("UPDATE_QR_CORE", false);
            Message({
              message: "二维码已过期，请重新获取",
              type: "warning",
              offset: 100,
            });
          }

          if (res3.code === 803) {
            clearInterval(timer);
            // 更新显示二维码状态
            commit("UPDATE_QR_CORE", false);
            Message({
              message: "授权登录成功",
              type: "success",
              offset: 100,
            });

            // 存储cookie
            const { cookie } = res3;
            localStorage.setItem("COOKIE", cookie);
            commit("USER_LOGIN_COOKIE", cookie);

            // 获取登录状态
            dispatch("loginStatus", cookie);
          }

          // 如果点击了隐藏二维码则停掉定时器
          if (!state.isShowQrCode) {
            clearInterval(timer);
          }
        }, 2000);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
