import styles from "./AboutUs.module.css";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "./interfaces/IMembers";
import baseURL from "../globalLinkToServer";


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
          <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
            <img src="img/about_1.jpg" width="90%" />
            <caption>"Bright as a sunflower."</caption>
          </div>
          <div className={styles.about_img + " d-flex flex-column justify-around p-3"}>
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
