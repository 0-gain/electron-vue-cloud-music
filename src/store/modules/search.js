const state = {
    // 搜索关键词
    keywords:""
};
const mutations = {
    // 更新当前的关键词
    UPDATE_SEARCH_KEYWORDS(state,keywords){
        state.keywords = keywords
    }
};
const actions = {};

export default {
  namespaced: true,

  state,
  mutations,
  actions,
};
