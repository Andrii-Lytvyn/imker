import styles from "./Event.module.css";
import { srcLinkFromIframe } from "./helpers/srcMapValue";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { formatDate } from "../helpers/formattedDate";
import { Container, Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useEffect } from "react";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import linkToServer from "../../globalLinkToServer";

const Event = (): JSX.Element => {
  const { event_edit } = useEventsSelector();

  useEffect(() => {}, [event_edit]);

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
          {event_edit?.title}
        </div>
        <h2>{event_edit?.title}</h2>
        <hr />
        <div className={styles.evt_container}>
          <div className={styles.container}>
            <img
              className={styles.img_container}
              src={`${linkToServer}/api/files/${event_edit?.photo}`}
              alt={event_edit?.title}
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
                Kontakt: <span>{event_edit?.author}</span>
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
                  content: `${formatDate(event_edit?.dateStart)?.day} ${
                    formatDate(event_edit?.dateStart)?.month
                  } ${formatDate(event_edit?.dateStart)?.year}`,
                },
                {
                  title: "Time",
                  icon: <BiTimeFive />,
                  content: `${event_edit?.startTime} - ${event_edit?.endTime}`,
                },
                {
                  title: "Place",
                  icon: <MdOutlinePlace />,
                  content: event_edit?.address,
                },
                {
                  title: "Map",
                  mapSrc: event_edit?.location,
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Event;
