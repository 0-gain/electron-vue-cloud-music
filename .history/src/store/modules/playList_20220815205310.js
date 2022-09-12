import { reqSongUrl, reqSongDetail, reqLikeMusic } from "@/api/discover/musicList";
const state = {
  songUrl: {}, //当前所点击的歌曲url
  musicAllList: [], //当前歌单所有的歌曲详情
  musicList: {}, //歌曲的详情
  musicId: "", //当前所点击的歌曲的id
  isPlay: false, //音乐的播放状态
  duration: "", //歌曲的总时长
  // 当前歌曲的歌词
  lyric: [],
  // 当前歌曲的歌词时间
  lyricTime: [],
  // 当前播放的时间
  currentTime: 0,
  // 当前歌词的索引
  lyricIndex: 0,
  // 音乐详情页是否展开
  isPlaylistCardDetail: false,
  // 上一次获取歌单的时候
  lastTime: new Date().getTime(),
};

const mutations = {
  // 获取歌曲的url
  GETSONGURL(state, songUrl) {
    state.songUrl = songUrl.url;
  },

  // 获取所有歌曲的详情
  GETSONGDETAIL(state, songInfo) {
    // 添加isLike属性
    songInfo.forEach(item=>{
      item.isLike = false
    })

    state.musicAllList = songInfo;
    
  },

  // 获取当前歌曲的详情
  GET_CURRENT_SONG_DETAIL(state, songInfo) {
    // 添加isLike属性
    songInfo.isLike = false
    
    state.duration = songInfo.dt;
    state.musicList = songInfo;
  },

  // 修改播放的状态
  CHANGEPLAYSTATE(state, isPlay) {
    state.isPlay = isPlay;
  },

  // 更新当前所点击的歌曲的id
  UPDATEMUSICID(state, musicId) {
    state.musicId = musicId;
  },

  // 更新当前播放的时间
  UPDATECURRENTTIME(state, currentTime) {
    state.currentTime = currentTime;
  },

  // 更新音乐的歌词
  UPDATELYRIC(state, lyric) {
    state.lyric = lyric;
  },

  // 存储音乐的歌词时间
  UPDATELYRICINDEX(state, lyricIndex) {
    state.lyricIndex = lyricIndex;
  },

  // 切换音乐详情卡片的显隐
  CHANGEPLAYLISTCARDDETAIL(state, isPlaylistCardDetail) {
    state.isPlaylistCardDetail = isPlaylistCardDetail;
  },

  // 存储上一次获取精品歌单的时间
  UPDATELASTTIME(state, lastTime) {
    state.lastTime = lastTime;
  },

  // 清空当前播放音乐的数据(清空抽屉播放列表回调)
  RESETCURRENTMUSICK(state) {
    // 清空当前播放音乐的详情
    state.musicList = [];
    // 清空当前播放音乐的音频
    state.songUrl = "";
    // 重置当前歌曲的总时长
    state.duration = 0;
    // 重置当前音乐的id
    state.musicId = "";
  },
};

const actions = {
  // 获取歌曲的url
  async getSongUrl({ commit }, id) {
    const result = await reqSongUrl(id);
    if (result.code === 200) {
      commit("GETSONGURL", result.data[0] || {});
    }
  },

  // 获取所有歌曲的详情
  async getSongDetail({ commit }, trackIds) {
    const result = await reqSongDetail(trackIds);
    if (result.code === 200) {
      // 说明不止一首
      if (result.songs.length > 1) {
        commit("GETSONGDETAIL", result.songs);
      } else {
        // 就一首歌曲
        commit("GET_CURRENT_SONG_DETAIL", result.songs[0]);
      }
    }
  },

  // 喜欢音乐
  async getLikeMusic({commit,state},id) {
    const result = await reqLikeMusic(id)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
