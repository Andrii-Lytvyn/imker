import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import styles from "./ContactUs.module.css";
import { initContacUsForm } from "./interfaces/IContactUsForm";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { SlEnvolope, SlHome, SlPhone } from "react-icons/sl";
import { TextField } from "@mui/material";
import { IAddress, initIAddress } from "./interfaces/IAddress";

export default function Contacts(): JSX.Element {
  const [
    { firstName, lastName, email, phoneNumber, questionText },
    setContactFormData,
  ] = useState(initContacUsForm);
  const maxLength = 500;
  const [charLeft, setCharLeft] = useState(maxLength);
  const [googleMap, setGoogleMap] = useState("");
  const [{ address, phone: phoneAddr, email: emailAddr }, setAddress] =
    useState<IAddress>(initIAddress);

  useEffect(() => {
    const getGoogleMapLink = async () => {
      try {
        const response = await axios.get(`/api/googlemap`);
        const { googleMapLink } = response.data;
        setGoogleMap(googleMapLink);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
      try {
        const response = await axios.get(`/api/address`);
        const getAddress = response.data;
        setAddress(getAddress);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    getGoogleMapLink();
  }, []);

  const collectAboutUsData = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactFormData((prev) => ({ ...prev, [name]: value }));

    if (questionText.length <= maxLength) {
      setCharLeft(maxLength - questionText.length);
    }
  };

  const handleCreateRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("/api/requests", {
        firstName,
        lastName,
        email,
        phoneNumber,
        questionText,
      });
    } catch (error) {
      console.error(
        "There was an error when sending a notification to Back:",
        error
      );
    }

    toast.success("Ihre Anfrage wurde erfolgreich gesendet!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    setContactFormData(initContacUsForm);
    setCharLeft(maxLength);
  };

  return (
    <>
      <div className={styles.contacts_main}>
        <div
          className={
            styles.contacts_header + " animate__animated animate__pulse "
          }
        >
          <h2>Kontakt </h2>
        </div>
        <h4 className={styles.contacts_h4}>Haben Sie eine Frage an uns?</h4>
        <Container>
          <div className="d-flex justify-content-between">
            <div className={styles.contacts_left}>
              <h4>Postadresse:</h4>
              <hr />
              <div className="d-flex align-items-center mt-5">
                <SlHome className={styles.icons} />
                <p>Adresse: {address}</p>
              </div>
              <div className="d-flex align-items-center mt-3">
                <SlPhone className={styles.icons} />
                <p>Phone: {phoneAddr}</p>
              </div>
              <div className="d-flex align-items-center mt-3">
                <SlEnvolope className={styles.icons} />
                <p>E-mail: {emailAddr}</p>
              </div>

              <iframe
                src={googleMap}
                className={styles.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className={styles.contacts_right}>
              <h4>Rückmeldeformular:</h4>
              <hr />
              <form
                className={styles.contacts_form}
                onSubmit={handleCreateRequest}
              >
                <div className="d-flex flex-column">
                  <div className={styles.contacts_input_div}>
                    <TextField
                      className="form-control"
                      label="Vorname"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={collectAboutUsData}
                      size="small"
                      fullWidth
                      required
                    />
                  </div>
                  <div className={styles.contacts_input_div}>
                    <TextField
                      className="form-control"
                      label="Name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={collectAboutUsData}
                      size="small"
                      fullWidth
                      required
                    />
                  </div>
                  <div className={styles.contacts_input_div}>
                    <TextField
                      className="form-control"
                      label="E-Mail"
                      type="email"
                      name="email"
                      value={email}
                      onChange={collectAboutUsData}
                      size="small"
                      fullWidth
                      required
                    />
                  </div>
                  <div className={styles.contacts_input_div}>
                    <InputMask
                      mask="+4 9(999) 999-9999"
                      className="form-control"
                      type="tel"
                      placeholder="+4 9(___) ___-____"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={collectAboutUsData}
                    />
                  </div>
                </div>
                <p className={styles.contacts_info}>
                  Wir werden Ihre Daten niemals mit jemand anderem teilen
                </p>
                <div className="mb-3 mt-4">
                  <textarea
                    className="form-control"
                    id="questionTextInput"
                    rows={8}
                    maxLength={maxLength}
                    placeholder="Schreiben Sie hier Ihre Frage..."
                    name="questionText"
                    value={questionText}
                    onChange={collectAboutUsData}
                    required
                  />
                  <p className={styles.contacts_info_charLeft}>
                    Noch {charLeft} Zeichen verfügbar
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    id="liveToastBtn"
                    type="submit"
                    className="button_imker"
                  >
                    Anfrage senden
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
