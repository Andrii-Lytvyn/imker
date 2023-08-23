import styles from "./Events.module.css";
import { currentDate, formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { getEvents } from "../../redux/eventsStore/eventsSlice";
import { EVENT_STATUS } from "./interface/IEventsData";

const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";
// const baseURL = "http://localhost:8080/api/events";

// Получение  всех Events
const getAllEvents = async () => {
  try {
    //для Бека
    // const { data } = await axios.get(
    //   `${baseURL}?orderBy=dateStart&desc=false&page=0`
    // );
    // return data.events;

    //////////////////////////////////
    //для Макса
    const { data } = await axios.get(`${baseURL}/user_login`);

    return data;
  } catch (error) {
    toast.error(`Ошибка сервера getAllEvents ${error}`);
  }
};

const Events = (): JSX.Element => {
  const { events } = useEventsSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEvt = async () => {
      try {
        const requestEvent = await getAllEvents();
        dispatch(getEvents(requestEvent));
      } catch (error) {
        console.log("🚀  error:", error);
      }
    };
    getEvt();
  }, [dispatch]);

  return (
    <>
      <h2>Our Events</h2>
      <div className={styles.cont}>
        {events.length === 0 ? (
          <div className={styles.event_loader}>
            <Loader />
          </div>
        ) : (
          <ul className={styles.event_list}>
            {
              events.map(
                ({ title, id, dateStart, startTime, endTime, status }) =>
                  dateStart > currentDate() &&
                  status === EVENT_STATUS.EXPECTED ? (
                    <li key={id} className={styles.list}>
                      <div className={styles.day}>
                        <span>{formattedDate(dateStart).month}</span>
                        <h4>{formattedDate(dateStart).day}</h4>
                      </div>
                      <div className={styles.time_event}>
                        <Link to={`/events/${id}`}>{title}</Link>
                        <div className={styles.time}>
                          <FcAlarmClock size={20} />
                          <span>{`${startTime} - ${endTime}`}</span>
                          <ImLocation size={20} style={{ color: "red" }} />
                        </div>
                      </div>
                    </li>
                  ) : (
                    ""
                  )
              )
              // .slice(4)
            }
          </ul>
        )}
      </div>
    </>
  );
};

export default Events;
