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
import {Container} from "react-bootstrap";
import {BsCalendar2Week, BsClock} from "react-icons/bs";
import {BiTimeFive} from "react-icons/bi";
import {FaUserGraduate} from "react-icons/fa6";
import {IoLocationOutline} from "react-icons/io5";

// Получение  всех Events
const getAllEvents = async (page: number) => {
  try {
    //для Бека
    const { data } = await axios.get(
      `${linkToServer}/api/events?orderBy=dateStart&desc=false&pageSize=4&page=${page}`
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
      <div className={styles.post_bg + " d-flex align-items-center justify-content-center"}>
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
                {events.map(
                  ({ title, idEvent, dateStart, startTime, endTime, status, short_description, address }) =>
                    dateStart > currentDate() &&
                    status === EVENT_STATUS.EXPECTED ? (
                      <li key={`${idEvent}`} className={styles.events_list}>
                        <div>
                          <div className={styles.events_date}>
                            <h5>{formatDate(dateStart)?.day}</h5>
                            <p>{formatDate(dateStart)?.month}</p>
                          </div>
                        </div>
                        <div className={styles.events_main_list}>
                          <Link
                            to={`/events/${idEvent}`}
                            onClick={() => {
                              dispatch(getOneEvent(idEvent));
                            }}
                          >
                            <h4>{title}</h4>
                          </Link>
                          <div>

                            <p className={styles.events_short_description}>
                              {short_description}
                              Kommenden Monat wird eine faszinierende Veranstaltung rund um Honig und Bienenstöcke stattfinden. Kommenden Monat wird eine faszinierende Veranstaltung rund um Honig und Bienenstöcke stattfinden. Kommenden Monat wird eine faszinierende...
                            </p>
                          </div>
                          <div className={styles.events_times + " d-flex mt-4"} >
                            <BsClock className={styles.events_time}  />
                            <span>{`${startTime} - ${endTime}`}</span>
                          </div>
                          <div className={styles.events_times + " d-flex"} >
                            <IoLocationOutline className={styles.events_time} />
                            <span>
                                <Link to={"/"}>
                                    {address}
                                </Link>
                              </span>
                          </div>
                          <hr />
                        </div>
                      </li>
                    ) : (
                      ""
                    )
                )}
              </ul>
              <Pagination
                className={styles.pagination_container}
                count={count !== null ? Math.ceil(count / 3) : 0}
                page={Number(page)}
                size="large"
                onChange={getLinkParams}
              />
            </div>
            <div className={styles.post_right_side}>
              <h2>Unser Blog</h2>
              <hr className={styles.post_hr} />
              <div className="mb-2">
                <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
                <p className={styles.post_event_user}><FaUserGraduate /> Author name: <span>Dominic Andrews</span></p>
                <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
                <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
                <hr className={styles.post_hr} />
              </div>
              <div className="mb-2">
                <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
                <p className={styles.post_event_user}><FaUserGraduate /> Author name: <span>Dominic Andrews</span></p>
                <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
                <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
                <hr className={styles.post_hr} />
              </div>
              <div className="mb-2">
                <p className={styles.post_event_date}><BsCalendar2Week /> 15 November, 2023</p>
                <p className={styles.post_event_user}><FaUserGraduate /> Author name: <span>Dominic Andrews</span></p>
                <h4 className={styles.post_event_h4}><Link to={"/"} >SWEET HONEY PACKS FRESH RAW AND UNFILTERED</Link></h4>
                <p className={styles.post_event_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
                <hr className={styles.post_hr} />
              </div>
            </div>
          </div>

        </>
      )}
      </Container>
    </>
  );
};

export default Events;
