import { useAppSelector } from "../../hooks/dispatch.selector";
import { RootState } from "../store";

export const navSelector = (state: RootState) => state.nav;

export const useNavPageSelector = () => {
    return {
        navPageLink: useAppSelector(navSelector),
    }
}