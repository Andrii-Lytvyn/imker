import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TeamAdmin.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IMember } from "../../AboutUs/interfaces/IMembers"
import baseURL from "../../globalLinkToServer";

const initMember ={
  id: 0,
  state: "",
  name: "",
  position: "",
  description: "",
  image: "",
  phone: "",
  facebook: "",
  instagram: "",
  email: ""
}

// Edit Member
const editedMember = async (editMember: IMember) => {
  console.log("🚀 row 24 ~ editedMember ~ editMember:", editMember)
  try {
    const { data } = await axios.put(`${baseURL}/api/members/update/${editMember.id}`, editMember
      );
    console.log("🚀 (Received)editedMember:", data);
  } catch (error) {
    toast.error(`Server error getAllMembers ${error}`);
  }
};

const TeamEditMemberAdmin = (): JSX.Element => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [memberEditForm, setMemberEditForm] = useState(initMember);
  console.log("🚀 memberEditForm:", memberEditForm)

  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/members/${id}`);
      setMemberEditForm(response.data);
      console.log("🚀 47 ~ fetchData ~ response:", response)
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  }
    fetchData();
  }, [id]);

  const collectMembersData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMemberEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const memberFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const editMember = {
      ...memberEditForm, 
    };
    console.log("🚀row 67 editMember:", editMember);

    editedMember(editMember);

    navigate("/aboutusadmin");
    resetForm();
  };

  const resetForm = () => {
    setMemberEditForm(initMember);
  };

  return (
    <div className={styles.form_container}>
      <button type="button">
        <Link to="/aboutusadmin">Back</Link>
      </button>
      <h2>Add Edit Member</h2>
      
      <form className={styles.form} onSubmit={memberFormData}>
        <div>
        {/* <p>Member ID: {id}</p> */}
        <div className={styles.form_field}>
            <label>id</label>
            <input
              type="text"
              name="id"
              value={id}
              readOnly
            />
          </div>
        
          <div className={styles.status_container}>
            <label>Visible state</label>
            <div className={styles.status}>
              <input
                type="radio"
                id="option1"
                name="state"
                onChange={collectMembersData}
                value="SHOW"
                checked={memberEditForm.state === "SHOW"}
              />
              <label htmlFor="option1">SHOW</label>
            </div>
            <div className={styles.status}>
              <input
                type="radio"
                id="option2"
                name="state"
                value="HIDDEN"
                onChange={collectMembersData}
                checked={memberEditForm.state === "HIDDEN"}
              />
              <label htmlFor="option2">HIDDEN</label>
            </div>
          </div>
          <div className={styles.form_field}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={memberEditForm.name}
              onChange={collectMembersData}
              required
            />
          </div>
          <div className={styles.form_field}>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={memberEditForm.position}
              onChange={collectMembersData}
              required
            />
          </div>
          <div className={styles.description}>
            <label>Description</label>
            <textarea
              name="description"
              rows={3}
              value={memberEditForm.description}
              onChange={collectMembersData}
            />
          </div>

          <div className={styles.form_field}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+49 1234 1234567"
              value={memberEditForm.phone}
              onChange={collectMembersData}
            />
          </div>
          <br />
          <div className={styles.form_field}>
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              placeholder="+49 1234 1234567"
              value={memberEditForm.email}
              onChange={collectMembersData}
              required
            />
          </div>
          <br />
          <div className={styles.form_field}>
            <label>Facebook (example: https://www.facebook.com/FacebookId)</label>
            <input
              type="text"
              name="facebook"
              value={memberEditForm.facebook}
              onChange={collectMembersData}
            />
          </div>
          <br />
          <div className={styles.form_field}>
            <label>Instagram (example: https://www.instagram.com/InstagramId)</label>
            <input
              type="text"
              name="instagram"
              value={memberEditForm.instagram}
              onChange={collectMembersData}
            />
            <br />
          </div>
        </div>

        <div className={styles.photo}>
          <label>Photo </label>
          <img
              src= {memberEditForm.image}
              alt="image"
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
              }}
            />          
        </div>

        <label htmlFor="fileInput" className="file-upload">
          Choose another image
        </label>

        <button type="submit" className={styles.create_btn}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default TeamEditMemberAdmin;