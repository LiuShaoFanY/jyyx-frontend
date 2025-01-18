// Add a request interceptor
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * 添加请求拦截器
 *
 * @param config - 请求配置对象，包含请求的所有信息
 * @returns 返回修改后的请求配置对象
 */
axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    // 在请求发送之前处理请求配置，如添加认证信息、日志记录等
    return config;
  },
  function (error) {
    // 处理请求错误，如网络异常等
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 *
 * @param response - 响应对象，包含服务器返回的数据
 * @returns 返回响应对象或处理后的数据
 */
axios.interceptors.response.use(
  function (response: AxiosResponse<any, any>) {
    console.log("响应", response);
    // 当响应状态码为2xx时触发此函数
    // 可以在此处处理响应数据，如解析、格式化等
    return response;
  },
  function (error) {
    // 当响应状态码不在2xx范围内时触发此函数
    // 处理响应中的错误，如HTTP状态码4xx、5xx等
    return Promise.reject(error);
  }
);
