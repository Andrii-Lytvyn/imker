import { ChangeEvent, FormEvent, useState } from "react";
import InputMask from "react-input-mask";
import styles from "./ContactUs.module.css";
import { initContacUsForm } from "./interfaces/IContactUsForm";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contacts(): JSX.Element {
  const [
    { firstName, lastName, email, phoneNumber, questionText },
    setContactFormData,
  ] = useState(initContacUsForm);
  const maxLength = 500;
  const [charLeft, setCharLeft] = useState(maxLength);

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
      <div className={styles.topImgContainer}>
        <p className={styles.topImgText + " " + "text-center"}>CONTACT US</p>
      </div>

      <div className="container">
        <p className={styles.askText + " " + "text-center mb-4"}>
          Have a question for us?
        </p>

        <form onSubmit={handleCreateRequest}>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center">
              <label
                htmlFor="firstNameInput"
                className="col-md-2 me-2 text-end"
              >
                First Name*:
              </label>
              <input
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={collectAboutUsData}
                required
              />
            </div>

            <div className="col-md-7 d-flex align-items-center">
              <label
                htmlFor="emailInput"
                className="col-md-4 form-label me-2 text-end"
              >
                Email address*:
              </label>
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
          </div>

          <div className="row mt-3">
            <div className="col-md-5 d-flex align-items-center">
              <label htmlFor="lastNameInput" className="col-md-2 me-2 text-end">
                Last Name*:
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={collectAboutUsData}
                required
              />
            </div>

            <div className="col-md-7 d-flex align-items-center">
              <label
                htmlFor="phoneNumberInput"
                className="col-md-4 me-2 text-end"
              >
                Phone number:
              </label>
              <InputMask
                mask="+4 9(999) 999-9999"
                className="form-control"
                type="tel"
                placeholder="+4 _(___) ___-____"
                name="phoneNumber"
                value={phoneNumber}
                onChange={collectAboutUsData}
              />
            </div>
          </div>
          <p className="form-text text-center mt-4">
            We'll never share your data with anyone else
          </p>
          <div className="mb-3 mt-4">
            <textarea
              className="form-control"
              id="questionTextInput"
              rows={4}
              maxLength={maxLength}
              placeholder="leave your question here..."
              name="questionText"
              value={questionText}
              onChange={collectAboutUsData}
              required
            />
            <p className="form-text m-2">{charLeft} characters remaining</p>
          </div>
          <div className="d-flex justify-content-center">
            <button
              id="liveToastBtn"
              type="submit"
              className="btn btn-primary "
            >
              Send request
            </button>
          </div>
        </form>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2416.3096482125134!2d9.61041657185848!3d52.72660458996256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b05c9680b0b6d1%3A0x56f0e67cfd5ecb98!2sWalsroder%20Str.%203%2C%2029693%20Eickeloh!5e0!3m2!1sru!2sde!4v1690814421367!5m2!1sru!2sde"
        className={styles.map}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
