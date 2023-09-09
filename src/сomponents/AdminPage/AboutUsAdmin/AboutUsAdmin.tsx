import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TeamAdmin.module.css";
// import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IAboutUs } from "../../AboutUs/interfaces/IAboutUs";
import { useAppDispatch } from "../../../hooks/dispatch.selector";
import { eventsStatus, statusEvt } from "../../../redux/aboutUsStore/AboutUsSlice";

const initAboutUs = {
  id: 1,
  titleTop: "",
  descriptionTop: "",
  titleBottom: "",
  descriptionBottom: "",
  image1: "",
  image2: "",
}

// Edit About Us
const editedAboutUs = async (editAboutUs: IAboutUs) => {
  try {
    const { data } = await axios.put(`api/aboutus/update/1`, editAboutUs, {
      withCredentials: true,
    }
    );
    console.log("🚀 (Received)editedAboutUs:", data);
  } catch (error) {
    toast.error(`Serverfehler getAllAboutUs ${error}`);
  }
};

export default function AboutUsAdmin(): JSX.Element {

  const id = 1;
  // const navigate = useNavigate();
  const [aboutUsEditForm, setAboutUsEditForm] = useState(initAboutUs);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const width = 600;
  const height = 600;
  const category = "AVATAR";
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/aboutus/${id}`);
        setAboutUsEditForm(response.data);
        console.log("🚀 ~ file: AboutUsAdmin.tsx:48 ~ fetchData ~ response:", response)
      } catch (error) {
        console.error("Fehler bei der Ausführung der Anfrage:", error);
      }
    }
    fetchData();
  }, [id]);



  const collectAboutUsData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAboutUsEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const [linkVar, setLinkVar] = useState<string>("");

  async function handleFileUploading() {
    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `/api/files/upload?width=${width}&height=${height}&category=${category}`,
          formData
        );
        setLinkVar(response.data.id.toString());
      } catch (error) {
        console.error("Fehler beim Hochladen der Datei", error);
      }
    }
  }

  const aboutUsFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editAboutUs = {
      ...aboutUsEditForm,
    };

    editedAboutUs(editAboutUs);
    // navigate("/aboutusadmin");
    resetForm();
    dispatch(eventsStatus(statusEvt.allMembers));
    // window.location.reload();
  };

  const resetForm = () => {
    setAboutUsEditForm(initAboutUs);
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
      {/* <button type="button">
        <Link to="/teamadmin/">Bearbeiten eines Teams</Link>
      </button> */}

      <h2>SEITE ÜBER UNS BEARBEITEN</h2>

      <form className={styles.form} onSubmit={aboutUsFormData}>
        <div>
          {/* <div className={styles.form_field}>
            <label>id</label>
            <input
              type="text"
              name="id"
              value={id}
              readOnly
            />
          </div> */}

          <div className={styles.description}>
            <label>Titel oben</label>
            <input
              type="text"
              name="titleTop"
              value={aboutUsEditForm.titleTop}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Beschreibung Oben</label>
            <textarea
              name="descriptionTop"
              rows={30}
              value={aboutUsEditForm.descriptionTop}
              onChange={collectAboutUsData}
            />
          </div>

          <div>
          </div>
          <div className={styles.description}>
            <label>Titel unten</label>
            <input
              type="text"
              name="titleBottom"
              value={aboutUsEditForm.titleBottom}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Beschreibung unten</label>
            <textarea
              name="descriptionBottom"
              rows={30}
              value={aboutUsEditForm.descriptionBottom}
              onChange={collectAboutUsData}
            />
          </div>
        </div>

        <h2>Foto ändern</h2>

        <div className={styles.photo}>
          <img
            src={"/api/files/" + aboutUsEditForm.image1}
            alt=""
            style={{
              width: "300px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <img
            src={"/api/files/" + aboutUsEditForm.image2}
            alt=""
            style={{
              width: "300px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <br />
          <label>Geben Sie eine neue Nummer für Foto 1 ein:</label>
          <input
            type="text"
            name="image1"
            value={aboutUsEditForm.image1}
            onChange={collectAboutUsData}
          />
          <div className={styles.photo}>
            <label>Geben Sie eine neue Nummer für Foto 2 ein: </label>
            <input
              type="text"
              name="image2"
              value={aboutUsEditForm.image2}
              onChange={collectAboutUsData}
            />
          </div>
        </div>

        <h2>Alle Änderungen speichern</h2>
        <button type="submit" className={styles.create_btn}>
          Änderungen speichern
        </button>
      </form>

      <h2>Neues Foto laden</h2>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
      // style={{ display: "none" }}
      />
      <br />
      <div className={styles.form_field}>
        <label>neue № für Foto </label>
        <input
          type="text"
          name="linkVar"
          value={linkVar}
          readOnly
        />
      </div>
      <button onClick={() => handleFileUploading()}>Datei senden</button>
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
  );
}
