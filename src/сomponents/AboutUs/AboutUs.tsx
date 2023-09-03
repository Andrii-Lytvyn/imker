import styles from "./AboutUs.module.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IAboutUs } from "./interfaces/IAboutUs";
import DOMPurify from "dompurify";
import TeamFrame from "../Team/Team.tsx"


export default function AboutUs(): JSX.Element {

  const [aboutUs, setAboutUs] = useState<IAboutUs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aboutus/`, {
          withCredentials: true,
        });
        const aboutUsResponse = await response.data;
        console.log("🚀35 aboutUsResponse:", aboutUsResponse)
        setAboutUs(aboutUsResponse.aboutUsAll);
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <h1>Über uns</h1>
      </Container>

      <Container className="d-flex flex-column">
        {aboutUs?.map((elem) => (
          <>
            <div className="mb-3">
              <p className={styles.about_text}><h4>{elem.titleTop}</h4></p >

              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(elem.descriptionTop || ""),
                }}
              />
            </div>

            <div className="d-flex justify-content-around">
              <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                <img src={"/api/files/" + elem.image1} width="90%" />
                <caption>"Bright as a sunflower."</caption>
              </div>
              <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                <img src={"/api/files/" + elem.image2} width="90%" />
                <caption>"Bright as a sunflower."</caption>
              </div>
            </div>

            <div className="mb-3">
              <p className={styles.about_text}><h4>{elem.titleBottom}</h4></p >
              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(elem.descriptionBottom || ""),
                }}
              />
            </div>
          </>
        ))
        }
      </Container >
<TeamFrame />
    </>
  );
}
