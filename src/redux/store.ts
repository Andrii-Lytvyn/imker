import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer, initEventsState } from "./eventsStore/eventsSlice";
import { initUserState, userReducer } from "./userStore/userSlice";
import { aboutUsReducer, initAboutUsState } from "./aboutUsStore/AboutUsSlice";


export const initState = {
    event: initEventsState,
    user: initUserState,
    aboutUs: initAboutUsState,
};

export const store = configureStore({
    preloadedState: initState,
    reducer: {
        event: eventsReducer,
        user: userReducer,
        aboutUs: aboutUsReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

