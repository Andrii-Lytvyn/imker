import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import {
  IUserAccountInfo,
  initIUserAccountInfo,
} from "./interfaces/IUserAccountInfo";

export default function UserSettings(): JSX.Element {
  const [{ id, name, email, phone, plz, image }, setNewEditFormData] =
    useState<IUserAccountInfo>(initIUserAccountInfo);
  const [value, setValue] = useState<string>();
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const width = 900;
  const height = 350;

  const collectNewUserData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveUser = async () => {
      let linkVar: string | undefined = undefined;

      if (imageData && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const response = await axios.post(
            `$/api/files/upload?width=${width}&height=${height}&category=POST`,
            formData
          );
          linkVar = response.data.id.toString();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }

      try {
        await axios.put(`/api/users/${id}`, {
          name, 
          email, 
          phone, 
          plz, 
          image: linkVar || image
        });
      } catch (error) {
        console.error(
          "There was an error when sending a posts data to Back:",
          error
        );
      }

      toast.success("Your post has been successfully sent!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setValue("");
      window.location.reload();
    
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
    <>
      <div className="container containerPostCreate">
        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="titlePost" className="col-md-2 me-2 text-end">
            Title:
          </label>
          <input
            className="form-control fs-5"
            name="titlePost"
            defaultValue={titlePost}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label
            htmlFor="shortPostDescription"
            className="col-md-2 me-2 text-end"
          >
            Short description:
          </label>
          <input
            className="form-control fs-5"
            name="shortPostDescription"
            defaultValue={shortPostDescription}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="authorName" className="col-md-2 me-2 text-end">
            Author name:
          </label>
          <input
            className="form-control fs-5"
            name="authorName"
            defaultValue={authorName}
            onChange={collectNewUserData}
          />
        </div>

        <div className="d-flex align-items-center m-2">
          <div className="col-md-12 me-2 text-end">
            <p className="mb-2 text-start fs-5">Image Id: {linkToImg}</p>
            <p className="mb-2 text-start fs-6">
              Recommended resolution: {width}x{height}px
            </p>
            <img
              src={linkToServer + "/api/files/" + linkToImg}
              alt="image"
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
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
              width: "100%",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        )}

        <Editor
          apiKey="h2bfbarjdz9czdunh8t6splenye1zsn4q2t3lc4m8q5fqg56"
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            setText(editor.getContent({ format: "html" }));
          }}
          onInit={(_, editor) => {
            setText(editor.getContent({ format: "html" }));
          }}
          initialValue={initText}
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

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleSaveUser}
        >
          Save post to Data Base
        </button>
      </div>
    </>
  );
}
