const EVENT_STATUS = {
    EXPECTED: "EXPECTED",
    ENDED: "ENDED",
    ARCHIVE: "ARCHIVE"
} as const;

export type EventStatus = keyof typeof EVENT_STATUS;


export interface IEvent {
    id: number;
    name: string;
    members: string;
    place: string;
    description: string;
    author: string;
    photo: string;
    status: EventStatus;
    date: string;
    start: string,
    end: string
}

