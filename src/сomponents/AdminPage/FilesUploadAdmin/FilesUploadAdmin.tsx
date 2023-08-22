import { ChangeEvent, useEffect, useState } from "react";
import { IFilesListDto, initIFilesListDto } from "./interfaces/IFilesListDto";
import { Pagination } from "@mui/material";
import axios from "axios";

export default function FilesUploadAdmin(): JSX.Element {
  const [{ files, count, pages }, setFilesList] =
    useState<IFilesListDto>(initIFilesListDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 5;
  const linkToServer = "http://localhost:8080";

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `${linkToServer}/files?page=0&items=${itemsOnPage}`
        );
        setFilesList(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfFiles();
  }, []);

  const getAnotherPage = async (_: ChangeEvent<unknown>, value: number) => {
    try {
      const response = await axios.get(
        `${linkToServer}/files?page=${value - 1}&items=${itemsOnPage}`
      );
      setFilesList(await response.data);
      setCurrentPage(value);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  return (
    <div className="container" >
      <p>Total files: {count}</p>
      <Pagination
        count={pages}
        page={currentPage}
        size="large"
        onChange={getAnotherPage}
      />
      {files.map(
        ({ id, creationTime, originalName, storedName, fileType, size }) => (
          <div key={id}>
            <hr />
            <div className="col-md-12 d-flex align-items-center mt-3 mb-4">
              <div className="col-md-5 m-2">
                <img
                  src={linkToServer + "/files/" + id}
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
              <div className="col-md-8 fs-4 ms-4">
                <p>Image id: {id}</p>
                <p>Created: {creationTime}</p>
                <p>Original name: {originalName}</p>
                <p>Stored name: {storedName}</p>
                <p>File type: {fileType}</p>
                <p>File size: {size} bytes</p>
              </div>
            </div>
          </div>
        )
      )}
      <hr />
      <Pagination
        count={pages}
        page={currentPage}
        size="large"
        onChange={getAnotherPage}
      />
    </div>
  );
}
