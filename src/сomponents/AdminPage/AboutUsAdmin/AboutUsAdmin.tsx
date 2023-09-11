import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./AboutUsAdmin.module.css";
import { toast } from "react-toastify";
import { IAboutUs } from "../../AboutUs/interfaces/IAboutUs";
import { Container } from "react-bootstrap";
// import { useAppDispatch } from "../../../hooks/dispatch.selector";
// import { aboutUsAction, statusesAbUs } from "../../../redux/aboutUsStore/AboutUsSlice";

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
  const [aboutUsEditForm, setAboutUsEditForm] = useState(initAboutUs);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const width = 600;
  const height = 600;
  const category = "AVATAR";
  // const dispatch = useAppDispatch();

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
    // dispatch(aboutUsAction(statusesAbUs.allMembers));
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
    <div className={styles.edit_block}>
      <div className={styles.form_container}>
        <h2>SEITE ÜBER UNS BEARBEITEN</h2>
        <form className={styles.form} onSubmit={aboutUsFormData}>
          <div>
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
                rows={15}
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
                rows={15}
                value={aboutUsEditForm.descriptionBottom}
                onChange={collectAboutUsData}
              />
            </div>
          </div>

          <h3>Foto ändern</h3>

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
            <br /><br />

            <div className={styles.description}>Um Fotos zu ersetzen, laden Sie sie in den Datei-Upload-Block
              (Neues Foto laden) hoch, der sich unten befindet. Laden Sie das
              Foto hoch und geben Sie dann aus der Zelle „Neue Nr.
              für Foto“ die Nummer in die entsprechende Zelle „Neue Nummer für
              Foto 1“ oder 2 ein. Wenn Sie beide Fotos ändern, laden Sie die
              Fotos einzeln hoch.
              </div>
            <label>Neue nummer für foto 1 :</label>
            <input
              type="text"
              name="image1"
              value={aboutUsEditForm.image1}
              onChange={collectAboutUsData}
            />
            <div className={styles.photo}>
              <label>Neue nummer für foto 2 : </label>
              <input
                type="text"
                name="image2"
                value={aboutUsEditForm.image2}
                onChange={collectAboutUsData}
              />
            </div>
          </div>
          <br /><br />
          <button className="button_imker" type="submit" >
            Alle Änderungen speichern
          </button>
        </form>

        <Container>
          <h3>Neues Foto laden</h3>
          <p>Wählen Sie ein neues Foto zum Hochladen aus:</p>
          <div className={styles.description}>WICHTIG!!! Die Größe des Bildes sollte 600x600 betragen. 
            Wenn es größer ist, wird es auf die Größe 600 x 600 
            zugeschnitten.</div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <br /> <br />
          <div className={styles.description}>Nachdem Sie auf die Schaltfläche „Hochladen“ geklickt haben,
            wird das Foto hochgeladen und Sie sehen eine neue Nummer,
            die Sie in die Zellen „Neue nummer für foto 1“ oder „Neue nummer für foto 2“ eingeben können.
          </div>
          <button className="button_imker" onClick={() => handleFileUploading()}>Datei senden</button>

          <br /><br />
          <div className={styles.form_field}>
            <p><label>Neue nummer für foto: </label></p>
            <input
              type="text"
              name="linkVar"
              value={linkVar}
              readOnly
            />
          </div>

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
        </Container>
      </div>
    </div>
  );
}
