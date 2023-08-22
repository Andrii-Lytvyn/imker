import { IPostDto } from "../../../Posts/interfaces/IPostDTO";

export interface IPostsDto {
  posts: IPostDto[];
  count: number;
  pages: number;
}

export const initIPostsDto: IPostsDto = {
  posts: [],
  count: 0,
  pages: 0,
};
