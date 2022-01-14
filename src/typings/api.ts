// Ctrl + Alt + V


export type App = {
  id: string;
  name: string;
  webPosition: Number;
  h5Position: Number;
};

export type UserInfo = {
  id: string;
  avatar: string;
  mobile: string;
  nickName: string;
  apps: App[];
};


export interface Policy {
  accessid: string,
  policy: string,
  signature: string,
  host: string,
  expire: string,
  dir: string
}


export interface Task {
  id: string
  task: string
  isSelected: boolean
  status: number
}

