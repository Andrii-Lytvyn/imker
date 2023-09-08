import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { useEventsSelector } from "../../../redux/eventsStore/eventsSelector";
import TeamAddNewMember from "./TeamAddNewMember";
import {
  eventsStatus,
  statusEvt,
} from "../../../redux/eventsStore/eventsSlice";
import AllMembers from "./TeamAdmin";
import TeamEditMemberAdmin from "./TeamEditMemberAdmin";
import AboutUsAdmin from "./AboutUsAdmin"
import styles from "../EventsAdmin/EventNav.module.css";
import { Container } from "react-bootstrap";

const AboutUsNav = () => {
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
            All Members
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
            Add Member
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
            Edit Member
          </button>
          <button
            type="button"
            disabled={eventStatus !== statusEvt.editEvnt ? true : false}
            className={
              styles.btn_nav
              // eventStatus === statusEvt.editEvnt
              //   ? `${styles.btn_nav}`
              //   : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Edit About Us
          </button>
        </div>

        <Container>
          {eventStatus === statusEvt.allEvnt ? <AllMembers/> : null}
          {eventStatus === statusEvt.addEvnt ? <TeamAddNewMember /> : null}
          {eventStatus === statusEvt.editEvnt ? <TeamEditMemberAdmin /> : null}
          {eventStatus === statusEvt.editEvnt ? <AboutUsAdmin /> : null}
        </Container>
      </div>
    </>
  );
};

export default AboutUsNav;
