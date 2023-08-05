const EVENT_STATUS = {
    EXPECTED: "EXPECTED",
    ENDED: "ENDED",
    ARCHIVE: "ARCHIVE"
} as const;

export type EventStatus = keyof typeof EVENT_STATUS;

export interface IEvent {
    [key: string]: string
}

