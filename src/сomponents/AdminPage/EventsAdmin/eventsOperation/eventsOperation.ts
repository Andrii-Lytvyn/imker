import axios from "axios";
import { ICreateEvents } from "../interface/ICreateEvents";
import linkToServer from "../../../globalLinkToServer";
import { IEvent } from "../../../Events/interface/IEventsData";
import { toast } from "react-toastify";

export const createNewEvent = async (createNewEvent: ICreateEvents) => {
    try {
        const data = await axios.post(`/api/events`, createNewEvent);
        return data;
    } catch (error) {
        console.log("Server Error !!!");
    }
};

export const editedEvent = async (editEvent: IEvent) => {
    try {
        const data = await axios.put(
            `${linkToServer}/api/events/${editEvent.idEvent}`,
            editEvent
        );
        return data

    } catch (error) {
        toast.error(`Server Error !!!`);
    }
};