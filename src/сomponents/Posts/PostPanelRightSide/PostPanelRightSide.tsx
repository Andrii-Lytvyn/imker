import styles from "../Posts.module.css";
import { BsCalendar2Week } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import { currentDate, formatDate } from "../../Events/helpers/formattedDate";
import {
  navStatus,
  setLinkPage,
} from "../../../redux/navigatinOnPage/navigatinOnPageSlice";
import { useAppDispatch } from "../../../hooks/dispatch.selector";

const PostPanelRightSide = () => {
  const dispatch = useAppDispatch();
  const { events } = useEventsSelector();
  const quantityOnPage = 5;
  const futureEventFiltered = events
    .filter(({ dateStart }) => dateStart > currentDate())
    .sort((a, b) => {
      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      return dateA - dateB;
    });

  return (
    <div className={styles.post_right_side}>
      <h2>VERANSTALTUNGEN</h2>
      <hr className={styles.post_hr} />
      {futureEventFiltered
        .map(
          ({
            title,
            idEvent,
            dateStart,
            dateEnd,
            startTime,
            shortDescription,
          }) => (
            <div key={idEvent} className="mb-2">
              <p className={styles.post_event_date}>
                <BsCalendar2Week />
                {`${formatDate(dateStart)?.day} ${
                  formatDate(dateStart)?.month
                }, ${formatDate(dateStart)?.year} - ${
                  formatDate(dateEnd)?.day
                } ${formatDate(dateEnd)?.month}, ${formatDate(dateEnd)?.year}`}
              </p>
              <p className={styles.post_event_time}>
                <BiTimeFive /> {startTime}
              </p>
              <h4 className={styles.post_event_h4}>
                <Link
                  to={`/events/${idEvent}`}
                  onClick={() => dispatch(navStatus(setLinkPage.events))}
                >
                  {title}
                </Link>
              </h4>
              <p className={styles.post_event_text}>
                {shortDescription.substring(0, 100)}...
              </p>
              <hr className={styles.post_hr} />
            </div>
          )
        )
        .slice(0, quantityOnPage)}
    </div>
  );
};

export default PostPanelRightSide;
