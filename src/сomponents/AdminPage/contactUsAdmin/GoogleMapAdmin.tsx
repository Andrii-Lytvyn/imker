import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function GoogleMapAdmin(): JSX.Element {
  const htmlString =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2416.311059522423!2d9.607656377097939!3d52.726579120913996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b05c9680b0b6d1%3A0x56f0e67cfd5ecb98!2sWalsroder%20Str.%203%2C%2029693%20Eickeloh!5e0!3m2!1sru!2sde!4v1692663876682!5m2!1sru!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

  const [googleMapLink, setGoogleMapLink] = useState<string | null>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [wrongLink, setWrongLink] = useState(false);
  const linkToServer = "http://localhost:8080";


  const getGoogleMapLink = (html: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const iframe = doc.querySelector("iframe");
    const src = iframe?.getAttribute("src") || "";
    return src;
  };

  const updateGoogleMapLink = async () => {
    try {
      await axios.put(`${linkToServer}/api/googlemap`, {
        id: 1,
        googleMapLink
      });
    } catch (error) {
      console.error(
        "There was an error when sending a googleMapLink to Back:",
        error
      );
    }

    setBtnDisabled(true);
    setGoogleMapLink(null);

    toast.success("New link has been successfully sent!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.startsWith('<iframe src="') &&
      e.target.value.endsWith('"></iframe>')
    ) {
      setGoogleMapLink(getGoogleMapLink(e.target.value));
      setBtnDisabled(false);
      setWrongLink(false);
    } else if (e.target.value.trim()==="") {
      setWrongLink(false);
      setBtnDisabled(true);
      setGoogleMapLink(null);
    } else {
      setWrongLink(true);
      setBtnDisabled(true);
      setGoogleMapLink(null);
    }
  };

  return (
    <>
      <div className="col-md-12 d-flex align-items-center mt-3 mb-4">
        <label
          className="col-md-3 fs-4 me-2 text-start"
          htmlFor="googleMapLink"
        >
          Change GoogleMap link:
        </label>
        <input
          className="form-control fs-5"
          type="text"
          name="googleMapLink"
          id="googleMapLink"
          placeholder={htmlString}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className={
            "col-md-2 btn m-2 " +
            (btnDisabled ? "btn-secondary" : "btn-primary")
          }
          onClick={updateGoogleMapLink}
          disabled={btnDisabled}
        >
          Save new link
        </button>
      </div>
      {wrongLink && <p style={{ textAlign: 'center', color: "red" }}>Wrong link!</p>}

      {googleMapLink && (
        <iframe
          src={googleMapLink}
          loading="lazy"
          style={{ width: "100%", height: "300px" }}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </>
  );
}
