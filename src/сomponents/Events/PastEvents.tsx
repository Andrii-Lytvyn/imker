// import { Pagination } from "@mui/material";
import styles from "./Events.module.css";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";
import { currentDate, formatDate } from "./helpers/formattedDate";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsCalendar2Week } from "react-icons/bs";
import GallerySwiper from "../GallerySwiper/GallerySwiper";
import { Container } from "react-bootstrap";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

const PastEvents = (): JSX.Element => {
  const { events } = useEventsSelector();
  const [page, setPage] = useState(1);

  const quantityOnPage = 3;
  const startIndex = (Number(page) - 1) * quantityOnPage;

  const pastEventFiltered = events
    .filter(({ dateStart }) => dateStart < currentDate())
    .sort((a, b) => {
      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      return dateB - dateA;
    });

  const handlePagination = (newPage: number) => {
    const maxPage = Math.ceil(pastEventFiltered.length / quantityOnPage);
    if (newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
    }
  };
  const paginationCount = Math.ceil(pastEventFiltered.length / quantityOnPage);
  return (
    <Container>
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
        {pastEventFiltered.length >= quantityOnPage + 1 ? (
          <div
            className={`${styles.pagination_container_past} ${styles.past_pagination}`}
          >
            <div className={styles.btn_nav_past_evt_cont}>
              <button
                className={page === 1 ? styles.grey : styles.btn_nav_past_evt}
                type="button"
                onClick={() => handlePagination(page - 1)}
                disabled={page === 1 ? true : false}
              >
                <IoIosArrowDropleftCircle size={30} />
              </button>

              <button
                className={
                  page === paginationCount
                    ? styles.grey
                    : styles.btn_nav_past_evt
                }
                type="button"
                onClick={() => handlePagination(page + 1)}
                disabled={page === paginationCount ? true : false}
              >
                <IoIosArrowDroprightCircle size={30} />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <GallerySwiper />
      </div>
    </Container>
  );
};

export default PastEvents;
