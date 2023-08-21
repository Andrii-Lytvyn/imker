import React, { useState } from "react";
import { toast } from "react-toastify";

export default function GoogleMapAdmin(): JSX.Element {
  const htmlString =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9710.93895466906!2d13.392481562341327!3d52.52013943017145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sde!4v1692571824083!5m2!1sru!2sde" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

  const [googleMapLink, setGoogleMapLink] = useState<string | null>(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [wrongLink, setWrongLink] = useState(false);

  const getGoogleMapLink = (html: string): string | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const iframe = doc.querySelector("iframe");
    const src = iframe?.getAttribute("src") || "";
    return src;
  };

  const updateGoogleMapLink = () => {
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
