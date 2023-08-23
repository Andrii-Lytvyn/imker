import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "./TeamAdmin.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MEMBER_STATE, MemberState, IAddNewMember } from "./interfaces/ITeamAddNewMember";


const memberData = {
  state: MEMBER_STATE.SHOW,
  name: "",
  position: "",
  description: "",
  image: "",
  phone: "+49",
  email: "",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

const baseURL = "http://localhost:8080";
const width = 300;
const height = 300;

const addNewMember = async (newMember: IAddNewMember) => {
  try {
    const data = await axios.post(`${baseURL}/api/members`, newMember);
    console.log("🚀  data:", data);
  } catch (error) {
    console.log("🚀error🚀  addNewMember", error);
  }
};

const TeamAddMemberAdmin = (): JSX.Element => {

  const [memberForm, setMemberForm] = useState(memberData);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  let linkVar: string;
  //  | undefined = undefined;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    }
  };

  const collectMembersData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMemberForm((prev) => ({ ...prev, [name]: value }));
  };


  const memberFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // let linkVar: string;
    // //  | undefined = undefined;

    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `${baseURL}/files/upload?width=${width}&height=${height}`,
          formData
        );
        linkVar = response.data.id.toString();
        console.log("🚀 File uploaded:", linkVar);
      } catch (error) {
        console.error("🚀Error uploading file:🚀 ", error);
      }
    }

    const createNewMember = {
      ...memberForm,

    // : IAddNewMember = {
    //   state,
    //   name,
    //   position,
    //   description,
    //   image: linkVar,
    //   phone,
    //   email,
    //   facebook,
    //   instagram,
      // image: linkVar;
      // createNewMember.image = linkVar;
    };

    toast.success("New Member created");
    addNewMember(createNewMember);

    setMemberForm(memberData);
  };

  return (
    <div className={styles.form_container}>
      <button type="button">
        <Link to="/aboutusadmin">Back</Link>
      </button>
      <h2>Add New Member</h2>
      <form className={styles.form} onSubmit={memberFormData}>
        <div>
          <div className={styles.status_container}>
            <label>Visible state</label>
            <div className={styles.status}>
              <input
                type="radio"
                id="option1"
                name="state"
                onChange={collectMembersData}
                value="SHOW"
                checked={memberForm.state === "SHOW"}
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
                checked={memberForm.state === ("HIDDEN" as MemberState)}
              />
              <label htmlFor="option2">HIDDEN</label>
            </div>
          </div>
          <div className={styles.form_field}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={memberForm.name}
              onChange={collectMembersData}
              required
            />
          </div>
          <div className={styles.form_field}>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={memberForm.position}
              onChange={collectMembersData}
              required
            />
          </div>
          <div className={styles.description}>
            <label>Description</label>
            <textarea
              name="description"
              rows={3}
              value={memberForm.description}
              onChange={collectMembersData}
            />
          </div>

          <div className={styles.form_field}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+49 1234 1234567"
              value={memberForm.phone}
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
              value={memberForm.email}
              onChange={collectMembersData}
              required
            />
          </div>
          <br />
          <div className={styles.form_field}>
            <label>Facebook (example: https://www.facebook.com/MarkTwen)</label>
            <input
              type="text"
              name="facebook"
              placeholder="https://www.facebook.com/MarkTwen"
              value={memberForm.facebook}
              onChange={collectMembersData}
            />
          </div>
          <br />
          <div className={styles.form_field}>
            <label>Instagram (example: https://www.instagram.com/MarkTwen)</label>
            <input
              type="text"
              name="instagram"
              placeholder="https://www.instagram.com/MarkTwen"
              value={memberForm.instagram}
              onChange={collectMembersData}
            />
            <br />
          </div>
        </div>

        <div className={styles.photo}>
          <label>Photo </label>

          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name="image"
            onChange={handleFileChange} />
          <br />
          {imageData && (
            <img
              src={imageData}
              alt="Image"
              style={{
                width: "300px",
                maxWidth: "300px",
                height: "auto",
              }}
            />
          )}
        </div>

        <button type="submit" className={styles.create_btn}>
          Add
        </button>
      </form>
    </div>
  );
};

export default TeamAddMemberAdmin;
