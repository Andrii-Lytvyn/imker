export interface IUserEvents {
  id: number;
  title: string;
  address: string;
  author: string;
  description: string;
  shortDescription: string;
  quantityOfMembers: number;
  photo: string;
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
}

export const initIUserEvents: IUserEvents = {
  id: -1,
  title: "",
  address: "",
  author: "",
  description: "",
  shortDescription: "",
  quantityOfMembers: 0,
  photo: "",
  dateStart: "",
  dateEnd: "",
  startTime: "",
  endTime: "",
  location: "",
  status: "",
};
