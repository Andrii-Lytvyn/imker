import { IUserDto } from "../../../AdminPage/UserAdmin/interfaces/IUserDto";

export interface IUsersDto {
  users: IUserDto[];
  count: number;
  pages: number;
}

export const initIUsersDto: IUsersDto = {
  users: [],
  count: 0,
  pages: 0,
};
