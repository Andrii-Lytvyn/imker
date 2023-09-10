import { useAppDispatch } from "../../../hooks/dispatch.selector";
import AddNewMember from "./AddNewMember";
import AllMembers from "./AllMembersAdmin";
import EditMemberAdmin from "./EditMemberAdmin";
import AboutUsAdmin from "./AboutUsAdmin"
import styles from "../EventsAdmin/EventNav.module.css";
import { Container } from "react-bootstrap";
import { aboutUsAction, statusesAbUs } from "../../../redux/aboutUsStore/AboutUsSlice";
import { useAboutUsSelector } from "../../../redux/aboutUsStore/aboutUsSelector";

const AboutUsNav = () => {
  const dispatch = useAppDispatch();
  const { aboutUsStatus } = useAboutUsSelector();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.btn_container}>
          <button
            type="button"
            onClick={() => dispatch(aboutUsAction(statusesAbUs.allMembers))}
            className={
              aboutUsStatus === statusesAbUs.allMembers
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Alle Mitglieder
          </button>

          <button
            type="button"
            onClick={() => dispatch(aboutUsAction(statusesAbUs.addMember))}
            className={
              aboutUsStatus === statusesAbUs.addMember
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Mitglied hinzufügen
          </button>

          <button
            type="button"
            disabled={aboutUsStatus !== statusesAbUs.editMember ? true : false}
            className={
              aboutUsStatus === statusesAbUs.editMember
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Mitglied bearbeiten
          </button>

          <button
            type="button"
            onClick={() => dispatch(aboutUsAction(statusesAbUs.editAboutUs))}
            className={
              aboutUsStatus === statusesAbUs.editAboutUs
                ? `${styles.btn_nav}`
                : `${styles.btn_nav} ${styles.btn_nav_not_active}`
            }
          >
            Seite bearbeiten Über uns
          </button>
        </div>

        <Container>
          {aboutUsStatus === statusesAbUs.allMembers ? <AllMembers /> : null}
          {aboutUsStatus === statusesAbUs.addMember ? <AddNewMember /> : null}
          {aboutUsStatus === statusesAbUs.editMember ? <EditMemberAdmin /> : null}
          {aboutUsStatus === statusesAbUs.editAboutUs ? <AboutUsAdmin /> : null}
        </Container>
      </div>
    </>
  );
};

export default AboutUsNav;
