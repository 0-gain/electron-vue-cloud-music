import request from "@/api/request";

// 相关视频
export const reqRelatedVideo = (id) => request.get('/related/allvideo',{params:{
    id,
    _:new Date().getTime()
}})

// 获取视频标签列表
export const reqVideo_Group_list = () => request.get('/video/group/list')

// 获取视频分类列表
export const reqVideoCategoryList = () => request.get('/video/category/list')

// 获取全部视频列表
export const reqVideoTimelineAll = (offset) =>request.get('/video/timeline/all',{params:{offset,_:new Date().getTime()}})

// 获取推荐视频
export const reqVideoRecommend = (offset) => request.get('/video/timeline/recommend',{params:{offset,_:new Date().getTime()}})

// 获取视频分类视频
export const reqVideoGroup = (id,offset,limit=30) => request.get('/video/group',{params:{id,offset,limit,_:new Date().getTime()}})

// 获取视频详情
export const reqVideoDetail = (id) => request.get('/video/detail',{params:{id,_:new Date().getTime()}})

// 获取视频点赞转发评论数据
export const reqVideoOtherInfo = (vid) => request.get('/video/detail/info',{params:{vid,_:new Date().getTime()}})

// 获取视频播放地址
export const reqVideoUrl = (id) => request.get('/video/url',{params:{id,_:new Date().getTime()}})