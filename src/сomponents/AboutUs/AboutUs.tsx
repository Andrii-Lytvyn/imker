import styles from "./AboutUs.module.css";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram} from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "./interfaces/IMembers";
import { IAboutUs } from "./interfaces/IAboutUs";
import DOMPurify from "dompurify";
import { SlEnvolope } from "react-icons/sl";


export default function AboutUs(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);
  const [aboutUs, setAboutUs] = useState<IAboutUs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/members`, {
          withCredentials: true,
        });
        const memberDto = await response.data;
        setMember(memberDto.members);
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    };
    fetchData();
  }, []);

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
                <img src={"/api/files/" + elem.image1} width="100%" />
                <caption>"Bright as a sunflower."</caption>
              </div>
              <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
              <img src={ "/api/files/" + elem.image2}  width="100%" />
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

      <div className={styles.our_team}>
        <h2 className="mt-3">UNSER EXPERTENTEAM</h2>
        <h4>Lernen Sie unser leidenschaftliches Team von Honigproduktionsprofis kennen</h4>
      </div>
      <Container className="d-flex">
        <ul className={styles.about_ul}>
          {member?.map((element, index) => (
            element.state === "SHOW" ?
              <li key={index}>
                <div className={styles.about_members}>
                  <img src={"/api/files/" + element.image} />
                  <p className={styles.about_position}>{element.position}</p>
                  <p className={styles.about_position_name}>{element.name}</p>
                  <p className={styles.about_position_text}>{element.description}</p>
                  <div className={styles.social}>
                    <a href={element.facebook}><FaFacebook className={styles.social_icons} /></a>
                    <a href={element.instagram}><FaInstagram className={styles.social_icons} /></a>
                    <a href={"mailto:" + element.email}><SlEnvolope className={styles.social_icons} /></a>
                  </div>
                </div>
              </li>
              : ""
          ))}
        </ul>
      </Container>
    </>
  );
}
