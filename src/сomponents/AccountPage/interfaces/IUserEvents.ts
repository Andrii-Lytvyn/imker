import { IEvent } from "../../Events/interface/IEventsData";

export interface IUserEvents {
    events:IEvent[]
}

export const initIUserEvents: IUserEvents = {
  events:[]
};
