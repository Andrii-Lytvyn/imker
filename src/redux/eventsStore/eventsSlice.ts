import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../сomponents/Events/interface/IEventsData";
export const statusEvt = {
    addEvnt: "ADD",
    allEvnt: "ALL",
    editEvnt: "EDIT"
}

export interface EventsState {
    events: IEvent[] | [];
    event_edit: IEvent;
    count: string;
    status: string
}

export const initEventsState: EventsState = {
    events: [],
    event_edit: {},
    count: "",
    status: statusEvt.allEvnt
}
const eventsSlice = createSlice({
    name: "events",
    initialState: initEventsState,
    reducers: {
        getEvents: (state, { payload }) => ({ ...state, event_edit: {}, events: [...payload] }),
        addEvent: (state, { payload }) => ({ ...state, event_edit: {}, events: [...state.events, payload] }),
        getOneEvent: (state, { payload }) => {
            const foundEvent = state.events.find(({ idEvent }) => idEvent === payload);
            if (foundEvent) {
                return { ...state, event_edit: foundEvent };
            }
            return state;
        },
        eventsStatus: (state, { payload }) => ({ ...state, status: payload }),
        updateEvent: (state, { payload }) => {
            state.events = state.events.map((event) =>
                event.idEvent === payload.idEvent ? { ...event, ...payload } : event
            );
        },
    }
});
export const eventsReducer = eventsSlice.reducer;

export const {
    getEvents,
    addEvent,
    getOneEvent,
    eventsStatus,
    updateEvent,
} = eventsSlice.actions;

