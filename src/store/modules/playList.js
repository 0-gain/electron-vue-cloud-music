import { reqSongUrl,reqSongDetail } from "@/api/discover/musicList"
const state = {
    songUrl:{},//当前所点击的歌曲url
    songInfo:{},//当前所点击的歌曲的信息
    isPlay:false,//音乐的播放状态
}

const mutations = {
    GETSONGURL(state,songUrl){
        state.songUrl = songUrl
    },
    GETSONGDETAIL(state,songInfo){
        state.songInfo = songInfo
    },
    // 修改播放的状态
    CHANGEPLAYSTATE(state,isPlay) {
        state.isPlay = isPlay
    }
}

const actions = {
    // 获取歌曲的url
    async getSongUrl({commit},id){
        const result = await reqSongUrl(id)
        if(result.code === 200){
            console.log(result.data[0])
            commit("GETSONGURL",result.data[0])
        }
    },

    // 获取歌曲的信息
    async getSongDetail({commit},id){
        const result = await reqSongDetail(id)
        if(result.code === 200){
            console.log(result.songs[0])
            commit('GETSONGDETAIL',result.songs[0])
        }
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}