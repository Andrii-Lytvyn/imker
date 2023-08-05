import axios from "axios";
import { ChangeEvent, useState } from "react";
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

  const collectNewPostData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewEditFormData((prev) => ({
      ...prev,
      [name]: value,
      textOfPost: text,
      authorId: "1",
    }));
  };

  async function handlerSavePost() {
    if (text.trim()) {
      try {
        await axios.put(`http://localhost:8080/api/posts/update/${idPost}`, {
          titlePost,
          linkToImg,
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
    }
    setValue("");
    window.location.reload();
  }

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
            Link to Img:
          </label>
          <input
            className="form-control fs-5"
            name="linkToImg"
            defaultValue={linkToImg}
            onChange={collectNewPostData}
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
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "html" }));
          }}
          initialValue={initText}
          value={value}
          init={{
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
            toolbar1:
              "undo redo| removeformat fontfamily fontsize blocks bold italic strikethrough underline subscript superscript | alignleft aligncenter alignright alignjustify alignnone lineheight indent outdent | fullscreen help",
            toolbar2:
              "preview selectall copy cut paste pastetext searchreplace spellcheckdialog spellchecker | insertdatetime charmap checklist bullist numlist casechange | pagebreak | ltr rtl | visualblocks visualchars | hr wordcount",
            toolbar3: "",
            toolbar4:
              "table tableinsertdialog advtablerownumbering tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader tableofcontents tableofcontentsupdate",
            toolbar5:
              "export emoticons image editimage fliph flipv rotateleft rotateright | link openlink unlink | media | backcolor forecolor",
          }}
        />

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handlerSavePost}
        >
          Save post to Data Base
        </button>
      </div>
    </>
  );
}
