import styles from "./Event.module.css";
import { Link, useParams } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { formatDate } from "../helpers/formattedDate";
import { Container, Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import { eventData } from "../helpers/eventData";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import { IEvents } from "../interface/IEventsData";

const Event = (): JSX.Element => {
  const { id } = useParams();
  const { events } = useEventsSelector();
  const [oneEvent, setOneEvent] = useState<IEvents | undefined>(eventData);

  useEffect(() => {
    const requestEvent = events.find((event) => event.id === id);
    // console.log("🚀  requestEvent:", requestEvent);
    setOneEvent(requestEvent);
  }, [events, id]);

  return (
    <>
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
          {oneEvent?.title} - ОБУДИТЬ НЕОБХОДИМОСТЬ!
        </div>
        <h2>{oneEvent?.title}</h2>
        <hr />
        <div className={styles.evt_container}>
          <div className={styles.container}>
            <img
              className={styles.img_container}
              src={`${oneEvent?.photo}`}
              alt={oneEvent?.title}
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab
              laudantium accusamus commodi ducimus nisi esse repellendus ratione
              molestias sit magni soluta perferendis vero pariatur. Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Distinctio
              perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
              accusamus commodi ducimus nisi esse repellendus ratione molestias
              sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Distinctio perspiciatis
              laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi
              ducimus nisi esse repellendus ratione molestias sit magni soluta
              perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum,
              dolorum ab laudantium accusamus commodi ducimus nisi esse
              repellendus ratione molestias sit magni soluta perferendis vero
              pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab
              laudantium accusamus commodi ducimus nisi esse repellendus ratione
              molestias
            </p>
            <div className={styles.event_description}>
              <p>
                Kontakt: <span>{oneEvent?.author}</span>
              </p>
              <p>
                Tel: <span>0160-235-65-91</span>
              </p>
            </div>
          </div>
          <div className={styles.item_container}>
            <h6 className={styles.title_event}>Veranstaltungsdetails:</h6>
            <ul>
              {[
                {
                  title: "Date",
                  icon: <BsCalendar2Week />,
                  content: `${formatDate(oneEvent?.date)?.day} ${
                    formatDate(oneEvent?.date)?.month
                  } ${formatDate(oneEvent?.date)?.year}`,
                },
                {
                  title: "Time",
                  icon: <BiTimeFive />,
                  content: `${oneEvent?.startTime} - ${oneEvent?.endTime}`,
                },
                {
                  title: "Place",
                  icon: <MdOutlinePlace />,
                  content: oneEvent?.address,
                },
                {
                  title: "Map",
                  mapSrc: oneEvent?.location,
                },
              ].map((item, index) => (
                <li key={index} className={styles.item}>
                  <p className={styles.title}>{item.title} :</p>
                  {item.icon && (
                    <span className={styles.icon} style={{ color: "#c74817" }}>
                      {item.icon} {item.content}
                    </span>
                  )}
                  {item.mapSrc && (
                    <div className={styles.map}>
                      <Nav>
                        <Link to={item.mapSrc}>Проверить ссылку</Link>
                      </Nav>
                      <iframe
                        src={item.mapSrc}
                        className={styles.map}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Event;
