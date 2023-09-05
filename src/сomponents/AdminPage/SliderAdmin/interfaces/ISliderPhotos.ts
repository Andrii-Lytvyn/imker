import { ISliderPhoto } from "./ISliderPhoto";

export interface ISliderPhotos {
  photos: ISliderPhoto[];
  count: number;
  pages: number;
}

export const initIFilesListDto: ISliderPhotos = {
  photos: [],
  count: 0,
  pages: 0,
};