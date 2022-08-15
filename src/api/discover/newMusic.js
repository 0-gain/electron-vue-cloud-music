import request from "@/api/request";

// 新歌速递
/* 
    全部:0

    华语:7

    欧美:96

    日本:8

    韩国:16
*/

export const reqTopSong = (type) =>
  request.get("/top/song", { params: { type, _: new Date().getTime() } });

// 新碟上架 limit 和offset无效
export const reqNewAlbum = (area) =>
  request.get("/top/album", {
    params: { area, _: new Date().getTime() },
  });

// 全部新碟
export const reqAllNewAlbum = (area, limit, offset) => request.get("/album/new", {
  params: {
    area,
    limit,
    offset,
    _: new Date().getTime(),
  },
});
