import styles from "./Team.module.css";
import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "./interfaces/IMembers";
import { SlEnvolope } from "react-icons/sl";
import { useAppDispatch } from "../../hooks/dispatch.selector";
import { getMembers } from "../../redux/aboutUsStore/aboutUsSlice";

export default function Team(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/members`, {
          withCredentials: true,
        });
        const memberDto = await response.data;
        setMember(memberDto.members);
        dispatch(getMembers(memberDto.members));
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className={styles.team_main}>
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
      </div>
    </>
  );
}
