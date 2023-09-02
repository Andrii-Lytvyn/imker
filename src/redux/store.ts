import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer, initEventsState } from "./eventsStore/eventsSlice";
import { initUserState, userReducer } from "./userStore/userSlice";

export const initState = {
    event: initEventsState,
    user: initUserState
};

export const store = configureStore({
    preloadedState: initState,
    reducer: {
        event: eventsReducer,
        user: userReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

