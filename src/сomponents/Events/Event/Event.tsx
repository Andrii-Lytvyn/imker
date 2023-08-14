import styles from "./Event.module.css";
import {Link, useParams} from "react-router-dom";
import { dataEventov } from "../eventObj";
import { BiTimeFive } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlinePlace } from "react-icons/md";
import { formatDate } from "../helpers/formattedDate";
import {Container, Nav} from "react-bootstrap";
import {FaHome} from "react-icons/fa";

const Event = (): JSX.Element => {
  const { id } = useParams();
  const event = dataEventov.find((item) => item.id === id);

  return (
      <>
      <Container>
        <div className={styles.breadcrumbs}>
          <Nav>
            <Link to="/"> <FaHome /></Link>
          </Nav>
          <span> | </span>
          <Nav>
          <Link to="/events">VERANSTALTUNGEN</Link>
          </Nav>
          <span> | </span>
          {event?.name} - ОБУДИТЬ НЕОБХОДИМОСТЬ!
        </div>
          <h2>{event?.name}</h2>
        <hr />
          <div className={styles.evt_container}>
            <div className={styles.container}>
              <img
                className={styles.img_container}
                src={`${event?.photo}`}
                alt={event?.name}
              />
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
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
                pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab
                laudantium accusamus commodi ducimus nisi esse repellendus ratione
                molestias sit magni soluta perferendis vero pariatur. Lorem ipsum
                dolor sit, amet consectetur adipisicing elit. Distinctio
                perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
                accusamus commodi ducimus nisi esse repellendus ratione molestias
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
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
                pariatur.
              </p>
              <div className={styles.event_description}>
                <p>Kontakt: <span>Claudia Jütte</span></p>
                <p>Tel: <span>0160-235-65-91</span></p>
              </div>
            </div>
            <div className={styles.item_container}>
              <h6 className={styles.title_event}>Veranstaltungsdetails:</h6>
              <ul>
                {[
                  {
                    title: "Date",
                    icon: <BsCalendar2Week />,
                    content: formatDate(event?.date),
                  },
                  {
                    title: "Time",
                    icon: <BiTimeFive />,
                    content: `${event?.start} - ${event?.end}`,
                  },
                  {
                    title: "Place",
                    icon: <MdOutlinePlace />,
                    content: event?.address,
                  },
                  {
                    title: "Map",
                    mapSrc:
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9745.415657533345!2d13.489924931312242!3d52.36400236607848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a846d3cf283051%3A0x9014409747516a08!2z0JDRjdGA0L7Qv9C-0YDRgiDQkdC10YDQu9C40L0g0JHRgNCw0L3QtNC10L3QsdGD0YDQsyDQmNC90YLQtdGA0L3QsNGG0LjQvtC90LDQu9GM!5e0!3m2!1sru!2sde!4v1691266901739!5m2!1sru!2sde",
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
