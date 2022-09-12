const getters = {
  isLike: (state) =>{
    let {musicId} = state.playList
    let {userLikeList} = state.user
      console.log(userLikeList)
    if(userLikeList.indexOf(musicId) != -1){
      return true
    }

    return false
  },
};
export default getters;
