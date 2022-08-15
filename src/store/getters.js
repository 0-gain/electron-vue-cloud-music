const getters = {
  isLike: (state) =>{
    if(state.playList.musicList){
      return state.playList.musicList.isLike
    }
  },
};
export default getters;
