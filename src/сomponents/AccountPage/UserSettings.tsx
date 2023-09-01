import axios from "axios";
import { ChangeEvent, useState } from "react";
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
          <label htmlFor="name" className="col-md-2 me-2 text-end">
            My name:
          </label>
          <input
            className="form-control fs-5"
            name="name"
            defaultValue={name}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label
            htmlFor="email"
            className="col-md-2 me-2 text-end"
          >
            My email:
          </label>
          <input
            className="form-control fs-5"
            type="email"
            name="email"
            defaultValue={email}
            onChange={collectNewUserData}
            required
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="phone" className="col-md-2 me-2 text-end">
            My phone number:
          </label>
          <input
            className="form-control fs-5"
            name="phone"
            defaultValue={phone}
            onChange={collectNewUserData}
          />
        </div>

        <div className="d-flex align-items-center fs-4 m-2">
          <label htmlFor="plz" className="col-md-2 me-2 text-end">
            My Postleitzahlen:
          </label>
          <input
            className="form-control fs-5"
            name="plz"
            defaultValue={plz}
            onChange={collectNewUserData}
          />
        </div>

        <div className="d-flex align-items-center m-2">
          <div className="col-md-12 me-2 text-end">
            <p className="mb-2 text-start fs-5">Image Id: {image}</p>
            <p className="mb-2 text-start fs-6">
              Recommended resolution: {width}x{height}px
            </p>
            <img
              src={"/api/files/" + image}
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

        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={handleSaveUser}
        >
          Update my Data
        </button>
      </div>
    </>
  );
}
