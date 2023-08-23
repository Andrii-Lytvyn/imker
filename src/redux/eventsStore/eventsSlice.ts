import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../сomponents/Events/interface/IEventsData";

export interface EventsState {
    events: IEvent[] | [];
    event_edit: IEvent;
    count: string;
}

export const initEventsState: EventsState = {
    events: [],
    event_edit: {},
    count: ""
}
const eventsSlice = createSlice({
    name: "events",
    initialState: initEventsState,
    reducers: {
        getEvents: (state, { payload }) => ({ ...state, event_edit: {}, events: [...payload] }),
        addEvent: (state, { payload }) => ({ ...state, event_edit: {}, events: [...state.events, payload] }),
        getOneEvent: (state, { payload }) => {
            const foundEvent = state.events.find(({ id }) => id === payload);
            if (foundEvent) {
                return { ...state, event_edit: foundEvent };
            }
            return state;
        }
    }
});
export const eventsReducer = eventsSlice.reducer;

export const {
    getEvents,
    addEvent,
    getOneEvent,
} = eventsSlice.actions;

