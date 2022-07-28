export interface App {
  id: string
  name: string
  webPosition: Number
  h5Position: Number
}

export interface UserInfo {
  id: string
  account: string
  password: string
  nick_name?: string
  avatar?: string
  mobile?: string
  createTime?: Date
}

export interface NativeData {
  aa: string
}
