const getters = {
  isLike: (state) => {
    let { musicId, musicAllList } = state.playList;
    let { userLikeList } = state.user;

    // 歌单
    musicAllList.forEach((el) => {
      if (userLikeList.indexOf(el.id) != -1) {
        el.isLike = true;
      }
    });
    // 正在播放的歌曲
    if (userLikeList.indexOf(musicId) != -1) {
      return true;
    }
    return false;
  },
};
export default getters;
