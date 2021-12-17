import { UserInfo } from "src/typings";
import { MyTask } from "src/typings/api";
import { Get, Post, request } from "src/utils/request";

export const Api = {
  getGzhList: () => Get<Object>(`/api/app/gzh/articles`),
  getPolicy: () => Get<any>(`/api/Public/oss/policy`),
  // 检测更新
  getDevVersion: () => Get<any>(`/api/Public/dev/androidupload`),
  // 发送验证码
  sendSms: (data) => Post(`/api/Public/api/public/send_sms`, data),
  // 登录
  login: (data) => request<string>(`/api/Account/login`, "post", data),

  // 获取用户信息
  getUserInfo: () => Get<UserInfo>(`/api/Account/info`),

  // 获取任务列表
  getMyTask: () => Get<MyTask>(`/api/Task/myTask`),
}