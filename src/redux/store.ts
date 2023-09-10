import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer, initEventsState } from "./eventsStore/eventsSlice";
import { initUserState, userReducer } from "./userStore/userSlice";
import { initNavState, navReducer } from "./navigatinOnPage/navigatinOnPageSlice";
import { aboutUsReducer, initAboutUsState } from "./aboutUsStore/AboutUsSlice";


export const initState = {
    event: initEventsState,
    user: initUserState,
    nav: initNavState,
    aboutUs: initAboutUsState,
};

export const store = configureStore({
    preloadedState: initState,
    reducer: {
        event: eventsReducer,
        user: userReducer,

        nav: navReducer,
       aboutUs: aboutUsReducer,

    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

