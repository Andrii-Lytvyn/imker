import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "../../Team/interfaces/IMembers";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { aboutUsAction, getOneMember, statusesAbUs } from "../../../redux/aboutUsStore/aboutUsSlice";
import styles from "./AboutUsAdmin.module.css";


export default function TeamAdmin(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/members`, {
          withCredentials: true,
        });
        const memberResponseData = await response.data;
        setMember(memberResponseData.members);
      } catch (error) {
        console.error("Fehler bei der Anforderungsausführung:", error);
      }
    };
    fetchData();
  }, []);

  const deleteMember = async (idMember: number) => {
    if (idMember != null) {
      try {
        await axios.delete(`/api/members/${idMember}`, {
            withCredentials: true,
          });
          const response = await axios.get(`/api/members/`, {
            withCredentials: true,
          });
          const memberResponseData = response.data;
          setMember(memberResponseData.members);
      } catch (error) {
        console.error("Fehler bei der Anforderungsausführung:", error);
      }
    }
  };

  function EditMember(id: number) {
    dispatch(aboutUsAction(statusesAbUs.editMember));
    dispatch(getOneMember(id));
  }

  return (
    <>
      <br />
      <Container>
        <div className={styles.edit_block}>
          <ul>
            {member.map(
              ({
                id,
                state,
                name,
                position,
                description,
                image,
                phone,
                facebook,
                instagram,
                email
              }) => (
                <li key={id}>
                  <button className="button_imker" onClick={() => EditMember(id)}>
                    Bearbeiten
                  </button>
                  <button className={styles.button_imker_red} onClick={() => deleteMember(id)}>
                    Löschen
                  </button>
                  <div >
                    <p> ID-Mitglied: {id} </p>
                    <p> Zustand: {state} </p>
                    <p >Name: {name}</p>
                    <p >Berufsbezeichnung: {position}</p>
                    <p >Beschreibung: {description}</p>
                    <p >Telefon: {phone}</p>
                    <div>
                      <p >E-mail: {email}</p>
                      <p >Facebook: {facebook}</p>
                      <p >Instagram: {instagram}</p>
                    </div>
                    <img src={"https://imker.fra1.cdn.digitaloceanspaces.com/" + image} alt={name + position} width="300px" /> <br />
                  </div>
                  <br /><br />
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
