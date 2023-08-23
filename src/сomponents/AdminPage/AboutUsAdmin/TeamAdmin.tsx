import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "../../AboutUs/IMembers";
import { Link } from "react-router-dom";


export default function TeamAdmin(): JSX.Element {

  const baseURL = "http://localhost:8080";
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

  async function updateMember(idMember: number) {
    try {
      const response = await axios.put(
        `${baseURL}/api/members/${idMember}`
      );
      setMember(await response.data);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  // !!! НЕ ОБНОВЛЯЕТ ДАННІЕ НА СТРАНИЦЕ - НУЖНА ПЕРЕРИСОВКА после удаления
  async function deleteMember(idMember: number) {
    try {
      const response = await axios.delete(`${baseURL}/api/members/${idMember}`);
      console.log("🚀 ~ file: TeamAdmin.tsx:40 ~ deleteMember ~ response:", response)
      window.location.reload();
      // setMember(await response.data);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }

  //   async function deleteMemberById(id: number): Promise<void> {
  //     try {
  //         const response = await axios.delete(
  //             `${baseURL}/api/members/${id}`
  //         );

  //         if (response.status === 204) {
  //             const index = member.findIndex(member => member.id === id);
  //             if (index !== -1) {
  //               member.splice(index, 1);
  //                 console.log(` Member with ID ${id} deleted.`);
  //             } else {
  //                 console.log(`Member with ID ${id} not found.`);
  //             }
  //         } else {
  //             console.log(`Can't delet member with ID ${id}.`);
  //         }
  //     } catch (error) {
  //         console.error("An error occurred during deleting member:", error);
  //     }
  // }



  return (
    <>
      <Container>
        <button type="button">
          <Link to="/aboutusadmin/addmember/">Add new</Link>
        </button>
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
                <button onClick={() => updateMember(+id)}>
                  Edit
                </button>
                <button onClick={() => deleteMember(+id)}>
                  Delete
                </button>
                <div >
                  <p> ID member: {id} </p>
                  <p> State: {state} </p>
                  <p >Name: {name}</p>
                  <p >Position: {position}</p>
                  <p >Description: {description}</p>
                  <p >Phone: {phone}</p>
                  <div>
                    <p >E-mail: {email}</p>
                    <p >Facebook: {facebook}</p>
                    <p >Instagram: {instagram}</p>
                  </div>
                  <img src={image} width="300px" /> <br />
                </div>
                <br /><br />
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
}
