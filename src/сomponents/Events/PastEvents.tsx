import { Pagination } from "@mui/material";
import styles from "./Events.module.css";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";
import { currentDate, formatDate } from "./helpers/formattedDate";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsCalendar2Week } from "react-icons/bs";

const PastEvents = (): JSX.Element => {
  const { events } = useEventsSelector();
  const [page, setPage] = useState(1);
  const quantityOnPage = 5;
  const startIndex = (Number(page) - 1) * quantityOnPage;

  const pastEventFiltered = events.filter(
    ({ dateStart }) => dateStart < currentDate()
  );

  const handlePastEvent = (page: number) => {
    console.log("🚀  pastEvt:", page);
    setPage(page);
  };
  return (
    <div className={styles.post_right_side}>
      <h2>Vergangene Ereignisse</h2>
      <hr className={styles.post_hr} />
      {pastEventFiltered
        .map(({ dateStart, idEvent, shortDescription }) =>
          dateStart < currentDate() ? (
            <div key={`${idEvent}`} className="mb-2">
              <p className={styles.post_event_date}>
                <BsCalendar2Week />{" "}
                {`${formatDate(dateStart)?.day} ${
                  formatDate(dateStart)?.month
                }, ${formatDate(dateStart)?.year}`}
              </p>
              <h4 className={styles.post_event_h4}>
                <Link to={`/events/${idEvent}`}>{shortDescription}</Link>
              </h4>
              <p className={styles.post_event_text}>
                {shortDescription.substring(0, 200)}...
              </p>
              <hr className={styles.post_hr} />
            </div>
          ) : (
            ""
          )
        )
        .slice(startIndex, startIndex + quantityOnPage)}
      {/* ////////////////////////////////// */}
      {pastEventFiltered.length >= quantityOnPage + 1 ? (
        <Pagination
          className={styles.pagination_container}
          count={
            events !== null
              ? Math.ceil(pastEventFiltered.length / quantityOnPage)
              : 0
          }
          page={Number(page)}
          onChange={(_, page: number) => handlePastEvent(page)}
          size="large"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PastEvents;
