import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface FilesUploadProps {
  handleReload(): void;
}

export default function FilesUpload({
  handleReload,
}: FilesUploadProps): JSX.Element {
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const width = 900;
  const height = 900;

  async function handleFileUploading() {
    if (imageData && selectedFile) {
      let linkVar: string | undefined = undefined;

      if (imageData && selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const response = await axios.post(
            `/api/files/upload?width=${width}&height=${height}&category=GALLERY`,
            formData,
            {
              withCredentials: true,
            }
          );
          linkVar = response.data.id.toString();
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }

      if (linkVar) {
        try {
          await axios.post(
            `/api/gallery`,
            {
              linkToImg: linkVar,
            },
            {
              withCredentials: true,
            }
          );

          toast.success("Your photo has been successfully sent!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          setSelectedFile(null);
          setImageData(null);
          handleReload();
        } catch (error) {
          console.error(
            "There was an error when sending a photo data to Back:",
            error
          );
        }
      }
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
    <div>
      <p className="col-md-7 mb-2 text-start fs-5">Recommended format 4:3</p>
      <p className="col-md-7 mb-2 text-start fs-5">
        Maximum resolution: {width}x{height}px
      </p>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <button onClick={() => handleFileUploading()}>Send File</button>
      )}
      <br />
      {imageData && (
        <img
          src={imageData}
          alt="Image"
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            margin: "5px",
          }}
        />
      )}
    </div>
  );
}
