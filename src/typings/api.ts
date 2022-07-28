// Ctrl + Alt + V

export interface App {
  id: string
  name: string
  webPosition: Number
  h5Position: Number
}

export interface UserInfo {
  id: string
  avatar: string
  mobile: string
  nickName: string
  apps: App[]
}

export interface Policy {
  accessid: string
  policy: string
  signature: string
  host: string
  expire: string
  dir: string
}

export interface Task {
  id: string
  task: string
  isSelected: boolean
  status: number
}
export interface NoteModel {
  id: string
  text: string
  isDelete: number
  status: number
}

