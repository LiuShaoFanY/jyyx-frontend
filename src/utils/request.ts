import axios from "axios";

// 创建一个新的 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL, // 后端的接口地址
  timeout: 30000,
});

// request 拦截器
// 可以在请求发送前对请求做一些处理
// 比如统一加 token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    const user = JSON.parse(localStorage.getItem("honey-user") || "{}");
    config.headers["token"] = user.token; // 设置请求头
    return config;
  },
  (error) => {
    console.error("request error: " + error); // for debug
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    // 这里可以对响应数据进行处理
    return response.data;
  },
  (error) => {
    console.error("response error: " + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
