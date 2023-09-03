import { IUserDto } from "../../AdminPage/UserAdmin/interfaces/IUserDto";

export interface IUsersOnEvents {
  users:IUserDto[]
}

export const initIUsersOnEvents: IUsersOnEvents = {
  users:[]
};