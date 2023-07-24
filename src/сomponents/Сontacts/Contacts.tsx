import { FormEvent, useRef } from "react";
import InputMask from "react-input-mask";
import styles from "./Contacts.module.css";

interface RequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  questionText: string;
}

export default function Contacts(): JSX.Element {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const phoneNumberInput = useRef<HTMLInputElement | null>(null);
  const questionTextInput = useRef<HTMLTextAreaElement>(null);

  const handleCreateRequest = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const requestDto: RequestDto = {
      firstName: firstNameInput.current ? firstNameInput.current.value : "none",
      lastName: lastNameInput.current!.value,
      email: emailInput.current!.value,
      phoneNumber: phoneNumberInput.current!.value,
      questionText: questionTextInput.current
        ? questionTextInput.current.value
        : "none",
    };
    console.log(requestDto);
  };

  return (
    <>
      <div className={styles.topImgContainer}>
        <p className={styles.topImgText + " " + "text-center"}>CONTACT US</p>
      </div>

      <div className="container">
        <form onSubmit={handleCreateRequest}>
          <p className={styles.askText + " " + "text-center mb-4"}>
            Have a question for us?
          </p>

          <div className="row">
            <div className="col-md-5 d-flex align-items-center">
              <label
                htmlFor="firstNameInput"
                className="col-md-2 me-2 text-end"
              >
                First Name:
              </label>
              <input
                type="text"
                id="firstNameInput"
                className="form-control"
                ref={firstNameInput}
                required
              />
            </div>

            <div className="col-md-7 d-flex align-items-center">
              <label
                htmlFor="emailInput"
                className="col-md-4 form-label me-2 text-end"
              >
                Email address:
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="name@example.com"
                ref={emailInput}
                required
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-5 d-flex align-items-center">
              <label htmlFor="lastNameInput" className="col-md-2 me-2 text-end">
                Last Name:
              </label>
              <input
                type="text"
                id="lastNameInput"
                className="form-control"
                ref={lastNameInput}
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
                id="phoneInput"
                className="form-control"
                type="tel"
                name="phone"
                inputRef={(input: HTMLInputElement) =>
                  (phoneNumberInput.current = input)
                }
                placeholder="+4 _(___) ___-____"
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
              placeholder="leave your question here..."
              ref={questionTextInput}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary ">
              Send request
            </button>
          </div>
        </form>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2496.0557492735993!2d9.550200215761414!3d51.273292879597356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4171b847e72346ef%3A0x75016efb7b949f29!2sPaseka%20Alexander%20Dr.med.!5e0!3m2!1sru!2sde!4v1690137506768!5m2!1sru!2sde"
        className={styles.map}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
