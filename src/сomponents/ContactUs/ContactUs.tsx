import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import styles from "./ContactUs.module.css";
import { initContacUsForm } from "./interfaces/IContactUsForm";
import axios from "axios";
import { toast } from "react-toastify";
import linkToServer from "../globalLinkToServer";
import {Container} from "react-bootstrap";
import {SlEnvolope, SlHome, SlPhone} from "react-icons/sl";

export default function Contacts(): JSX.Element {
  const [
    { firstName, lastName, email, phoneNumber, questionText },
    setContactFormData,
  ] = useState(initContacUsForm);
  const maxLength = 500;
  const [charLeft, setCharLeft] = useState(maxLength);
  const [googleMap, setGoogleMap] = useState("");

  useEffect(() => {
    const getGoogleMapLink = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/googlemap`);
        const { googleMapLink } = response.data;
        setGoogleMap(googleMapLink );
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
      await axios.post("http://localhost:8080/api/requests", {
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

    toast.success("Your request has been successfully sent!", {
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
      <div className={styles.contacts_header}>
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
              <p>Adresse:Walsroder Straße, 3 Eickeloh, 29693</p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <SlPhone className={styles.icons} />
              <p>Phone: 0516-290-12-66</p>
            </div>
            <div className="d-flex align-items-center mt-3">
              <SlEnvolope className={styles.icons} />
              <p>E-mail:Imkerverein-Ahlden@t-online.de</p>
            </div>

            <iframe
                src={googleMap}
                // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2416.3096482125134!2d9.61041657185848!3d52.72660458996256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b05c9680b0b6d1%3A0x56f0e67cfd5ecb98!2sWalsroder%20Str.%203%2C%2029693%20Eickeloh!5e0!3m2!1sru!2sde!4v1690814421367!5m2!1sru!2sde"
                className={styles.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.contacts_right}>
            <h4>Rückmeldeformular:</h4>
            <hr />
            <form className={styles.contacts_form} onSubmit={handleCreateRequest}>
              <div className="d-flex flex-column">
                <div className={styles.contacts_input_div}>
                  <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      name="lastName"
                      value={lastName}
                      onChange={collectAboutUsData}
                      required
                  />
                </div>
                <div className={styles.contacts_input_div}>
                  <input
                      className="form-control"
                      placeholder="Vorname"
                      name="firstName"
                      value={firstName}
                      onChange={collectAboutUsData}
                      required
                  />
                </div>
                <div className={styles.contacts_input_div}>
                  <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      name="email"
                      value={email}
                      onChange={collectAboutUsData}
                      required
                  />
                </div>
                <div className={styles.contacts_input_div}>
                  <InputMask
                      mask="+49(999) 999-9999"
                      className="form-control"
                      type="tel"
                      placeholder="+49(___) ___-____"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={collectAboutUsData}
                  />
                </div>
              </div>
              <p className={styles.contacts_info}>
                We'll never share your data with anyone else
              </p>
              <div className="mb-3 mt-4">
            <textarea
                className="form-control"
                id="questionTextInput"
                rows={4}
                maxLength={maxLength}
                placeholder="Schreiben Sie hier Ihre Frage..."
                name="questionText"
                value={questionText}
                onChange={collectAboutUsData}
                required
            />
                <p className={styles.contacts_info_charLeft}><span>{charLeft}</span> characters remaining</p>
              </div>
              <div className="d-flex justify-content-center">
                <button
                    id="liveToastBtn"
                    type="submit"
                    className="button_imker"
                >
                  Send request
                </button>
              </div>
            </form>
          </div>
        </div>



      </Container>
    </>
  );
}
