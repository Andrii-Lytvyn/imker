import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "../../AboutUs/interfaces/IMembers";
import { Link, useNavigate } from "react-router-dom";

export default function TeamAdmin(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  async function deleteMember(idMember: number) {
    try {
      const response = await axios.delete(`/api/members/${idMember}`, 
      {withCredentials: true,
    });
      window.location.reload();

      if (response.status === 204) {
        const index = member.findIndex(member => member.id === idMember);
        if (index !== -1) {
          member.splice(index, 1);
          console.log(` Mitglied mit der ID ${idMember} gelöscht.`);
        } else {
          console.log(`Mitglied mit der ID ${idMember} nicht gefunden.`);
        }
      } else {
        console.log(`Mitglied mit ID ${idMember} kann nicht gelöscht werden.`);
      }
    } catch (error) {
      console.error("Fehler bei der Anforderungsausführung:", error);
    }
  }

  return (
    <>
      <br />
      <button type="button">
        <Link to="/aboutusadmin/">Bearbeiten die Beschreibung „Über uns“.</Link>
      </button>
      <br /><br />
      <Container>
        <button type="button">
          <Link to="/teamadmin/addmember/">Neues Mitglied hinzufügen</Link>
        </button>
        <br /><br />
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
                <button onClick={() => navigate(`/teamadmin/teameditmemberadmin/${id}`)
                }>
                  Bearbeiten
                </button>
                <button onClick={() => deleteMember(+id)}>
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
                  <img src={"/api/files/" + image} alt={name + position} width="300px" /> <br />
                </div>
                <br /><br />
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
}
