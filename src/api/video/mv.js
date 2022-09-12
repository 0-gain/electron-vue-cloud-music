import request from "@/api/request";

/* 
获取独家放送列表
    limit: 默认为60
    offset
*/
export const reqPrivateContentList = ({ limit = 60, offset = 0 }) =>
  request.get("/personalized/privatecontent/list", {
    params: {
      limit,
      offset,
      _: new Date().getTime(),
    },
  });

/* 
    获取mv地址
        必选参数：
            id:mv id
        可选参数：
            r:分辨率，默认1080
*/
export const reqMvUrl = (id, r) =>
  request.get("/mv/url", {
    params: {
      id,
      r,
      _: new Date().getTime(),
    },
  });

// 获取mv详情
export const reqMvDetail = (mvid) =>
  request.get("/mv/detail", {
    params: {
      mvid,
      _: new Date().getTime(),
    },
  });

// 获取mv评论
export const reqCommentMv = ({ id, limit, offset = 0 }) =>
  request.get("/comment/mv", {
    params: {
      id,
      limit,
      offset,
      _: new Date().getTime(),
    },
  });

// 获取mv点赞转发评论数据
export const reqMvOtherData = (mvid) =>
  request.get("/mv/detail/info", {
    params: {
      mvid,
      _: new Date().getTime(),
    },
  });
// 新版评论接口
/* 
    必选参数:
        id: 资源id,如歌曲id,mv id
        type: 数字,资源类型,对应歌曲,0：歌曲,1：mv,2: 歌单,3：专辑,4：电台,5：视频,6：动态
    可选参数 :
        pageNo:分页参数,第 N 页,默认为 1

        pageSize:分页参数,每页多少条数据,默认 20

        sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序

        cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
*/

export const reqAllComment = (id, type, pageSize, pageNo = 1, cursor) =>
  request.get("/comment/new", {
    params: {
      type,
      id,
      pageSize,
      pageNo,
      sortType: 3,
      cursor,
      _: new Date().getTime(),
    },
  });

// 获取全部热门评论
export const reqAllHotComment = (id, type, pageSize) =>
  request.get("/comment/hot", {
    params: {
      id,
      type,
      pageSize,
      _: new Date().getTime(),
    },
  });

// 评论点赞
/* 
  id:资源id，如歌曲id，mv id
  cid：评论id
  t：是否点赞，1：点赞，0：取消点赞
  type: 数字,资源类型,对应歌曲,0：歌曲,1：mv,2: 歌单,3：专辑,4：电台,5：视频,6：动态
*/
export const reqCommentLike = (id, cid, t, type) =>
  request.get("/comment/like", {
    params: {
      id,
      cid,
      t,
      type,
      _: new Date().getTime(),
    },
  });

// 发送/删除评论

/* 
  t: 1发送，2回复，0删除
  type: 数字,资源类型,对应歌曲,0：歌曲,1：mv,2: 歌单,3：专辑,4：电台,5：视频,6：动态
  id: 对应资源id(如果给动态发送/删除，评论，则不需要传id，需要传动态的threadId)
  content：要发送的内容
  commentId：回复的评论id(回复评论必填)
*/
export const reqPublishOrDeleteComment = (t, type, id, content, commentId) =>
  request.get("/comment", {
    params: { t, type, id, content, commentId, _: new Date().getTime() },
  });
// 最新mv
export const reqNewMv = (area, limit = 8) =>
  request.get("/mv/first", {
    params: { area, limit, _: new Date().getTime() },
  });

// 网易出品MV
export const reqMvExclusive = (limit = 8) =>
  request.get("/mv/exclusive/rcmd", {
    params: {
      limit,
      _: new Date().getTime(),
    },
  });

// 全部mv
export const reqMvAll = (area, order, type, limit = 8, offset) =>
  request.get("/mv/all", {
    params: {
      area,
      order,
      type,
      limit,
      offset,
      _: new Date().getTime(),
    },
  });

// mv排行榜
export const reqTopMv = (area, limit = 10, offset) =>
  request.get("/top/mv", {
    params: {
      area,
      limit,
      offset,
      _: new Date().getTime(),
    },
  });
