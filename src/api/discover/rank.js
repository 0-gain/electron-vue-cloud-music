import request from '@/api/request'

// 获取所有榜单
export const reqTopList = () => request.get('/toplist')