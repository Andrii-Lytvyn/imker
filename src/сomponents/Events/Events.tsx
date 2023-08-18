import css from "./Events.module.css";
import { useEffect, useState } from "react";
import { currentDate, formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
// import { dataEventov } from "./eventObj";
import { IEvents } from "./interface/IEventsData";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

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

const Events = (): JSX.Element => {
  const [events, setEvents] = useState<IEvents[]>([]);
  // const [currentData, setCurrentData] = useState("");

  // Старый вариант
  // useEffect(() => {
  //   try {
  //     const filteredDataEvents = dataEventov.filter(
  //       ({ date }) => date < currentDate()
  //     );
  //     setEvents(filteredDataEvents);
  //     console.log("🚀  filteredDataEvents:", filteredDataEvents);
  //   } catch (error) {
  //     console.log("🚀  error:", error);
  //   }
  // }, []);

  useEffect(() => {
    const getEvt = async () => {
      try {
        const requestEvent = await getAllEvents();

        console.log("🚀  requestEvent:", requestEvent);

        setEvents(requestEvent);
      } catch (error) {
        console.log("🚀  error:", error);
      }
    };
    getEvt();
  }, []);

  return (
    <>
      <h2> Our Events</h2>
      <div className={css.cont}>
        {events.length === 0 ? (
          <div className={css.event_loader}>
            <Loader />
          </div>
        ) : (
          <ul className={css.event_list}>
            {
              events.map(({ name, id, date, start, end }) =>
                date > currentDate() ? (
                  <li key={id} className={css.list}>
                    <div className={css.day}>
                      <span>{formattedDate(date).month}</span>
                      <h4>{formattedDate(date).day}</h4>
                    </div>
                    <div className={css.time_event}>
                      <Link to={`/events/${id}`}>{name}</Link>
                      <div className={css.time}>
                        <FcAlarmClock size={20} />
                        <span>{`${start} - ${end}`}</span>
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
