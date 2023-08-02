import { useEffect, useState } from "react";
import axios from "axios";
import { IRequestDto } from "../../ContactUs/interfaces/IRequestDto";

export default function ContactUsAdmin(): JSX.Element {
  const [requests, setRequests] = useState<IRequestDto[]>([]);
  const [reloadPage, setReloadPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/requests");
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
          `http://localhost:8080/api/requests/${idRequest}`
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
        <h2>Requests received from users:</h2>
        {!requests.length && <div className="container fs-4">[ There are no requests in the database ]</div>}

        <div className="accordion m-4" id="myAccordion">
          {requests.map(
            (
              {
                idRequest,
                creationTimeRequest,
                firstNameRequest,
                lastNameRequest,
                emailRequest,
                phoneRequest,
                textOfRequest,
              },
              index
            ) => (
              <div className="accordion-item" key={index}>
                <h2
                  className="accordion-header d-flex justify-content-between"
                  id={`heading${idRequest}`}
                >
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    onClick={() => handleDeleteRequest(+idRequest)}
                  >
                    Х
                  </button>
                  <button
                    type="button"
                    className="accordion-button collapsed fs-5"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idRequest}`}
                  >
                    <p>{firstNameRequest} {lastNameRequest} <br/>
                    email: {emailRequest} <br/> phone number: {phoneRequest}</p>
                    <p className="ms-auto">{creationTimeRequest}</p>
                  </button>
                </h2>

                <div
                  id={`collapse${idRequest}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#myAccordion"
                >
                  <div className="card-body bg-light">
                    <p className="fs-4 p-3">{textOfRequest}</p>
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
