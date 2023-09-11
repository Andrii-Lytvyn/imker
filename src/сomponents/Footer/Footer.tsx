import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { SlEnvolope, SlHome, SlPhone } from "react-icons/sl";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { currentDate, formatDate } from "../Events/helpers/formattedDate";
import { EVENT_STATUS, IEvent } from "../Events/interface/IEventsData";
import { eventData } from "../Events/helpers/eventData";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IAddress, initIAddress } from "../ContactUs/interfaces/IAddress";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { getEvents } from "../../redux/eventsStore/eventsSlice";
import { getAllEventsFooter } from "../../redux/eventsStore/eventsOperation";
import {
  navStatus,
  setLinkPage,
} from "../../redux/navigatinOnPage/navigatinOnPageSlice";

export default function Footer(): JSX.Element {
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [{ address, phone: phoneAddr, email: emailAddr }, setAddress] =
    useState<IAddress>(initIAddress);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const requestEvent = await getAllEventsFooter();
        if (requestEvent.events === undefined) {
          setEvents([eventData]);
        } else {
          dispatch(getEvents(requestEvent.events));
          setEvents(requestEvent.events);
        }
      } catch (error) {
        // console.log("🚀  error:", error);
      }

      try {
        const response = await axios.get(`/api/address`);
        const getAddress = response.data;
        setAddress(getAddress);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };
    getAllEvents();
  }, [dispatch]);
  const futureEventFiltered = events
    .filter(({ dateStart }) => dateStart > currentDate())
    .sort((a, b) => {
      const dateA = new Date(a.dateStart).getTime();
      const dateB = new Date(b.dateStart).getTime();
      return dateA - dateB;
    });

  return (
    <>
      {events.length !== 0 ? (
        <div className={styles.footer + " animate__animated animate__fadeInUpBig"}>
          <Container className="d-flex justify-content-between pt-3">
            {/*Contacts*/}
            <Card className={styles.my_card}>
              <Card.Body>
                <div className="d-flex flex-column">
                  <h3 className={styles.card_title}>Kontakte</h3>
                  <div className="d-flex flex-row mb-2">
                    <SlHome className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      Adresse: <Link to="/contactUs">{address}</Link>
                    </p>
                  </div>
                  <div className="d-flex flex-row mb-2">
                    <SlPhone className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      Phone:<a href={"tel: " + phoneAddr}> {phoneAddr}</a>
                    </p>
                  </div>
                  <div className="d-flex flex-row">
                    <SlEnvolope className={styles.icons} />
                    <p className={styles.footer_contact_text}>
                      E-mail: <a href={"mailto: " + emailAddr}>{emailAddr}</a>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/*Events*/}
            <Card className={styles.my_card}>
              <Card.Body>
                <div>
                  <h3 className={styles.card_title}>VERANSTALTUNGEN</h3>
                  <div>
                    <ul>
                      {futureEventFiltered
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
                        .slice(0, 2)}
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
                    <Link
                      className={styles.about_links}
                      to="/posts"
                      onClick={() => dispatch(navStatus(setLinkPage.posts))}
                    >
                      BLOG
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link
                      className={styles.about_links}
                      to="/events"
                      onClick={() => dispatch(navStatus(setLinkPage.events))}
                    >
                      VERANSTALTUNGEN
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link
                      className={styles.about_links}
                      to="/aboutUs"
                      onClick={() => dispatch(navStatus(setLinkPage.aboutUs))}
                    >
                      Mitglieder der Gemeinschaft
                    </Link>
                  </p>
                  <p className={styles.about_links}>
                    <Link
                      className={styles.about_links}
                      to="/gallery"
                      onClick={() => dispatch(navStatus(setLinkPage.gallery))}
                    >
                      GALERIE
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Container>
          <Container>
            <div className={styles.social}>
              <a href="#">
                <FaFacebook className={styles.social_icons} />
              </a>
              <a href="#">
                <FaInstagram className={styles.social_icons} />
              </a>
              <a href="#">
                <FaTwitter className={styles.social_icons} />
              </a>
            </div>
            <div className={styles.footer_logo_bottom}></div>
          </Container>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
