import { createSlice } from "@reduxjs/toolkit";
// import { IAboutUs, initIAboutUs } from "../../сomponents/AboutUs/interfaces/IAboutUs";
import { IMember } from "../../сomponents/Team/interfaces/IMembers";
import { initMember } from "../../сomponents/AdminPage/AboutUsAdmin/interfaces/IMemberDate";


export const statusEvt = {
  allMembers: "ALL",
  addMember: "ADD",
  editMember: "EDIT",
  deleteMember: "DELETE",
  editAboutUs: "EDIT_AbUs"
}

export interface AboutUsState {
  members: IMember[] | [];
  edit_member: IMember;
  // edit_aboutUs: null | IAboutUs;
  status: string
}

export const initAboutUsState: AboutUsState = {
  members: [],
  edit_member: initMember,
  // edit_aboutUs: null,
  status: statusEvt.allMembers
}
const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState: initAboutUsState,
  reducers: {
    getMembers: (state, { payload }) => ({ ...state, edit_member: initMember, members: [...payload] }),
    addMember: (state, { payload }) => ({ ...state, edit_member: initMember, members: [...state.members, payload] }),
    getOneMember: (state, { payload }) => {
      const foundMember = state.members.find(({ id }) => id === payload);
      if (foundMember) {
        return { ...state, edit_member: foundMember };
      }
      return state;
    },
    updateMember: (state, { payload }) => {
      console.log("🚀 ~ file: AboutUsSlice.ts:42 ~ updateMember:", updateMember)
      state.members = state.members.map((member) =>
        member.id === payload.id ? { ...member, ...payload } : member
      );
    },
    // getAboutUs: (state, { payload }) => ({ ...state, edit_aboutUs: payload }),
    eventsStatus: (state, { payload }) => ({ ...state, status: payload }),
  }
});

export const aboutUsReducer = aboutUsSlice.reducer;

export const {
  getMembers,
  addMember,
  getOneMember,
  eventsStatus,
  updateMember,
  // getAboutUs,
} = aboutUsSlice.actions;