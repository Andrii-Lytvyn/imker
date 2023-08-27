import { IGalleryPhoto } from "./IGalleryPhoto";

export interface IGalleryPhotos {
  photos: IGalleryPhoto[];
  count: number;
  pages: number;
}

export const initIFilesListDto: IGalleryPhotos = {
  photos: [],
  count: 0,
  pages: 0,
};