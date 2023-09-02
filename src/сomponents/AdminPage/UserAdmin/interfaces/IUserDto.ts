export interface IUserDto {
  id: number;
  name: string;
  email: string;
  image: string;
  phone: string;
  plz: string;
  role: string;
  state: string;
}
export const initIUserDto = {
  id: -1,
  name: "",
  email: "",
  image: "",
  phone: "",
  plz: "",
  role: "",
  state: ""
}