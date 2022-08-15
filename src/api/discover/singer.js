import request from "@/api/request";

/* 
    获取歌手分类列表
        limit:默认为30
        offset：默认为0
        initial：按首字母索引查找参数
        type:
            -1:全部
             1:男歌手
             2:女歌手
             3:乐队
        area:
            -1:全部
             7华语
             96欧美
             8:日本
             16韩国
             0:其他
*/
export const reqArtistList = (type, area, initial, offset) =>
  request.get("/artist/list", {
    params: {
      type,
      area,
      initial,
      offset,
    },
  });

// 获取歌手详情
export const reqArtistDetail = (id) =>
  request.get("/artist/detail", { params: { id, _: new Date().getTime() } });

// 获取歌手专辑
export const reqArtistAlbum = (id, limit, offset) =>
  request.get("/artist/album", {
    params: { id, limit, offset, _: new Date().getTime() },
  });

// 获取专辑内容
export const reqAlbumDetail = (id) => request.get('/album',{params:{
  id,
  _:new Date().getTime()
}})
// 获取歌手热门50首歌曲
export const reqArtistTopSong = (id) =>
  request.get("/artist/top/song", { params: { id, _: new Date().getTime() } });

// 数字专辑详情
export const reqAlbumPlaylistDetail = (id) => request.get('/album/detail',{params:id})

// 专辑动态信息(收藏数，评论数，分享数，是否收藏)
export const reqAlbum_Dynamic = (id) => request.get('/album/detail/dynamic',{params:{id}})

// 获取歌手描述
export const reqArtistDesc = (id) => request.get('/artist/desc',{params:{id}})

// 获取歌手MV
export const reqArtistMv = (id,limit,offset) => request.get('/artist/mv',{params:{id,limit,offset,_:new Date().getTime()}})

// 获取相似歌手
export const reqSimiArtist = (id) => request.get('/simi/artist',{params:{id}})

// 关注歌手新歌
export const reqArtistNewSong = (limit,before) => request.get('/artist/new/song',{params:{
  limit,
  before,
  _:new Date().getTime()
}})
