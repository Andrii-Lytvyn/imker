import styles from "./OurMission.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCalendar2Week } from "react-icons/bs";
import PostsPanel from "../Posts/PostsPanel/PostsPanel";

export default function OurMission(): JSX.Element {
  return (
    <>
      <div className={styles.our_mission_main_container + " back-ground-1"}>
        <Container>
          <Row>
            <Col>
              <div className={styles.our_mission_left_container}>
                <div className={styles.our_mission_img}>
                  <img src="img/our_mission.jpg" />
                </div>
                <div className={styles.our_mission_texts}>
                  <div className={styles.our_mission_title}>
                    <p>UNSERE MISSION</p>
                  </div>
                  <div className={styles.our_mission_text}>
                    <p>
                      Die Bienen leben so, wie sie es von Natur aus tun würden,
                      und ihr Nutzen erreicht mehr Menschen. Unser Ziel ist es,
                      die Bienenpopulation von San Diego in der ganzen Stadt zu
                      erhöhen und gleichzeitig das Bewusstsein in der
                      Bevölkerung zu schärfen.
                      <br />
                      <br />
                      Wir hoffen, dass diese Bienenstöcke in den Hinterhöfen den
                      Dialog zwischen Nachbarn, Freunden, Familie und der
                      Gemeinschaft insgesamt über die enorme Bedeutung der
                      Bienen erleichtern werden.
                    </p>
                  </div>
                  <div className={styles.our_mission_signature}>
                    <img src="img/signature.png" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className={styles.post_title}>
                <h3>NACHRICHTEN</h3>
                <hr className={styles.post_hr} />
              </div>
              <PostsPanel />
              <div className={styles.post_more}>
                <Link to="/posts">
                  <p>Mehr nachrichten zeigen</p>
                </Link>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
