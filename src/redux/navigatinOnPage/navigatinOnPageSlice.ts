import { createSlice } from "@reduxjs/toolkit";

export const setLinkPage = {
    main: "/",
    posts: "/posts",
    events: "/events",
    aboutUs: "/aboutUs",
    contactUs: "/contactUs",
    gallery: "/gallery",
    register: '/register',
    singUp: "/singUp",
    accountpage: "/accountpage",
    adminpage: "/adminpage",
    restore: "/restore",
    restoreAnswer: "/restoreAnswer",
    restorePassword: "/restorePassword",
    lost: "*"
}
export const initNavState = setLinkPage.main


const navSlice = createSlice({
    name: "nav",
    initialState: initNavState,
    reducers: {
        navStatus: (_, { payload }) => (payload),
    }
});
export const navReducer = navSlice.reducer;
export const {
    navStatus
} = navSlice.actions;