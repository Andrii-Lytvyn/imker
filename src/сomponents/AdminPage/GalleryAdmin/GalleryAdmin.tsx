import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import { IGalleryPhotos, initIFilesListDto } from "./interfaces/IGalleryPhotos";
import FilesUpload from "./FilesUpload";

export default function GalleryAdmin(): JSX.Element {
  const [{ photos, count, pages }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const [reloading, setReloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 12;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/gallery?page=0&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
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
        `/api/gallery?page=${
          value - 1
        }&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`,
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
        await axios.delete(`/api/gallery/delete/${id}`, {
          withCredentials: true,
        });

        const response = await axios.get(
          `/api/gallery?page=${
            currentPage - 1
          }&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`,
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
        <p className="fs-3 mb-4">Add a new photo to the gallery</p>
        <FilesUpload handleReload={() => handleReload()} />
      </div>

      <div className="container col-md-12 mt-3 mb-5">
        <p className="fs-4">Total files in gallery: {count}</p>
        <div className="col-md-12 d-flex justify-content-center mt-3 mb-4">
          <Pagination
            count={pages}
            page={currentPage}
            size="large"
            onChange={getAnotherPage}
          />
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
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
                    Delete this image from gallery
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
    </>
  );
}
