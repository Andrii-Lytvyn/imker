import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer, initEventsState } from "./eventsStore/eventsSlice";


export const initState = {
    event: initEventsState,
};


export const store = configureStore({
    preloadedState: initState,
    reducer: {
        event: eventsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

