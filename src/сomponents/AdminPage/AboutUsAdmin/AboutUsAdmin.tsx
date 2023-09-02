import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TeamAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseURL from "../../globalLinkToServer";
import { IAboutUs } from "../../AboutUs/interfaces/IAboutUs";
// import { Editor } from "@tinymce/tinymce-react";

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
  console.log("🚀 ~ 21 editAboutUs:", editAboutUs)
  try {
    const { data } = await axios.put(`${baseURL}/api/aboutus/update/1`, editAboutUs
    );
    console.log("🚀 (Received)editedAboutUs:", data);
  } catch (error) {
    toast.error(`Server error getAllAboutUs ${error}`);
  }
};

export default function AboutUsAdmin(): JSX.Element {

  // const [value, setValue] = useState<string>();
  // const [text, setText] = useState("");

  const id = 1;
  const navigate = useNavigate();
  const [aboutUsEditForm, setAboutUsEditForm] = useState(initAboutUs);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const width = 600;
  const height = 600;
  const category = "AVATAR";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/aboutus/${id}`);
        setAboutUsEditForm(response.data);
        // console.log("🚀 47 ~ fetchData ~ response:", response)
      } catch (error) {
        console.error("Error during request execution:", error);
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
          `${baseURL}/api/files/upload?width=${width}&height=${height}&category=${category}`,
          formData
        );
        // linkVar = response.data.id.toString();
        setLinkVar(response.data.id.toString());
        console.log("🚀89 linkVar:", linkVar)
      } catch (error) {
        console.error("🚀Error uploading file:🚀 ", error);
      }
    }
  }

  const aboutUsFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editAboutUs = {
      ...aboutUsEditForm,
    };

    editedAboutUs(editAboutUs);
    navigate("/aboutusadmin");
    resetForm();
    window.location.reload();
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
      console.log("🚀 114 ~ handleFileChange ~ url:", url)
    }
  };

  return (
    <div className={styles.form_container}>
      <button type="button">
        <Link to="/aboutusadmin">Back</Link>
      </button>
      <h2>Edit page About us</h2>

      <form className={styles.form} onSubmit={aboutUsFormData}>
        <div>
          <div className={styles.form_field}>
            <label>id</label>
            <input
              type="text"
              name="id"
              value={id}
              readOnly
            />
          </div>

          <div className={styles.description}>
            <label>Title Topp</label>
            <input
              type="text"
              name="titleTop"
              value={aboutUsEditForm.titleTop}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Description Top</label>
            <textarea
              name="descriptionTop"
              rows={30}
              value={aboutUsEditForm.descriptionTop}
              onChange={collectAboutUsData}
            />
          </div>

          <div>
            {/* <Editor
            apiKey="h2bfbarjdz9czdunh8t6splenye1zsn4q2t3lc4m8q5fqg56"
            onEditorChange={(newValue, editor) => {
              setValue(newValue);
              setText(editor.getContent({ format: "html" }));
            }}
            onInit={(_, editor) => {
              setText(editor.getContent({ format: "html" }));
            }}
            initialValue={aboutUsEditForm.descriptionTop}
            value={value}
            init={{
              plugins:
                "advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss  insertdatetime link linkchecker lists media nonbreaking pagebreak preview quickbars save searchreplace table  template tinydrive visualblocks visualchars wordcount",
              toolbar1:
                "undo redo| removeformat fontfamily fontsize blocks bold italic strikethrough underline subscript superscript | alignleft aligncenter alignright alignjustify alignnone lineheight indent outdent | fullscreen help",
              toolbar2:
                "preview selectall copy cut paste pastetext searchreplace spellcheckdialog spellchecker | insertdatetime charmap checklist bullist numlist casechange | pagebreak | ltr rtl | visualblocks visualchars | hr wordcount",
              toolbar3:
                "table tableinsertdialog advtablerownumbering tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader tableofcontents tableofcontentsupdate",
              toolbar4:
                "export emoticons image editimage fliph flipv rotateleft rotateright | link openlink unlink | media | backcolor forecolor",
            }}
          /> */}
          </div>
          <div className={styles.description}>
            <label>Title Bottom</label>
            <input
              type="text"
              name="titleBottom"
              value={aboutUsEditForm.titleBottom}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Description Bottom</label>
            <textarea
              name="descriptionBottom"
              rows={30}
              value={aboutUsEditForm.descriptionBottom}
              onChange={collectAboutUsData}
            />
          </div>
        </div>

        <h2>Change photo</h2>

        <div className={styles.photo}>
          <img
            src={baseURL + "/api/files/" + aboutUsEditForm.image1}
            alt=""
            style={{
              width: "300px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <img
            src={baseURL + "/api/files/" + aboutUsEditForm.image2}
            alt=""
            style={{
              width: "300px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <br />
          <label>Enter new number for photo 1:</label>
          <input
            type="text"
            name="image1"
            value={aboutUsEditForm.image1}
            onChange={collectAboutUsData}
          />
          <div className={styles.photo}>
            <label>Enter new number for photo 2:</label>
            <input
              type="text"
              name="image2"
              value={aboutUsEditForm.image2}
              onChange={collectAboutUsData}
            />
          </div>
        </div>

        <h2>Save all changes</h2>
        <button type="submit" className={styles.create_btn}>
          Save changes
        </button>
      </form>

        <h2>Load new photo</h2>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png"
      // style={{ display: "none" }}
      />
      <br />
      <div className={styles.form_field}>
        <label>new № photo </label>
        <input
          type="text"
          name="linkVar"
          value={linkVar}
          readOnly
        />
      </div>
      <button onClick={() => handleFileUploading()}>Send File</button>
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
