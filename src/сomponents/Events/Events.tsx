import styles from "./Events.module.css";
import { currentDate, formatDate } from "./helpers/formattedDate";
import { FcAlarmClock } from "react-icons/fc";
import { ImLocation } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";
// import Loader from "../Loader/Loader";
import { useEventsSelector } from "../../redux/eventsStore/eventsSelector";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { getEvents, getOneEvent } from "../../redux/eventsStore/eventsSlice";
import { EVENT_STATUS } from "./interface/IEventsData";
// import PostsPanel from "../Posts/PostsPanel/PostsPanel";
import linkToServer from "../globalLinkToServer";
import { Pagination } from "@mui/material";
import LoaderStart from "../Loader/LoaderStart";

// Получение  всех Events
const getAllEvents = async (page: number) => {
  try {
    //для Бека
    const { data } = await axios.get(
      `${linkToServer}/api/events?orderBy=dateStart&desc=false&pageSize=3&page=${page}`
    );

    console.log("🚀  data:", data);

    return data;
  } catch (error) {
    toast.error(`Ошибка сервера getAllEvents ${error}`);
  }
};

const Events = (): JSX.Element => {
  const { events } = useEventsSelector();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  useEffect(() => {
    const getEvt = async () => {
      try {
        const requestEvent = await getAllEvents(Number(page) - 1);
        setCount(requestEvent.count);
        dispatch(getEvents(requestEvent.events));
      } catch (error) {
        console.log("🚀  error:", error);
      }
    };
    getEvt();
  }, [dispatch, page]);

  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return (
    <>
      {events.length === 0 ? (
        <div className={styles.event_loader}>
          <LoaderStart />
        </div>
      ) : (
        <>
          {/* <PostsPanel /> */}
          <h2>Our Events</h2>
          <div className={styles.cont}>
            <div>
              <ul className={styles.event_list}>
                {events.map(
                  ({ title, idEvent, dateStart, startTime, endTime, status }) =>
                    dateStart > currentDate() &&
                    status === EVENT_STATUS.EXPECTED ? (
                      <li key={`${idEvent}`} className={styles.list}>
                        <div className={styles.day}>
                          <span>{formatDate(dateStart)?.day}</span>
                          <h4>{formatDate(dateStart)?.month}</h4>
                        </div>
                        <div className={styles.time_event}>
                          <Link
                            to={`/events/${idEvent}`}
                            onClick={() => {
                              dispatch(getOneEvent(idEvent));
                            }}
                          >
                            {title}
                          </Link>

                          <div className={styles.time}>
                            <FcAlarmClock size={20} />
                            <span>{`${startTime} - ${endTime}`}</span>
                            <ImLocation size={20} style={{ color: "red" }} />
                          </div>
                        </div>
                      </li>
                    ) : (
                      ""
                    )
                )}
              </ul>
              <Pagination
                count={count !== null ? Math.ceil(count / 3) : 0}
                page={Number(page)}
                size="large"
                onChange={getLinkParams}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Events;
