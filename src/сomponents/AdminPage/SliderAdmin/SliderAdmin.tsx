import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import { ISliderPhotos, initIFilesListDto } from "./interfaces/ISliderPhotos";
import SliderUpload from "./SliderUpload";

export default function SliderAdmin(): JSX.Element {
  const [{ photos, count, pages }, setFilesList] =
    useState<ISliderPhotos>(initIFilesListDto);
  const [reloading, setReloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/slider?page=0&items=${itemsOnPage}&orderBy=creationTimeSlider&desk=true`
        );
        setFilesList(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfFiles();
    setReloading(false);
  }, [reloading]);

  const handleReload = () => {
    setReloading(!reloading);
  };

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `/api/slider?page=${
          value - 1
        }&items=${itemsOnPage}&orderBy=creationTimeSlider&desk=true`,
        {
          withCredentials: true,
        }
      );
      setFilesList(await response.data);
      setCurrentPage(value);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (id !== null) {
      try {
        await axios.delete(`/api/slider/delete/${id}`, {
          withCredentials: true,
        });

        const response = await axios.get(
          `/api/slider?page=${
            currentPage - 1
          }&items=${itemsOnPage}&orderBy=creationTimeSlider&desk=true`,
          {
            withCredentials: true,
          }
        );
        setFilesList(await response.data);
      } catch (error) {
        console.error("Error during file deletion:", error);
      }
    }
  };

  return (
    <>
      <div className="container col-md-12 bg-light border rounded mt-4 p-4">
        <p className="fs-3 mb-4">Add a new slider</p>
        <SliderUpload handleReload={() => handleReload()} />
      </div>

      <div className="container mt-3 mb-5 p-2 rounded bg-white">
        <div className="col-md-12 mt-3 mb-5">
          <p className="fs-4">Total slider files: {count}</p>
          <div className="col-md-12 d-flex justify-content-center mt-3 mb-4">
            <Pagination
              count={pages}
              page={currentPage}
              size="large"
              onChange={getAnotherPage}
            />
          </div>

          <div className="row row-cols-1 row-cols-md-1 g-4">
            {photos.map(({ id, linkToImg }) => (
              <div key={id} className="col">
                <div
                  className="card h-100 border"
                  style={{
                    width: "100%",
                  }}
                >
                  <img
                    className="card-img-top mb-4"
                    src={"/api/files/" + linkToImg}
                    alt="image"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                  <div className="card-body">
                    <button
                      className="btn btn-danger position-absolute bottom-0 m-2"
                      onClick={() => {
                        handleDelete(+id);
                      }}
                    >
                      Delete this slider from DataBase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr />
          <div className="col-md-12 d-flex justify-content-center mt-3 mb-4">
            <Pagination
              count={pages}
              page={currentPage}
              size="large"
              onChange={getAnotherPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
