import css from "./Events.module.css";
import { useEffect, useState } from "react";
import { currentDate, formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import { dataEventov } from "./eventObj";
import { IEvents } from "./interface/IEventsData";

const Events = (): JSX.Element => {
  const [events, setEvents] = useState<IEvents[]>(dataEventov);

  useEffect(() => {
    try {
      const filteredDataEvents = dataEventov.filter(
        ({ date }) => date < currentDate()
      );
      setEvents(filteredDataEvents);
      console.log("🚀  filteredDataEvents:", filteredDataEvents);
    } catch (error) {
      console.log("🚀  error:", error);
    }
  }, []);

  return (
    <>
      <h2> Our Events</h2>
      <div className={css.cont}>
        <ul className={css.event_list}>
          {
            events.map(({ name, id, date, start, end }) => (
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
            ))
            // .slice(4)
          }
        </ul>
      </div>
    </>
  );
};

export default Events;
