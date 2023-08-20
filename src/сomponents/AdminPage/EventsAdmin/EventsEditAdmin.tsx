import styles from "./EventsAdmin.module.css";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { getOneEvent } from "../../../redux/eventsStore/eventsSlice";

const EventsEditAdmin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { events } = useEventsSelector();

  return (
    <div>
      <ul className={styles.edit}>
        {events.map(({ name, id, date, description }) => (
          <li key={id}>
            <div className={styles.edit_info}>
              <span>{name}</span>
              <span>{date}</span>
              <p>{description.slice(0, 20)}...</p>

              <Link
                to={`/eventsadm-edit/${id}`}
                onClick={() => dispatch(getOneEvent(id))}
              >
                <button type="button">Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsEditAdmin;
