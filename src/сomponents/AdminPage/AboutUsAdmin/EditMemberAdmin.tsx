import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import styles from "./AllMembersAdmin.module.css";
import { toast } from "react-toastify";
import { IMember } from "../../Team/interfaces/IMembers"
import { initMember } from "./interfaces/IMemberDate";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { useAboutUsSelector } from "../../../redux/aboutUsStore/aboutUsSelector";
import { aboutUsAction, statusesAbUs, updateMember } from "../../../redux/aboutUsStore/AboutUsSlice";


// Edit Member
const editedMember = async (editMember: IMember) => {
  try {
    const { data } = await axios.put(`/api/members/update/${editMember.id}`, editMember, {
      withCredentials: true,
    }
    );
    console.log("🚀 (Received)editedMember:", data);
  } catch (error) {
    toast.error(`Serverfehler getAllMembers ${error}`);
  }
};

const TeamEditMemberAdmin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { edit_member } = useAboutUsSelector();
  const [memberEditForm, setMemberEditForm] = useState(edit_member);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const width = 300;
  const height = 300;
  const category = "AVATAR";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/api/members/${id}`, {
  //         withCredentials: true,
  //       });
  //       setMemberEditForm(response.data);
  //     } catch (error) {
  //       console.error("Fehler bei der Anforderungsausführung:", error);
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  const collectMembersData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMemberEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const memberFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let linkVar: string = "";

    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `/api/files/upload?width=${width}&height=${height}&category=${category}`,
          formData, {
          withCredentials: true,
        }
        );
        linkVar = response.data.id.toString();
      } catch (error) {
        console.error("Fehler beim Hochladen der Datei: ", error);
      }
    }

    const editMember = {
      ...memberEditForm,
      image: linkVar || memberEditForm.image,
    };
    toast.success("Mitglied erfolgreich bearbeitet");
    editedMember(editMember);
    resetForm();
    dispatch(updateMember(editMember));
    dispatch(aboutUsAction(statusesAbUs.allMembers));
  };

  const resetForm = () => {
    setMemberEditForm(initMember);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageData(url);
    }
  };

  return (
    <div className={styles.form_container}>
      <h2>Edit Member</h2>

      <form className={styles.form} onSubmit={memberFormData}>
        <div>
          <div className={styles.form_field}>
            <label>id</label>
            <input
              type="text"
              name="id"
              value={memberEditForm.id}
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
            />
          </div>
          <div className={styles.form_field}>
            <label>Berufsbezeichnung</label>
            <input
              type="text"
              name="position"
              value={memberEditForm.position}
              onChange={collectMembersData}
            />
          </div>
          <div className={styles.description}>
            <label>Beschreibung</label>
            <textarea
              name="description"
              rows={3}
              value={memberEditForm.description}
              onChange={collectMembersData}
            />
          </div>

          <div className={styles.form_field}>
            <label>Telefon</label>
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
            src={"/api/files/" + memberEditForm.image}
            alt={memberEditForm.name + memberEditForm.position}
            style={{
              width: "400px",
              maxWidth: "400px",
              height: "auto",
            }}
          />
        </div>

        <label htmlFor="fileInput" className="file-upload">
          Wählen Sie ein anderes Bild
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
        />
        <br />
        {imageData && (
          <img
            src={imageData}
            alt="Image"
            style={{
              width: "400px",
              maxWidth: "400px",
              height: "auto",
            }}
          />
        )}

        <button type="submit" className={styles.create_btn}>
          Änderungen speichern
        </button>
      </form>
    </div>
  );
};

export default TeamEditMemberAdmin;