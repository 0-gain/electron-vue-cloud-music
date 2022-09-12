import request from "@/api/request";

/* 
    发现音乐相关的API请求函数
*/

/* 
  首页
            可选参数：refresh: 是否刷新数据,默认为 false
                     cursor: 上一条数据返回的 cursor
*/
export const getHomeInfo = () => request.get('/homepage/block/page')

// 获取轮播图图片
export const reqBanners = () => request.get('/banner')

// 推荐歌单 limit:取出数量，默认为30
export const reqRecommendSongMenu = (limit) =>request.get(`/personalized?limit=${limit}`)

// 独家放送
export const reqPrivateContent = () => request.get('/personalized/privatecontent')

// 最新音乐 limit:默认为10
export const reqNewSong = (limit) => request.get(`/personalized/newsong?limit=${limit}`)

// 推荐MV
export const reqMV = () => request.get('/personalized/mv')

