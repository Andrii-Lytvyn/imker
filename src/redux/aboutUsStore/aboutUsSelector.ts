import { useAppSelector } from "../../hooks/dispatch.selector";
import { RootState } from "../store";

const membersSelector = (state: RootState) => state.aboutUs.members;
const memberSelector = (state: RootState) => state.aboutUs.edit_member;
// const aboutUsSelector = (state: RootState) => state.aboutUs.edit_aboutUs;
const statusSelector = (state: RootState) => state.aboutUs.status;

export const useAboutUsSelector = () => {
    return {
        members: useAppSelector(membersSelector),
        edit_member: useAppSelector(memberSelector),
        // edit_aboutUs: useAppSelector(aboutUsSelector),
        aboutUsStatus: useAppSelector(statusSelector),
    }
}
