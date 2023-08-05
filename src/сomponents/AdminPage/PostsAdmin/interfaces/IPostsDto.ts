import { IPostDto } from "../../../Posts/interfaces/IPostDTO";

export interface IPostsDto {
  posts: IPostDto[];
  count: number;
}

export const initIPostsDto: IPostsDto = {
  posts: [],
  count: 0,
};
