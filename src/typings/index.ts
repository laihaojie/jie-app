
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
