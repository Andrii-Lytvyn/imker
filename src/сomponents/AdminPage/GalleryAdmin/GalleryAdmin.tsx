import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import linkToServer from "../../globalLinkToServer";
import { IGalleryPhotos, initIFilesListDto } from "./interfaces/IGalleryPhotos";

export default function GalleryAdmin(): JSX.Element {
  const [{ photos, count, pages }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 5;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `${linkToServer}/api/gallery?page=0&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
        );
        setFilesList(response.data);
        console.log(response.data);
        setCurrentPage(1);
        console.log(photos, count, pages);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfFiles();
  }, []);

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `${linkToServer}/api/gallery?page=${value - 1}&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
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
        await axios.delete(`${linkToServer}/api/gallery/delete/${id}`);

        const response = await axios.get(
          `${linkToServer}/api/gallery?page=${
            currentPage - 1
          }&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
        );
        setFilesList(await response.data);
      } catch (error) {
        console.error("Error during file deletion:", error);
      }
    }
  };

  return (
    <div className="container col-md-12 mt-3 mb-5">
      <p className="fs-4">Total files: {count}</p>
      <div className="col-md-12 d-flex justify-content-center mt-3 mb-4">
        <Pagination
          count={pages}
          page={currentPage}
          size="large"
          onChange={getAnotherPage}
        />
      </div>
      {photos.map(({ id, linkToImg }) => (
        <div key={id}>
          <hr />
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(+id);
            }}
          >
            Delete this image from Data Base
          </button>

          <div className="col-md-12 d-flex align-items-center mt-3 mb-4">
            <div className="col-md-5 m-2">
              <img
                src={linkToServer + "/api/files/" + linkToImg}
                alt="image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "600px",
                  height: "300px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      ))}
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
  );
}
