import css from "./EventsAdmin.module.css";
import { dataEventov } from "../../Events/eventObj";

const EventsEditAdmin = (): JSX.Element => {
  return (
    <div>
      <ul className={css.edit}>
        {dataEventov.map(({ name, id, date, description }) => (
          <li key={id}>
            <div className={css.edit_info}>
              <span>{name}</span>
              <span>{date}</span>
              <p>{description.slice(0, 20)}...</p>
              <button type="button">Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsEditAdmin;
