
export type App = {
  id: string;
  name: string;
  webPosition: Number;
  h5Position: Number;
};

export type UserInfo = {
  id: string;
  account: string;
  password: string;
  nick_name?: string;
  avatar?: string;
  mobile?: string;
  createTime?: Date;
};

export type NativeData = {
  aa: string
}
