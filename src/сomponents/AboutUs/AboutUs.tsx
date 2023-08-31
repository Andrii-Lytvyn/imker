import styles from "./AboutUs.module.css";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "./interfaces/IMembers";
import baseURL from "../globalLinkToServer";
import { IAboutUs } from "./interfaces/IAboutUs";
import DOMPurify from "dompurify";


export default function AboutUs(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/members`);
        const memberDto = await response.data;
        setMember(memberDto.members);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };
    fetchData();
  }, []);


  const [aboutUs, setAboutUs] = useState<IAboutUs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/aboutus/`);
        const aboutUsResponse = await response.data;
        console.log("🚀35 aboutUsResponse:", aboutUsResponse)
        setAboutUs(aboutUsResponse.aboutUsAll);
      } catch (error) {
        console.error("Error during request execution:", error);
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
              <p className={styles.about_text}><h4>**{elem.titleTop}</h4></p >
              {/* <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(elem.titleTop || ""),
                }}
              /> */}

              <div
                className="container"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(elem.descriptionTop || ""),
                }}
              />
            </div>

            <div className="d-flex justify-content-around">
              <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
                <img src={baseURL + "/api/files/" + elem.image1} width="90%" />
                <caption>"Bright as a sunflower."</caption>
              </div>
              <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
              <img src={baseURL + "/api/files/" + elem.image2}  width="90%" />
                <caption>"Bright as a sunflower."</caption>
              </div>
            </div>

            <div className="mb-3">
            <p className={styles.about_text}><h4>**{elem.titleBottom}</h4></p >
            {/* <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(elem.titleBottom || ""),
              }}
            /> */}
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
                  <img src={baseURL + "/api/files/" + element.image} />
                  <p className={styles.about_position}>{element.position}</p>
                  <p className={styles.about_position_name}>{element.name}</p>
                  <p className={styles.about_position_text}>{element.description}</p>
                  <div className={styles.social}>
                    <a href={element.facebook}><FaFacebook className={styles.social_icons} /></a>
                    <a href={element.instagram}><FaInstagram className={styles.social_icons} /></a>
                    <a href={element.email}><FaTwitter className={styles.social_icons} /></a>
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
