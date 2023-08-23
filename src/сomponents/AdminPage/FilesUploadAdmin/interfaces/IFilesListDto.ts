import { IFileDto } from "./IFileDto";

export interface IFilesListDto {
  files: IFileDto[];
  count: number;
  pages: number;
}

export const initIFilesListDto: IFilesListDto = {
  files: [],
  count: 0,
  pages: 0,
};