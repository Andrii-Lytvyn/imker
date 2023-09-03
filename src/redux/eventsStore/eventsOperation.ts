import axios from "axios";
import { toast } from "react-toastify";

export const getAllEventsFooter = async () => {
    try {
        //для Бека
        const { data } = await axios.get(`/api/events/getAll`);
        return data;
    } catch (error) {
        toast.error(`Ошибка сервера getAllEventsFooter ${error}`);
    }
};