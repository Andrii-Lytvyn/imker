import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./EventsAdmin.module.css";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { getEvents, getOneEvent } from "../../../redux/eventsStore/eventsSlice";

import { IEvent } from "../../Events/interface/IEventsData";
const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

// Получение  всех Events
const getAllEvents = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/user_login`);

    return data;
  } catch (error) {
    toast.error(`Ошибка сервера getAllEvents ${error}`);
  }
};

const EditAllEvents = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<IEvent[] | null>([]);

  useEffect(() => {
    const getEvt = async () => {
      try {
        const requestEvent = await getAllEvents();
        setEvents(requestEvent);
        dispatch(getEvents(requestEvent));
      } catch (error) {
        console.log("🚀  error:", error);
      }
    };
    getEvt();
  }, [dispatch]);

  const editCurrentEvent = (id: string) => {
    dispatch(getOneEvent(id));
    navigate(`/eventsadm-edit/${id}`);
  };

  return (
    <div>
      <button type="button" onClick={() => navigate(`/eventsadm`)}>
        back
      </button>
      <ul className={styles.edit}>
        {events?.map(({ name, id, dateStart, description }) => (
          <li key={id}>
            <div className={styles.edit_info}>
              <span>{name}</span>
              <span>{dateStart}</span>
              <p>{description.slice(0, 20)}...</p>
              <button type="button" onClick={() => editCurrentEvent(id)}>
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditAllEvents;
