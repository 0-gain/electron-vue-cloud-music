// 对axios进行二次封装
import axios from "axios";

// 该项目所有请求均为get请求
const requests = axios.create({
  baseURL: "/api",
  timeout: 30000,
  withCredentials: true
});

requests.interceptors.request.use((config)=>{
    return config;
},err=>{
    console.log(err)
})

requests.interceptors.response.use((res)=>{
    return res.data
},(err)=>{
    return Promise.reject(new Error('faile'));
})

export default requests;
