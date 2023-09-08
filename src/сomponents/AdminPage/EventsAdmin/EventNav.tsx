import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import AddEventAdmin from "./AddEventAdmin";
import {
  eventsStatus,
  statusEvt,
} from "../../../redux/eventsStore/eventsSlice";
import AllEvents from "./AllEventsAdmin";
import EditEventAdmin from "./EditEventAdmin";
import styles from "./EventNav.module.css";
import { Container } from "react-bootstrap";

const EventNav = () => {
  const dispatch = useAppDispatch();
  const { eventStatus } = useEventsSelector();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btn_container}>
          <button
            type="button"
            onClick={() => dispatch(eventsStatus(statusEvt.allEvnt))}
            className={
              eventStatus === statusEvt.allEvnt
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            All Events
          </button>
          <button
            type="button"
            onClick={() => dispatch(eventsStatus(statusEvt.addEvnt))}
            className={
              eventStatus === statusEvt.addEvnt
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Add Event
          </button>
          <button
            type="button"
            disabled={eventStatus !== statusEvt.editEvnt ? true : false}
            className={
              eventStatus === statusEvt.editEvnt
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Edit Event
          </button>
        </div>
          <hr />

        <Container>
          {eventStatus === statusEvt.allEvnt ? <AllEvents /> : null}
          {eventStatus === statusEvt.addEvnt ? <AddEventAdmin /> : null}
          {eventStatus === statusEvt.editEvnt ? <EditEventAdmin /> : null}
        </Container>
      </div>
    </>
  );
};

export default EventNav;
