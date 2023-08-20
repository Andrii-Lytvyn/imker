import { useAppSelector } from "../../hooks/dispatch.selector";
import { RootState } from "../store";

const eventsSelector = (state: RootState) => state.event.events;
const eventSelector = (state: RootState) => state.event.event;
const countSelector = (state: RootState) => state.event.count;

export const useEventsSelector = () => {
    return {
        events: useAppSelector(eventsSelector),
        event: useAppSelector(eventSelector),
        count: useAppSelector(countSelector),
    }
}