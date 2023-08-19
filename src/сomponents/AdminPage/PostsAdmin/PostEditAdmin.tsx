import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { IPostDto } from "../../Posts/interfaces/IPostDTO";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

interface PostEditAdminProps {
  location: {
    state: IPostDto;
  };
}

export default function PostEditAdmin(props: PostEditAdminProps): JSX.Element {
  const [
    {
      idPost,
      titlePost,
      linkToImg,
      shortPostDescription,
      textOfPost,
      authorId,
    },
    setNewEditFormData,
  ] = useState<IPostDto>(props.location.state);
  const [text, setText] = useState("");
  const initText = textOfPost;
  const [value, setValue] = useState<string>();
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const linkToServer = "http://localhost:8080";
  const width = 1000;
  const height = 300;


  const collectNewPostData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEditFormData((prev) => ({
      ...prev,
      [name]: value,
      textOfPost: text,
      authorId: "1",
    }));
  };

  const handleSavePost = async () => {
    // e.preventDefault();
    if (text.trim() != "") {
      let linkVar: string | undefined = undefined;

      if (imageData && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
  
        try {
          const response = await axios.post(
            `${linkToServer}/files/upload?width=${width}&height=${height}`,
            formData
          );
          linkVar = response.data.id.toString();
          console.log("File uploaded:", linkVar);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }


      try {
        await axios.put(`${linkToServer}/api/posts/update/${idPost}`, {
          titlePost,
          linkToImg: linkVar || linkToImg,
          shortPostDescription,
          textOfPost: text,
          authorId,
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
    }
  }

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
            onChange={collectNewPostData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="linkToImg" className="col-md-2 me-2 text-end">
            Link to Img: {linkToImg}
          </label>
          <div>
              <input type="file" onChange={handleFileChange} />
              <br />
              {imageData && <img src={imageData} alt="Image" />}
            </div>



          {/* <input
            className="form-control fs-5"
            name="linkToImg"
            defaultValue={linkToImg}
            onChange={collectNewPostData}
            required
          /> */}
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
            onChange={collectNewPostData}
            required
          />
        </div>

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
          onClick={handleSavePost}
        >
          Save post to Data Base
        </button>
      </div>
    </>
  );
}
