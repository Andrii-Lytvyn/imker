import { EventStatus } from "../../../Events/interface/IEventsData";

export interface ICreateEvents {
    id?: string | number,
    title: string,
    quantityOfMembers: string | null,
    address: string,
    location: string | null,
    shortEventDescription: string,
    description: string,
    author: string,
    photo: string,
    status: EventStatus,
    dateStart: string | undefined,
    dateEnd: string | undefined,
    startTime: string,
    endTime: string,
}