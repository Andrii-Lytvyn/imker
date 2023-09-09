import axios from "axios";
import { Avatar } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IUserAccountInfo,
  initIUserAccountInfo,
} from "./interfaces/IUserAccountInfo";
import "../AdminPage/PostsAdmin/PostCreationAdmin.css";

export default function UserSettings(): JSX.Element {
  const [
    { id, name, email, phone, plz, image, role, state },
    setNewEditFormData,
  ] = useState<IUserAccountInfo>(initIUserAccountInfo);
  const [imageData, setImageData] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const width = 200;
  const height = 250;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/me`, {
          withCredentials: true,
        });
        const userDto = response.data;
        setNewEditFormData(userDto);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, []);

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
          `/api/files/upload?width=${width}&height=${height}&category=AVATAR`,
          formData
        );
        linkVar = response.data.id.toString();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    try {
      await axios.put(
        `/api/users/${id}`,
        {
          name,
          email,
          phone,
          plz,
          image: linkVar || image,
          role,
          state,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(
        "There was an error when sending a posts data to Back:",
        error
      );
    }

    toast.success("Your information has been successfully updated!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
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
      <div className="container">
        <div className="col-md-12 d-flex align-items-center fs-4 m-2">
          <label htmlFor="name" className="col-md-4 me-2 text-end">
            Mein Name:
          </label>
          <input
            className="form-control fs-5"
            name="name"
            defaultValue={name}
            maxLength={30}
            onChange={collectNewUserData}
          />
        </div>

        <div className="col-md-12 d-flex align-items-center fs-4 m-2">
          <label htmlFor="plz" className="col-md-4 me-2 text-end">
            Meine Postleitzahl:
          </label>
          <input
            className="form-control fs-5"
            name="plz"
            maxLength={5}
            defaultValue={plz}
            onChange={collectNewUserData}
          />
        </div>

        <div className="col-md-12 d-flex align-items-center fs-4 m-2">
          <label htmlFor="phone" className="col-md-4 me-2 text-end">
            Meine Telefonnummer:
          </label>
          <input
            className="form-control fs-5"
            name="phone"
            maxLength={20}
            defaultValue={phone}
            onChange={collectNewUserData}
          />
        </div>

        <div className="d-flex align-items-center flex-column m-3">
          <label htmlFor="fileInput" className="file_upload">
            Bild für mein Profilbild ändern
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".jpg, .jpeg"
            style={{ display: "none" }}
          />
          <p className="text-start fs-6">
            Empfohlene Auflösung: {width}x{height}px
          </p>
          {imageData && (
            <Avatar
              src={imageData}
              variant="rounded"
              sx={{ width: 200, height: 250, margin: 0, fontSize: 60 }}
            />
          )}
        </div>

        <button
          type="button"
          className="button_imker m-2"
          onClick={handleSaveUser}
        >
          Meine Informationen aktualisieren
        </button>
      </div>
    </>
  );
}
