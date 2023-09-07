import axios from "axios";
import { ICreateEvents } from "../interface/ICreateEvents";
import linkToServer from "../../../globalLinkToServer";
import { IEvent } from "../../../Events/interface/IEventsData";
import { toast } from "react-toastify";

export const createNewEvent = async (createNewEvent: ICreateEvents) => {
    try {
        await axios.post(`${linkToServer}/api/events`, createNewEvent);
    } catch (error) {
        console.log("Server Error !!!");
    }
};

export const editedEvent = async (editEvent: IEvent) => {
    try {
        await axios.put(
            `${linkToServer}/api/events/${editEvent.idEvent}`,
            editEvent
        );

    } catch (error) {
        toast.error(`Server Error !!!`);
    }
};