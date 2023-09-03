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

  const futureEventFiltered = events.filter(
    ({ dateStart }) => dateStart > currentDate()
  );

  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <>
      <div
        className={
          styles.post_bg + " d-flex align-items-center justify-content-center"
        }
      >
        <h2>UNSERE VERANSTALTUNGEN</h2>
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
                          <li key={`${idEvent}`} className={styles.events_list}>
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
                                <p className={styles.events_short_description}>
                                  {shortDescription}
                                </p>
                              </div>
                              <div
                                className={styles.events_times + " d-flex mt-4"}
                              >
                                <BsClock className={styles.events_time} />
                                <span>{`${startTime} - ${endTime}`}</span>
                              </div>
                              <div className={styles.events_times + " d-flex"}>
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
                        ? Math.ceil(futureEventFiltered.length / quantityOnPage)
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
              {/* <div className={styles.post_right_side}>
                <h2>Vergangene Ereignisse</h2>
                <hr className={styles.post_hr} />
                {events.map(({ dateStart, idEvent, shortDescription }) =>
                  dateStart < currentDate() ? (
                    <div key={`${idEvent}`} className="mb-2">
                      <p className={styles.post_event_date}>
                        <BsCalendar2Week />{" "}
                        {`${formatDate(dateStart)?.day} ${
                          formatDate(dateStart)?.month
                        }, ${formatDate(dateStart)?.year}`}
                      </p>
                      <h4 className={styles.post_event_h4}>
                        <Link to={`/events/${idEvent}`}>
                          {shortDescription}
                        </Link>
                      </h4>
                      <p className={styles.post_event_text}>
                        {shortDescription.substring(0, 200)}...
                      </p>
                      <hr className={styles.post_hr} />
                    </div>
                  ) : (
                    "".slice(startIndexPastEvent, endIndexPastEvent)
                  )
                )}
                {pastEvt > 2 ? (
                  <Pagination
                    className={styles.pagination_container}
                    count={
                      events !== null ? Math.ceil(pastEvt / quantityOnPage) : 0
                    }
                    page={Number(pastEvent)}
                    onChange={(_, pastEvent: number) =>
                      handlePastEvent(pastEvent)
                    }
                    size="large"
                  />
                ) : (
                  ""
                )}
              </div> */}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Events;
