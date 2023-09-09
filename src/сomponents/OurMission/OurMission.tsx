import styles from "./OurMission.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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
                      Unsere Mission als engagierte Gemeinschaft von Imkern ist es, die Gesundheit und das Wohlbefinden der Bienenvölker zu fördern und gleichzeitig die wichtige Rolle dieser faszinierenden Insekten in unserer natürlichen Umwelt zu schützen. Wir sind leidenschaftlich daran interessiert, die Bienenpopulation zu erhalten und zu vermehren, um die Bestäubung von Pflanzen zu sichern und hochwertige Bienenprodukte zu gewinnen.
                      <br />
                      <br />
                      Wir setzen uns dafür ein, nachhaltige Praktiken in der Bienenhaltung zu fördern, die die Bedürfnisse der Bienen respektieren. Dies beinhaltet die Pflege gesunder Bienenstöcke, die Förderung von Blühflächen und die Schulung von Imkern in bewährten Verfahren. Unsere Mission ist es, das Bewusstsein für die Bedeutung der Bienen für die Lebensmittelproduktion und die Umwelt zu schärfen und die Zusammenarbeit zwischen Imkern und Landwirten zu stärken, um eine blühende Zukunft für unsere Welt zu sichern.
                    </p>
                  </div>
                  <div className={styles.our_mission_signature}>
                    <img src="img/signature.png" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className={styles.post_main}>
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
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
