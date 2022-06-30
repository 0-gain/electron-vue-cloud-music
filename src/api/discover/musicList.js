import request from "@/api/request";

/* 
    获取精品歌单
        cat: tag,分类:'华语'、'古风'、'欧美'.... 默认为'全部'
            /playlist/highquality/tags
        limit: 取出歌单的数量,默认为20
        before:分页参数,取上一页最后一个歌单的updateTime获取下一页数据
            /top/playlist/highquality?before=1503639064232&limit=3
*/

export const reqHighQuality = (limit) =>
  request.get(`/top/playlist/highquality?limit=${limit}`);

// 热门歌单分类
export const reqHotList = () => request.get("/playlist/hot");

// 全部歌单分类
export const reqCatList = () => request.get("/playlist/catlist");

// 获取歌单
/* 
        limit：取出的歌单数量，默认为50
        offset：偏移数量，用于分页，如：（当前页-1）*50,50为limit的值
*/
export const reqPlayList = ({ limit = 80, offset = 0 }) =>
  request.get("/top/playlist", {
    params: {
      limit,
      offset,
    },
  });

// 获取歌单详情
export const reqPlaylistDetail = (id) =>
  request.get("/playlist/detail", {
    params: {
      id,
    },
  });

// 获取歌曲详情
export const reqSongDetail = (ids) =>
  request.get("/song/detail", {
    params: {
      ids,
    },
  });

// 获取音乐的url
export const reqSongUrl = (id) =>
  request.get("/song/url", {
    params: {
      id,
    },
  });
