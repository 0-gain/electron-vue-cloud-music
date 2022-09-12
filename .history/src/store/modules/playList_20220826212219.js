import {
  reqSongUrl,
  reqSongDetail,
  reqLikeMusic,
  reqLyric,
} from "@/api/discover/musicList";
const state = {
  songUrl: {}, //当前所点击的歌曲url
  musicAllList: [], //当前歌单所有的歌曲详情
  musicList: {}, //歌曲的详情
  musicId: "", //当前所点击的歌曲的id
  isPlay: false, //音乐的播放状态
  duration: "", //歌曲的总时长
  // 当前歌曲的歌词
  lyric: [],
  // 当前播放的时间
  currentTime: 0,
  // 当前歌词的索引
  lyricIndex: 0,
  // 音乐详情页是否展开
  isPlaylistCardDetail: false,
  // 上一次获取歌单的时候
  lastTime: new Date().getTime(),
  // 播放列表
  playList: [],
};

const mutations = {
  // 获取歌曲的url
  GETSONGURL(state, songUrl) {
    state.songUrl = songUrl.url;
  },

  // 获取所有歌曲的详情
  GETSONGDETAIL(state, songInfo) {
    state.musicAllList = songInfo;
  },

  // 获取当前歌曲的详情
  GET_CURRENT_SONG_DETAIL(state, songInfo) {
    state.duration = songInfo.dt;
    state.musicList = songInfo;
  },

  // 抽屉的播放列表
  UPDATEPLAYLIST(state) {
    state.playList = state.musicAllList;
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

  // 喜欢歌曲
  async getLikeMusic({ commit }, { id, flag }) {
    const result = await reqLikeMusic(id);
    console.log(result);
  },

  // 获取歌词
  async getLyric({ commit }, id) {
    const result = await reqLyric(id);
    if (result.code === 200) {
      let lyrics = result.lrc.lyric;
      let arr = lyrics.split("\n");

      let lyricArr = [];

      //过滤空行,不去除后面split会出现undefined
      arr = arr.filter((item) => {
        if (item != "") {
          if (item.split("]")[1]) {
            return true;
          }
        }
      });

      arr.forEach((element) => {
        let str = element.split("[")[1];
        str = str.split("]")[0];
        let min = str.split(":")[0] * 60; //转换为分
        let sec = str.split(":")[1] * 1;
        let item = min + Math.floor(sec);

        // 二维数组
        lyricArr.push([item, element.split("]")[1]]);
      });
      commit("UPDATELYRIC", lyricArr);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
