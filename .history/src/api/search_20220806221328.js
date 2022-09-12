import request from "@/api/request";

// 热搜列表(详细)
export const reqSearchHot = () => request.get("/search/hot/detail");

// 搜索
/* 
   1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
*/
export const reqSearchKeywords = (keywords, type,limit=50,offset) =>
  request.get("/cloudsearch", { params: { keywords, type, limit, offset, _: new Date().getTime() } });

// 搜索多重匹配
export const reqSearchMultimatch = (keywords) =>
  request.get("/search/multimatch", { params: { keywords } });


  // 获取热门话题
export const reqHotTopic = (limit = 5)=>request.get('/hot/topic',{params:{limit}})