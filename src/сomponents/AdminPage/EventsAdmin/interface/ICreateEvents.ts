import { EventStatus } from "../../../Events/interface/IEventsData";

export interface ICreateEvents {
    id?: string | number,
    name: string,
    members: string,
    address: string,
    location: string,
    description: string,
    author: string,
    photo: string,
    status: EventStatus,
    date: string | undefined,
    start: string,
    end: string,
}