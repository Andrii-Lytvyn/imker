import { useAppDispatch } from "../../../hooks/dispatch.selector";
import TeamAddNewMember from "./TeamAddNewMember";
import AllMembers from "./TeamAdmin";
import TeamEditMemberAdmin from "./TeamEditMemberAdmin";
import AboutUsAdmin from "./AboutUsAdmin"
import styles from "../EventsAdmin/EventNav.module.css";
import { Container } from "react-bootstrap";
import { eventsStatus, statusEvt } from "../../../redux/aboutUsStore/AboutUsSlice";
import { useAboutUsSelector } from "../../../redux/aboutUsStore/aboutUsSelector";

const AboutUsNav = () => {
  const dispatch = useAppDispatch();
  const { eventStatus } = useAboutUsSelector();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btn_container}>
          <button
            type="button"
            onClick={() => dispatch(eventsStatus(statusEvt.allMembers))}
            className={
              eventStatus === statusEvt.allMembers
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Alle Mitglieder
          </button>

          <button
            type="button"
            onClick={() => dispatch(eventsStatus(statusEvt.addMember))}
            className={
              eventStatus === statusEvt.addMember
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Mitglied hinzufügen
          </button>

          <button
            type="button"
            disabled={eventStatus !== statusEvt.editMember ? true : false}
            className={
              eventStatus === statusEvt.editMember
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Mitglied bearbeiten
          </button>

          <button
            type="button"
            onClick={() => dispatch(eventsStatus(statusEvt.editAboutUs))}
            className={
              // styles.btn_nav
              eventStatus === statusEvt.editAboutUs
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Seite bearbeiten Über uns
          </button>
        </div>

        <Container>
          {eventStatus === statusEvt.allMembers ? <AllMembers /> : null}
          {eventStatus === statusEvt.addMember ? <TeamAddNewMember /> : null}
          {eventStatus === statusEvt.editMember ? <TeamEditMemberAdmin /> : null}
          {eventStatus === statusEvt.editAboutUs ? <AboutUsAdmin /> : null}
        </Container>
      </div>
    </>
  );
};

export default AboutUsNav;
