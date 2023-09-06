import axios from "axios";
import styles from "./Event.module.css";
import { srcLinkFromIframe } from "./helpers/srcMapValue";
import { Link, useParams } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { formatDate } from "../helpers/formattedDate";
import { Container, Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IEvent } from "../interface/IEventsData";
import LoaderStart from "../../Loader/LoaderStart";
import UsersOnEvent from "../../UsersOnEvent/UsersOnEvent";
import CommentPanel from "../../CommentsPanel/CommentsPanel";
import { Divider } from "antd";

const getEvent = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/events/${id}`);
    return data;
  } catch (error) {
    console.log("🚀  getEvent:", error);
  }
};

const Event = (): JSX.Element => {
  const { id } = useParams();
  const [event, setEvent] = useState<IEvent | undefined>();

  useEffect(() => {
    const getEvt = async () => {
      if (id !== undefined) {
        const dataEvent = await getEvent(id);
        setEvent(dataEvent);
      }
    };
    getEvt();
  }, [id]);

  return (
    <>
      <div className={styles.event_main}>
        {event === undefined ? (
          <LoaderStart />
        ) : (
          <Container>
            <div className={styles.breadcrumbs}>
              <Nav>
                <Link to="/">
                  {" "}
                  <FaHome />
                </Link>
              </Nav>
              <span> | </span>
              <Nav>
                <Link to="/events">VERANSTALTUNGEN</Link>
              </Nav>
              <span> | </span>
              {event?.title}
            </div>
            <h2>{event?.title}</h2>
            <hr />
            <div className={styles.evt_container}>
              <div className={styles.container}>
                <img
                  className={styles.img_container}
                  src={`/api/files/${event?.photo}`}
                  alt={event?.title}
                />
                <p>{event?.description}</p>
                <div className={styles.event_description}>
                  <p>
                    Kontakt: <span>{event?.author}</span>
                  </p>
                </div>

                <CommentPanel location={{ entity: "event", entityId: id }}/>
              </div>
              <div className={styles.item_container}>
                <h6 className={styles.title_event}>Veranstaltungsdetails:</h6>
                <ul>
                  {[
                    {
                      title: "Date",
                      icon: <BsCalendar2Week />,
                      content: `${formatDate(event?.dateStart)?.day} ${
                        formatDate(event?.dateStart)?.month
                      } ${formatDate(event?.dateStart)?.year} - ${
                        formatDate(event?.dateEnd)?.day
                      } ${formatDate(event?.dateEnd)?.month} ${
                        formatDate(event?.dateEnd)?.year
                      }`,
                    },
                    {
                      title: "Time",
                      icon: <BiTimeFive />,
                      content: `${event?.startTime} - ${event?.endTime}`,
                    },
                    {
                      title: "Place",
                      icon: <MdOutlinePlace />,
                      content: event?.address,
                    },
                    {
                      title: "Map",
                      mapSrc: event?.location,
                    },
                  ].map((item, index) => (
                    <li key={index} className={styles.item}>
                      <p className={styles.title}>{item.title} :</p>
                      {item.icon && (
                        <span
                          className={styles.icon}
                          style={{ color: "#c74817" }}
                        >
                          {item.icon} {item.content}
                        </span>
                      )}
                      {item.mapSrc && (
                        <div className={styles.map}>
                          <iframe
                            src={srcLinkFromIframe(item.mapSrc)}
                            className={styles.map}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                {event && event.dateEnd && (
                  <UsersOnEvent location={{ eventId: id, dateEnd: event.dateEnd }} />
                )}

              </div>
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

export default Event;
