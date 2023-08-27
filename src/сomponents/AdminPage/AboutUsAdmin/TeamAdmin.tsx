import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "../../AboutUs/interfaces/IMembers";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../../globalLinkToServer";

export default function TeamAdmin(): JSX.Element {

  const [member, setMember] = useState<IMember[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/members`);
        const memberResponseData = await response.data;
        console.log("memberResponseData:🚀🚀 ", memberResponseData)
        setMember(memberResponseData.members);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };
    fetchData();
  }, []);

  async function deleteMember(idMember: number) {
    try {
      const response = await axios.delete(`${baseURL}/api/members/${idMember}`);
      console.log("🚀 ~ file: TeamAdmin.tsx:40 ~ deleteMember ~ response:", response)
      window.location.reload();
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
                <button onClick={() => navigate(`/aboutusadmin/teameditmemberadmin/${id}`)
                }>
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
                  <img src={baseURL + "/api/files/" + image} alt={name + position} width="300px" /> <br />
                </div>
                <br /><br />
              </li>
            ))}
        </ul>
      </Container>
    </>
  );
}
