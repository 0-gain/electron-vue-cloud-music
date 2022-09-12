import request from "@/api/request";

/* 
    获取精品歌单
        cat: tag,分类:'华语'、'古风'、'欧美'.... 默认为'全部'
            /playlist/highquality/tags
        limit: 取出歌单的数量,默认为20
        before:分页参数,取上一页最后一个歌单的updateTime获取下一页数据
            /top/playlist/highquality?before=1503639064232&limit=3
*/

export const reqHighQuality = ({
  before = new Date().getTime(),
  limit = 30,
  cat = "全部",
}) =>
  request.get("/top/playlist/highquality", {
    params: {
      before,
      limit,
      cat,
    },
  });

// 精品歌单分类
export const reqHighQualityTags = () =>
  request.get("/playlist/highquality/tags");

// 热门歌单分类
export const reqHotList = () => request.get("/playlist/hot");

// 全部歌单分类
export const reqCatList = () => request.get("/playlist/catlist");

// 获取歌单
/* 
        limit：取出的歌单数量，默认为50
        offset：偏移数量，用于分页，如：（当前页-1）*50,50为limit的值
        cat : 歌单的分类（默认：全部）
        order: 最新歌单：new   最热歌单：hot(默认)
*/
export const reqPlayList = ({
  cat = "全部",
  limit = 50,
  offset = 0,
  order = "hot",
}) =>
  request.get("/top/playlist", {
    params: {
      cat,
      limit,
      offset,
      order,
    },
  });

// 获取歌单详情
export const reqPlaylistDetail = (id) =>
  request.get("/playlist/detail", {
    params: {
      id,
    },
  });

// 获取当前歌单所有歌曲的详情
export const reqSongDetail = (ids) =>
  request.get("/song/detail", {
    params: {
      ids,
    },
  });

// 获取所点击的音乐的url
export const reqSongUrl = (id) =>
  request.get("/song/url", {
    params: {
      id,
    },
  });

// 获取歌单评论
/* 
    limit:取出评论数量 , 默认为 20
    offset：偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
    before：分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
*/
export const reqComment = (id, limit, offset = 0) =>
  request.get("/comment/playlist", {
    params: {
      id,
      limit,
      offset,
    },
  });

// 获取歌单收藏者
export const reqCollectors = (id, limit, offset = 0) =>
  request.get("/playlist/subscribers", {
    params: {
      id,
      limit,
      offset,
    },
  });

// 获取歌词
export const reqLyric = (id) =>
  request.get("/lyric", {
    params: {
      id,
      _: new Date().getTime(),
    },
  });

// 获取歌曲评论
export const reqMusicComment = (id, offset) =>
  request.get("/comment/music", {
    params: {
      id,
      offset,
      _: new Date().getTime(),
    },
  });

// 获取歌单所有的歌曲
export const reqPlayListAllSong = (id, limit) =>
  request.get("/playlist/track/all", {
    params: {
      id,
      limit,
      _: new Date().getTime(),
    },
  });

// 私人FM
export const reqPersonalFm = () =>
  request.get("/personal_fm", { params: { _: new Date().getTime() } });

// 喜欢音乐 like:true喜欢,false取消喜欢
export const reqLikeMusic = (id, like = true) =>
  request.get("/like", { params: { id, like, _: new Date().getTime() } });

// 垃圾桶，将该音乐从私人FM种移除至垃圾桶
export const reqFm_trash = (id) =>
  request.get("/fm_trash", { params: { id, _: new Date().getTime() } });



// 最近播放-歌曲
export const reqRecent_song = () => request.get('/record/recent/song')

