export interface IPostDto {
  idPost: string;
  creationTimePost: string;
  titlePost: string;
  linkToImg: string;
  shortPostDescription: string;
  textOfPost: string;
  authorName: string;
}

export const initIPostDto: IPostDto = {
  idPost: "",
  creationTimePost: "",
  titlePost: "",
  linkToImg: "",
  shortPostDescription: "",
  textOfPost: "",
  authorName: "",
};
