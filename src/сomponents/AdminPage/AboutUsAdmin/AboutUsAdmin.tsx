import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import styles from "./TeamAdmin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseURL from "../../globalLinkToServer";
import { IAboutUs } from "../../AboutUs/interfaces/IAboutUs";
// import { Editor } from "tinymce";

const initAboutUs = {
  id: 1,
  titleTop: "",
  descriptionTop: "",
  titleBottom: "",
  descriptionBottom: "",
  image1: "",
  image2: "",
}

// interface AboutUsEditAdminProps {
//   location: {
//     state: IAboutUs;
//   };
// }

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
  //props: AboutUsEditAdminProps

  // const {id} = useParams();
  // const [
  //   {
  //     1,
  //     titleTop,
  //     descriptionTop,
  //     titleBottom,
  //     descriptionBottom,
  //     image1,
  //     image2,
  //   },
  //   setAboutUsEditForm1,
  // ] = useState<IAboutUs>(props.location.state);
  
  // const [value, setValue] = useState<string>();

  const id = 1;
  const navigate = useNavigate();
  const [aboutUsEditForm, setAboutUsEditForm] = useState(initAboutUs);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const width = 300;
  const height = 300;
  const category = "AVATAR";


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/aboutus/${id}`);
        setAboutUsEditForm(response.data);
        console.log("🚀 47 ~ fetchData ~ response:", response)
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

  const aboutUsFormData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let linkVar: string = "";

    if (imageData && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          `${baseURL}/api/files/upload?width=${width}&height=${height}&category=${category}`,
          formData
        );
        linkVar = response.data.id.toString();
      } catch (error) {
        console.error("🚀Error uploading file:🚀 ", error);
      }
    }

    const editAboutUs = {
      ...aboutUsEditForm,
      image: linkVar,
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
            <label>Title Top</label>
            <input
              type="text"
              name="name"
              value={aboutUsEditForm.titleTop}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Description Top</label>
            <textarea
              name="position"
              rows={30}
              value={aboutUsEditForm.descriptionTop}
              onChange={collectAboutUsData}
            />
          </div>

          {/* <Editor
          apiKey="h2bfbarjdz9czdunh8t6splenye1zsn4q2t3lc4m8q5fqg56"
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            setText(editor.getContent({ format: "html" }));
          }}
          onInit={(_, editor) => {
            setText(editor.getContent({ format: "html" }));
          }}
          initialValue={aboutUsEditForm.titleTop}
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
        />
 */}
          <div className={styles.description}>
            <label>Title Bottom</label>
            <input
              type="text"
              name="description"
              value={aboutUsEditForm.titleBottom}
              onChange={collectAboutUsData}
            />
          </div>
          <div className={styles.description}>
            <label>Description</label>
            <textarea
              name="description"
              rows={30}
              value={aboutUsEditForm.descriptionBottom}
              onChange={collectAboutUsData}
            />
          </div>
        </div>

        <div className={styles.photo}>
          <label>Photo 1</label><br/>
          <img
            src={baseURL + "/api/files/" + aboutUsEditForm.image1}
            alt=""
            style={{
              width: "600px",
              maxWidth: "600px",
              height: "auto",
            }}
          />
        </div>
        <label htmlFor="fileInput" className="file-upload">
          Choose another image
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          required
          style={{ display: "none" }}
        />
        <br />
        {imageData && (
          <img
            src={imageData}
            alt="Image"
            style={{
              width: "600px",
              maxWidth: "600px",
              height: "auto",
            }}
          />
        )}

<div className={styles.photo}>
          <label>Photo 2</label>
          <img
            src={baseURL + "/api/files/" + aboutUsEditForm.image2}
            alt=""
            style={{
              width: "600px",
              maxWidth: "600px",
              height: "auto",
            }}
          />
        </div>
        <label htmlFor="fileInput" className="file-upload">
          Choose another image
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          required
          style={{ display: "none" }}
        />
        <br />
        {imageData && (
          <img
            src={imageData}
            alt="Image"
            style={{
              width: "600px",
              maxWidth: "600px",
              height: "auto",
            }}
          />
        )}
        <button type="submit" className={styles.create_btn}>
          Save changes
        </button>
      </form>
    </div>
  );
}
