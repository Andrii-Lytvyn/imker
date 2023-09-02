export interface INewPostDto {
  [key: string]: string;
}

export const initINewPostDto: INewPostDto = {
  titlePost: "",
  linkToImg: "",
  shortPostDescription: "",
  textOfPost: "",
  authorName: "",
};
