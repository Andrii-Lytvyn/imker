import styles from "./AboutUs.module.css";
import {Container} from "react-bootstrap";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa6";
export default function AboutUs(): JSX.Element {
  return (
    <>

      <Container>
        <h1>Über uns</h1>
      </Container>
      <Container className="d-flex flex-column">
                     <h4>WAS SIND HONIGBIENEN?</h4>
                <div className="mb-3">
                    <p className={styles.about_text}>Lorem ipsum dolor sit amet, ad nec scripta volumus, eu viris salutatus dissentias sit, ex enim Duo magna nostro persequeris ne Eam tritani maiorum ne, quod ne legere quodsi phaedrum ad per, in malis.</p>
                    <p className={styles.about_text}>Vel ad falli graecis copiosae, solum integre fastidii sea cu. Melius insolens constituto ad pri, numquam accommodare eu nec. Pro ad wisi altera forensibus.</p>
                </div>
                <div className="d-flex justify-content-around">
                      <div className={styles.about_img +" d-flex flex-column justify-around p-3"}>
                          <img src="img/about_1.jpg" width="90%" />
                          <caption>"Bright as a sunflower."</caption>
                      </div>
                        <div className={styles.about_img +" d-flex flex-column justify-around p-3"}>
                        <img src="img/about_2.jpg" width="90%" />
                        <caption>"Bright as a sunflower."</caption>
                    </div>
                </div>
          <div>
              <p className={styles.about_text + " mb-3"}>Ponderum consulatu cum te Lorem ipsum Vel ad falli graecis copiosae, solum integre fastidii sea cu. Melius insolens constituto ad pri, numquam accommodare eu nec. Pro ad wisi altera forensibus. Et pri nemore nominati. Sit an vidisse propriae apeirian, nec persecuti appellantur te. Vel ei prima Mea mentitum instructior ne, argumentum suscipiantur ut nam Simul euis Laboramus neglegentur at ius. Ut sed assum inte.</p>
              <p className={styles.about_text + " mb-3"}>Ponderum consulatu cum te Lorem ipsum Vel ad falli graecis copiosae, solum integre fastidii sea cu. Melius insolens constituto ad pri, numquam accommodare eu nec. Pro ad wisi altera forensibus. Et pri nemore nominati. Sit an vidisse propriae apeirian, nec persecuti appellantur te. Vel ei prima Mea mentitum instructior ne, argumentum suscipiantur ut nam Simul euis Laboramus neglegentur at ius. Ut sed assum inte.</p>
          </div>
      </Container>
      <div className={styles.our_team}>
          <h2 className="mt-3">UNSER EXPERTENTEAM</h2>
          <h4>Lernen Sie unser leidenschaftliches Team von Honigproduktionsprofis kennen</h4>
      </div>
      <Container className="d-flex">
          <div className={styles.about_members}>
                <img src="img/team1.jpg"/>
              <p className={styles.about_position}>BEEKEEPER</p>
              <p className={styles.about_position_name}>GREGORY SILVA</p>
              <p className={styles.about_position_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatupteoccaecat cupidatat not perspiciatis unde omnise natus error sit voluptatem accus.</p>
              <div className={styles.social}>
                  <a href="#"><FaFacebook className={styles.social_icons} /></a>
                  <a href="#"><FaInstagram className={styles.social_icons} /></a>
                  <a href="#"><FaTwitter className={styles.social_icons} /></a>
              </div>
          </div>
          <div className={styles.about_members}>
              <img src="img/team2.jpg"/>
              <p className={styles.about_position}>FIELD TECHNICIAN</p>
              <p className={styles.about_position_name}>ROGER PORTER</p>
              <p className={styles.about_position_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatupteoccaecat cupidatat not perspiciatis unde omnise natus error sit voluptatem accus.</p>
              <div className={styles.social}>
                  <a href="#"><FaFacebook className={styles.social_icons} /></a>
                  <a href="#"><FaInstagram className={styles.social_icons} /></a>
                  <a href="#"><FaTwitter className={styles.social_icons} /></a>
              </div>
          </div>
          <div className={styles.about_members}>
              <img src="img/team3.jpg"/>
              <p className={styles.about_position}>GARDENER</p>
              <p className={styles.about_position_name}>WALTER HARRIS</p>
              <p className={styles.about_position_text}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatupteoccaecat cupidatat not perspiciatis unde omnise natus error sit voluptatem accus.</p>
              <div className={styles.social}>
                  <a href="#"><FaFacebook className={styles.social_icons} /></a>
                  <a href="#"><FaInstagram className={styles.social_icons} /></a>
                  <a href="#"><FaTwitter className={styles.social_icons} /></a>
              </div>
          </div>
      </Container>
    </>
  );
}
