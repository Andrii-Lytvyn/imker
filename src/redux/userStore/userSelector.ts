import { useAppSelector } from "../../hooks/dispatch.selector";
import { RootState } from "../store";

const userSelector = (state: RootState) => state.user.user;
const secretQuestionSelector = (state: RootState) => state.user.secretQuestion;
const loadingSelector = (state: RootState) => state.user.isLogin;

export const useUserSelector = () => {
    return {
        user: useAppSelector(userSelector),
        question: useAppSelector(secretQuestionSelector),
        isLogin: useAppSelector(loadingSelector),
    }
}