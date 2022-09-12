const getters = {
  isLike: (state) =>{
    let {musicId} = state.playList
    let {userLikeList} = state.user
  },
};
export default getters;
