// 对axios进行二次封装
import axios from "axios";
import store from "@/store";

// 该项目所有请求均为get请求
// let protocol = window.location.protocol; //协议
// let host = window.location.host; //主机
// let reg = /^localhost+/;
// if (reg.test(host)) {
//   axios.defaults.baseURL = "http://www.codeman.ink:3000";
// } else {
//   // 动态请求地址
//   axios.defaults.baseURL = protocol + "//" + host;
// }
const requests = axios.create({
  baseURL: "/api",
  // baseURL: "http://www.codeman.ink:3000",
  timeout: 30000,
  withCredentials: true,
});

requests.interceptors.request.use(
  (config) => {
   
    return config;
  },
  (err) => {
    console.log(err);
  }
);

requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
