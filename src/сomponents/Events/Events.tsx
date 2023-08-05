import css from "./Events.module.css";
import { formattedDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link } from "react-router-dom";
import { dataEventov } from "./eventObj";

const Events = (): JSX.Element => {
  return (
    <>
      <h2> Our Events</h2>
      <div className={css.cont}>
        <ul className={css.event_list}>
          {dataEventov
            .map(({ name, id, date, start, end }) => (
              <li key={id} className={css.list}>
                <div className={css.day}>
                  <h4>{formattedDate(date).day}</h4>
                  <span>{formattedDate(date).month}</span>
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
            .slice(4)}
        </ul>
      </div>
    </>
  );
};

export default Events;
