import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../../сomponents/Team/interfaces/IMembers";
import { initMember } from "../../сomponents/AdminPage/AboutUsAdmin/interfaces/IMemberDate";


export const statusesAbUs = {
  allMembers: "ALL",
  addMember: "ADD",
  editMember: "EDIT",
  deleteMember: "DELETE",
  editAboutUs: "EDIT_AbUs"
}

export interface AboutUsState {
  members: IMember[] | [];
  edit_member: IMember;
  status: string
}

export const initAboutUsState: AboutUsState = {
  members: [],
  edit_member: initMember,
  status: statusesAbUs.allMembers
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
      state.members = state.members.map((member) =>
        member.id === payload.id ? { ...member, ...payload } : member
      );
    },
    aboutUsAction: (state, { payload }) => ({ ...state, status: payload }),
  }
});

export const aboutUsReducer = aboutUsSlice.reducer;

export const {
  getMembers,
  addMember,
  getOneMember,
  aboutUsAction,
  updateMember,
} = aboutUsSlice.actions;