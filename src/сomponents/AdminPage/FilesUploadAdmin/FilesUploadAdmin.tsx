import { ChangeEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IFilesListDto, initIFilesListDto } from "./interfaces/IFilesListDto";
import { Pagination } from "@mui/material";
import axios from "axios";

export default function FilesUploadAdmin(): JSX.Element {
  const [{ files, count, pages }, setFilesList] =
    useState<IFilesListDto>(initIFilesListDto);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
  const itemsOnPage = 5;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/files?page=0&items=${itemsOnPage}`,
          {
            withCredentials: true,
          }
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
        `/api/files?page=${value - 1}&items=${itemsOnPage}`,
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

  const handleDelete = async () => {
    if (selectedFileId !== null) {
      try {
        await axios.delete(`/api/files/delete/${selectedFileId}`, {
          withCredentials: true,
        });
        setShowConfirmModal(false);
        setSelectedFileId(null);

        const response = await axios.get(
          `/api/files?page=${currentPage - 1}&items=${itemsOnPage}`,
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
      {files.map(
        ({
          id,
          creationTime,
          category,
          originalName,
          storedName,
          fileType,
          size,
        }) => (
          <div key={id}>
            <hr />
            <button
              className="btn btn-danger"
              onClick={() => {
                setSelectedFileId(+id);
                setShowConfirmModal(true);
              }}
            >
              Delete this image from Data Base
            </button>

            <div className="col-md-12 d-flex align-items-center mt-3 mb-4">
              <div className="col-md-5 m-2">
                <img
                  src={"/api/files/" + id}
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
              <div className="col-md-8 ms-4">
                <p>
                  <span style={{ fontWeight: "bold" }}>Image id:</span> {id}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                  {category}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>Created: </span>
                  {new Date(creationTime).toLocaleString()}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>Original name:</span>{" "}
                  {originalName}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>Stored name:</span>{" "}
                  {storedName}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>File type:</span>{" "}
                  {fileType}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>File size:</span> {size}{" "}
                  bytes
                </p>
              </div>
            </div>
          </div>
        )
      )}
      <hr />
      <div className="col-md-12 d-flex justify-content-center mt-3 mb-4">
        <Pagination
          count={pages}
          page={currentPage}
          size="large"
          onChange={getAnotherPage}
        />
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this file? <br />
          <br /> NOTICE: Upon deleting an image from the database, it will
          become unavailable when attempting to display it on the website,
          leading to errors. Make sure this image is no longer in use before
          proceeding with its deletion.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
