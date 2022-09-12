import {
  reqUser_detail,
  reqSubcount,
  reqAccount,
  reqLikeList,
} from "@/api/user";
const state = {
  // 用户ID
  uid:'',
  // 用户详情
  userDetail: {},
  // 用户信息，歌单....的数量
  userCounts: {},
  // 用户账户信息
  userAccount: {},
  // 用户喜欢歌曲列表
  userLikeList: [],
};
const mutations = {
  // 用户详情信息
  USER_ALL_DATA(state, data) {
    state.userDetail = data[0];
    state.userCounts = data[1];
    state.userAccount = data[2];
  },

  // 用户id
  USER_ID(state,uid){
    state.uid = uid
  },

  // 用户的喜欢列表
  UPDATE_USER_LIKE_LIST(state,userLikeList){
    state.userLikeList = userLikeList
    // console.log(userLikeList)
  }
};
const actions = {
  // 获取用户所有的数据
  async getUserAllData({ commit }, uid) {
    // 查看用户详情
    const getUser_detail = await reqUser_detail(uid);
    // 获取用户信息，歌单....的数量
    const getUser_count = await reqSubcount(uid);
    // 获取用户账户信息
    const getAccount_Data = await reqAccount(uid);

    Promise.all([
      getUser_detail,
      getUser_count,
      getAccount_Data,
    ]).then((values) => {
      commit("USER_ALL_DATA", values);
    });
  },

  // 获取用户喜欢列表
  async getUserLikeList({ state,commit }, uid) {
    uid ? uid : state.uid
    const result = await reqLikeList(uid)
    if(result.code === 200){
      console.log(result.ids)
      commit('UPDATE_USER_LIKE_LIST',result.ids)
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
