import request from "@/api/request";

// 手机号登录
export function login_cellphone(phone, password) {
  return request.get("/login/cellphone", {
    phone,
    password,
  });
}

// 二维码登录
// 1.二维码key生成
export function reqQr_key() {
  return request.get("/login/qr/key", {
    params: {
      _: new Date().getTime(),
    },
  });
}

// 2.二维码生成
/* 
    必选参数: key,由第一个接口生成

    可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
*/
export const reqQr_create = (key) =>
  request.get("/login/qr/create", { params: { key,qrimg:true, _: new Date().getTime() } });

// 3.二维码检测扫码状态接口
/* 
    轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
    必选参数: key
*/
export const reqQr_checkStatus = (key) =>
  request.get("/login/qr/check", { params: { key, _: new Date().getTime() } });


// 登录状态
export const loginStatus = (cookie) => request.get('/login/status',{params:{
  cookie,
  _: new Date().getTime()
}})

// 用户详情
export const reqUser_detail = (uid) => request.get('/user/detail',{
  params:{
    uid,
    _: new Date().getTime()
  }
})

// 获取用户信息，歌单，收藏，mv,dj数量
export const reqSubcount = (uid) =>request.get('/user/subcount',{
  params:{
    uid,
    _: new Date().getTime()
  }
})

// 获取用户账户信息
export const reqAccount = (uid) => request.get('/user/account',{
  params:{
    uid,
    _: new Date().getTime()
  }
})