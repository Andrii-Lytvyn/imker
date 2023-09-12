import styles from "./AboutUs.module.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IAboutUs, initIAboutUs } from "./interfaces/IAboutUs";
import DOMPurify from "dompurify";
import TeamFrame from "../Team/Team.tsx"


export default function AboutUs(): JSX.Element {

  const [aboutUsRes, setaboutUsRes] = useState<IAboutUs>(initIAboutUs);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aboutus/`, {
          withCredentials: true,
        });
        const aboutUsResponse = await response.data;
        const aboutUsRes = aboutUsResponse.aboutUsAll?.[0];
        setaboutUsRes(aboutUsRes);
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.about_main}>
          <div
              className={
                  styles.about_bg +
                  " d-flex align-items-center justify-content-center animate__animated animate__pulse mt-3"
              }
          >
                <h2>Über uns</h2>
          </div>
        <Container className="d-flex flex-column mb-5">
          <>
            <div key={aboutUsRes.id}>
              <div className="mb-3">
                <h4>{aboutUsRes.titleTop}</h4>
                <br/>
                <div
                  className="container"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(aboutUsRes.descriptionTop || ""),
                  }}
                />
              </div>
              <div className="d-flex justify-content-around">
                <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                  <img src={"/api/files/" + aboutUsRes.image1} width="90%" />
                  <div className={styles.img_description}>"Hell wie eine Sonnenblume."</div>
                </div>
                <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                  <img src={"/api/files/" + aboutUsRes.image2} width="90%" />
                  <div className={styles.img_description}>"Hell wie eine Sonnenblume."</div>
                </div>
              </div>
              <div className="mb-3">
                <h4>{aboutUsRes.titleBottom}</h4>
                <br/><br/>
                <div
                  className="container"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(aboutUsRes.descriptionBottom || ""),
                  }}
                />
              </div>
            </div>
          </>
        </Container >
        <TeamFrame />
      </div>
    </>
  );
}
