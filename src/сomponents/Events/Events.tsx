import styles from "./Events.module.css";
import { currentDate, formatDate } from "./helpers/formattedDate";
import { Link, useSearchParams } from "react-router-dom";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";
import { ChangeEvent } from "react";
import { EVENT_STATUS } from "./interface/IEventsData";
// import PostsPanel from "../Posts/PostsPanel/PostsPanel";
import { Pagination } from "@mui/material";
import LoaderStart from "../Loader/LoaderStart";
import { Container } from "react-bootstrap";
import { BsClock } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import PastEvents from "./PastEvents";

const Events = (): JSX.Element => {
  const { events } = useEventsSelector();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const quantityOnPage = 5;
  const startIndex = (Number(page) - 1) * quantityOnPage;

  const futureEventFiltered = events
    .filter(({ dateStart }) => dateStart > currentDate())
    .sort((a, b) => {
      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      return dateA - dateB;
    });

  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <>
      <div className={styles.events_main}>
        <div
          className={
            styles.post_bg + " d-flex align-items-center justify-content-center"
          }
        >
          <h2 className={styles.main_title}>UNSERE VERANSTALTUNGEN</h2>
        </div>
        <Container>
          {events.length === 0 ? (
            <div className={styles.event_loader}>
              <LoaderStart />
            </div>
          ) : (
            <>
              {/* <PostsPanel /> */}
              <div className={styles.post_container}>
                <div>
                  <ul className={styles.event_list}>
                    {futureEventFiltered
                      .map(
                        ({
                          title,
                          idEvent,
                          dateStart,
                          startTime,
                          endTime,
                          status,
                          shortDescription,
                          address,
                        }) =>
                          status === EVENT_STATUS.EXPECTED ? (
                            <li
                              key={`${idEvent}`}
                              className={styles.events_list}
                            >
                              <div>
                                <div className={styles.events_date}>
                                  <h5>{formatDate(dateStart)?.day}</h5>
                                  <p>{formatDate(dateStart)?.month}</p>
                                </div>
                              </div>
                              <div className={styles.events_main_list}>
                                <Link to={`/events/${idEvent}`}>
                                  <h4>{title}</h4>
                                </Link>
                                <div>
                                  <p
                                    className={styles.events_short_description}
                                  >
                                    {shortDescription}
                                  </p>
                                </div>
                                <div
                                  className={
                                    styles.events_times + " d-flex mt-4"
                                  }
                                >
                                  <BsClock className={styles.events_time} />
                                  <span>{`${startTime} - ${endTime}`}</span>
                                </div>
                                <div
                                  className={styles.events_times + " d-flex"}
                                >
                                  <IoLocationOutline
                                    className={styles.events_time}
                                  />
                                  <span>
                                    <Link to={"/"}>{address}</Link>
                                  </span>
                                </div>
                                <hr />
                              </div>
                            </li>
                          ) : (
                            ""
                          )
                      )
                      .slice(startIndex, startIndex + quantityOnPage)}
                  </ul>
                  {futureEventFiltered.length >= quantityOnPage + 1 ? (
                    <Pagination
                      className={styles.pagination_container}
                      count={
                        events !== null
                          ? Math.ceil(
                              futureEventFiltered.length / quantityOnPage
                            )
                          : 0
                      }
                      page={Number(page)}
                      size="large"
                      onChange={getLinkParams}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <PastEvents />
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Events;
