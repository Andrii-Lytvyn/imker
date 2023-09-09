import { useAppSelector } from "../../hooks/dispatch.selector";
import { RootState } from "../store";

const membersSelector = (state: RootState) => state.aboutUs.members;
const memberSelector = (state: RootState) => state.aboutUs.edit_member;
const statusSelector = (state: RootState) => state.aboutUs.status;

export const useAboutUsSelector = () => {
    return {
        members: useAppSelector(membersSelector),
        edit_member: useAppSelector(memberSelector),
        aboutUsStatus: useAppSelector(statusSelector),
    }
}
