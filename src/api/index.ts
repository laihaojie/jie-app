import { UserInfo } from "src/typings";
import { Task } from "src/typings/api";
import { Get, Post, request } from "src/utils/request";

export const Api = {
  getPolicy: () => Get<any>(`/api/Public/oss/policy`),
  // 检测更新
  getDevVersion: () => Get<any>(`/api/Public/dev/androidupload`),
  // 发送验证码
  sendSms: (data) => Post(`/api/Public/api/public/send_sms`, data),
  // 登录
  login: (data) => request<string>(`/api/account/login`, "post", data),

  // 获取用户信息
  getUserInfo: () => Get<UserInfo>(`/api/account/info`),

  // 获取任务列表
  getTaskList: (data) => Get<Task[]>(`/api/todoList/taskList`, data),

  // 创建任务
  createTask: (data) => Post(`/api/todoList/createTask`, data),

  // 删除任务
  removeTask: (data) => Post(`/api/todoList/removeTask`, data),

  // 更新任务
  updateTask: (data) => Post(`/api/todoList/updateTask`, data),
}