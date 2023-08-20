import { createSlice } from "@reduxjs/toolkit";
import { IEvents } from "../../сomponents/Events/interface/IEventsData";

export interface EventsState {
    events: IEvents[] | [];
    event: IEvents;
    count: string;
}

export const initEventsState: EventsState = {
    events: [],
    event: {},
    count: ""
}
const eventsSlice = createSlice({
    name: "events",
    initialState: initEventsState,
    reducers: {
        getEvents: (state, { payload }) => ({ ...state, events: [...payload] }),
        getOneEvent: (state, { payload }) => {
            const foundEvent = state.events.find((item) => item.id === payload);
            if (foundEvent) {
                return { ...state, event: foundEvent };
            }
            return state; // Если событие не найдено, вернуть текущее состояние
        }
    }
});
export const eventsReducer = eventsSlice.reducer;

export const {
    getEvents,
    getOneEvent
} = eventsSlice.actions;

