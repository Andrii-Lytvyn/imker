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
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aboutus/`, {
          withCredentials: true,
        });
        const aboutUsResponse = await response.data;
        const aboutUsRes = aboutUsResponse.aboutUsAll?.[0];
        setaboutUsRes(aboutUsRes);
        console.log("🚀 ~ 23 ~ aboutUsRes:", aboutUsRes[0])
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.about_main}>
          <Container>
            <h1>Über uns</h1>
          </Container>

          <Container className="d-flex flex-column">
              <>
              <div key={aboutUsRes.id}>
                <div  className="mb-3">
                  <h4>{aboutUsRes.titleTop}</h4>

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
                    <caption>"Bright as a sunflower."</caption>
                  </div>
                  <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                    <img src={"/api/files/" + aboutUsRes.image2} width="90%" />
                    <caption>"Bright as a sunflower."</caption>
                  </div>
                </div>

            <div className="mb-3">
              <h4>{aboutUsRes.titleBottom}</h4>
              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(aboutUsRes.descriptionBottom || ""),
                }}
              />
            </div>
            </div>
          </>
        ))
      </Container >
      <TeamFrame />
    </div>
   </>
  );
}
