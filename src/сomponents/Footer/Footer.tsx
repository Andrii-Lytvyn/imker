import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { SlEnvolope, SlHome, SlPhone } from "react-icons/sl";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { currentDate, formatDate } from "../Events/helpers/formattedDate";
import { EVENT_STATUS, IEvent } from "../Events/interface/IEventsData";
import linkToServer from "../globalLinkToServer";
import { eventData } from "../Events/helpers/eventData";
import { FaRegCalendarAlt } from "react-icons/fa";

// Получение  всех Events
const getAllEventsFooter = async () => {
  try {
    //для Бека
    const { data } = await axios.get(
      `${linkToServer}/api/events?orderBy=dateStart&desc=false&pageSize=4&page=0`
    );
    return data.events;
  } catch (error) {
    toast.error(`Ошибка сервера getAllEventsFooter ${error}`);
  }
};

export default function Footer(): JSX.Element {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const requestEvent = await getAllEventsFooter();
        if (requestEvent === undefined) {
          setEvents([eventData]);
        } else {
          setEvents(requestEvent);
        }
      } catch (error) {
        // console.log("🚀  error:", error);
      }
    };
    getEvents();
  }, []);

  return (
    <>
      {events.length !== 0 ? (
        <div className={styles.footer}>
          {/*        <div>
          <img className={styles.logo_footer} src="img/logo.png" />
        </div>*/}
          <Container className="d-flex justify-content-between pt-3">
            {/*Contacts*/}
            <Card className={styles.my_card}>
              <Card.Body>
                <div className="d-flex flex-column">
                  <h3 className={styles.card_title}>Kontakte</h3>
                  <div className="d-flex flex-row mb-2">
                    <SlHome className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      Adresse:
                      <a
                        target="_blank"
                        href="https://goo.gl/maps/SfWkxnTKU4PFnHZu8"
                      >
                        Walsroder Straße, 3 Eickeloh, 29693
                      </a>
                    </p>
                  </div>
                  <div className="d-flex flex-row mb-2">
                    <SlPhone className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      Phone:<a href="tel:05162901266"> 0516-290-12-66</a>
                    </p>
                  </div>
                  <div className="d-flex flex-row">
                    <SlEnvolope className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      E-mail:
                      <a href="mailto: Imkerverein-Ahlden@t-online.de">
                        Imkerverein-Ahlden@t-online.de
                      </a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/*Events*/}
            <Card className={styles.my_card}>
              <Card.Body>
                <div>
                  <h3 className={styles.card_title}>Nachrichten</h3>
                  <div>
                    <ul>
                      {events
                        .map(
                          ({ idEvent, dateStart, title, startTime, status }) =>
                            dateStart > currentDate() &&
                            status === EVENT_STATUS.EXPECTED ? (
                              <li key={`${idEvent}`}>
                                <div className="d-flex">
                                  <p>
                                    {" "}
                                    <FaRegCalendarAlt
                                      className={styles.icons}
                                    />
                                  </p>
                                  <p className={styles.footer_data}>
                                    {`${formatDate(dateStart)?.day} ${
                                      formatDate(dateStart)?.month
                                    }, 
                              ${formatDate(dateStart)?.year}  ${startTime}`}
                                  </p>
                                </div>

                                <p className={styles.footer_name_event}>
                                  <Link to={`/events/${idEvent}`}>{title}</Link>
                                </p>
                                <hr />
                              </li>
                            ) : (
                              ""
                            )
                        )
                        .slice(0, 6)}
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/*About*/}
            <Card className={styles.my_card}>
              <Card.Body>
                <div>
                  <h3 className={styles.card_title}>Über uns</h3>
                  <p className={styles.about_links}>
                    <Link className={styles.about_links} to="/posts">
                      BLOG
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link className={styles.about_links} to="/events">
                      VERANSTALTUNGEN
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link className={styles.about_links} to="/aboutUs">
                      Mitglieder der Gemeinschaft
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link className={styles.about_links} to="/gallery">
                      GALERIE
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Container>
          <Container>
            <div className={styles.social}>
              <FaFacebook className={styles.social_icons} />
              <FaInstagram className={styles.social_icons} />
              <FaTwitter className={styles.social_icons} />
            </div>
            <div>
              <img src="/logo.png" height="30px" />
            </div>
          </Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
