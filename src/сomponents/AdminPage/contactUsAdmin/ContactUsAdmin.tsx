import { useEffect, useState } from "react";
import axios from "axios";
import { IRequestDto } from "../../ContactUs/interfaces/IRequestDto";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GoogleMapAdmin from "./GoogleMapAdmin";
import linkToServer from "../../globalLinkToServer";
import AddressAdmin from "./AddressAdmin";

export default function ContactUsAdmin(): JSX.Element {
  const [requests, setRequests] = useState<IRequestDto[]>([]);
  const [reloadPage, setReloadPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${linkToServer}/api/requests`);
        const requestsDto = response.data;
        const reversedRequests = requestsDto.requests.slice().reverse();
        setRequests(reversedRequests);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  }, [reloadPage]);

  const handleDeleteRequest = (idRequest: number) => {
    const fetchData = async () => {
      try {
        const response = await axios.delete(
          `${linkToServer}/api/requests/${idRequest}`
        );
        setReloadPage(response.data);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    };

    fetchData();
  };

  return (
    <>
      <div className="container">

        <AddressAdmin />
        <hr className="mb-5" />
        <GoogleMapAdmin />
        <hr className="mb-5" />

        <h2 className="mt-5">Requests received from users:</h2>
        {!requests.length && (
          <div className="container fs-4">
            [ There are no requests in the database ]
          </div>
        )}

        <div className="accordion m-4 mb-5" id="myAccordion">
          {requests.map(
            ({
              idRequest,
              creationTimeRequest,
              firstNameRequest,
              lastNameRequest,
              emailRequest,
              phoneRequest,
              textOfRequest,
            }) => (
              <div className="accordion-item" key={idRequest}>
                <h2
                  className="accordion-header d-flex justify-content-between"
                  id={`heading${idRequest}`}
                >
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    title="Delete this request from Data Base"
                    onClick={() => handleDeleteRequest(+idRequest)}
                  >
                    X
                  </button>
                  <button
                    type="button"
                    title="Click here to see request details"
                    className="accordion-button collapsed fs-5"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idRequest}`}
                  >
                    <p>
                      {firstNameRequest} {lastNameRequest} <br />
                      email: {emailRequest} <br /> phone number: {phoneRequest}
                    </p>
                    <p className="ms-auto">{creationTimeRequest}</p>
                  </button>
                </h2>

                <div
                  id={`collapse${idRequest}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#myAccordion"
                >
                  <div className="card-body bg-light">
                    <p className="fs-4 p-3" style={{ lineHeight: "1.5" }}>
                      {textOfRequest}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
