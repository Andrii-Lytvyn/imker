import styles from "./Footer.module.css";
import { Card, Container } from "react-bootstrap";
import {FaHome, FaPhoneAlt} from "react-icons/fa";
import {SlEnvolope, SlHome, SlPhone} from "react-icons/sl";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa6";

export default function Footer(): JSX.Element {
  return (
    <>
      <div className={styles.footer}>
        <div>
          <img className={styles.logo_footer} src="img/logo.png" />
        </div>
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
                  <p className={styles.footer_data}>April 27, 2023</p>
                  <p className={styles.footer_name_event}>
                    <a href="/"> BEEKEEPER – BEES AND BEEKEEPING</a>
                  </p>
                  <hr />
                </div>
                <div>
                  <p className={styles.footer_data}>April 27, 2023</p>
                  <p className={styles.footer_name_event}>
                    <a href="/">
                      {" "}
                      BEEKEEPER – BEES AND BEEKEEPING BEES AND BEEKEEPING
                    </a>
                  </p>
                  <hr />
                </div>
                <div>
                  <p className={styles.footer_data}>April 27, 2023</p>
                  <p className={styles.footer_name_event}>
                    <a href="/"> BEEKEEPER – BEES AND BEEKEEPING</a>
                  </p>
                  <hr />
                </div>
                <div>
                  <p className={styles.footer_data}>April 27, 2023</p>
                  <p className={styles.footer_name_event}>
                    <a href="/">
                      {" "}
                      BEEKEEPER – BEES AND BEEKEEPING BEES AND BEEKEEPING
                    </a>
                  </p>
                  <hr />
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
                  <a className={styles.about_links} href="/">
                    BLOG
                  </a>
                </p>
                <p className={styles.about_links}>
                  <a className={styles.about_links} href="/">
                    VERANSTALTUNGEN
                  </a>
                </p>
                <p className={styles.about_links}>
                  <a className={styles.about_links} href="/">
                    Mitglieder der Gemeinschaft
                  </a>
                </p>
                <p className={styles.about_links}>
                  <a className={styles.about_links} href="/">
                    GALERIE
                  </a>
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
            <img src="img/logo.png" height="30px" />
          </div>
        </Container>
      </div>
    </>
  );
}
