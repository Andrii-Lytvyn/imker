import { createSlice } from "@reduxjs/toolkit";
import { question, userData } from "./interface/IUserData";

export const initUserState = {
    user: userData,
    secretQuestion: question,
    isLogin: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: {
        getQuestion: ((state, { payload }) => ({ ...state, secretQuestion: { ...payload } })),
        userDataInfo: ((state, { payload }) => ({ ...state, user: { ...payload }, secretQuestion: question })),
        userIsLogin: ((state, { payload }) => ({ ...state, isLogin: payload })),
    }
})

export const userReducer = userSlice.reducer;
export const {
    getQuestion,
    userDataInfo,
    userIsLogin
} = userSlice.actions;