export interface IUserAccountInfo {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  plz: string;
  role: string;
  state: string;
}
export const initIUserAccountInfo = {
  id: -1,
  name: "",
  email: "",
  image: "",
  phone: "",
  plz: "",
  role: "",
  state: ""
}