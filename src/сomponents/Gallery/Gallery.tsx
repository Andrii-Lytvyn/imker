import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import axios from "axios";
import { Pagination } from "@mui/material";
import Modal from "./Modal/Modal";
import { Container } from "react-bootstrap";
import linkToServer from "../globalLinkToServer";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";

const Gallery = (): JSX.Element => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>("");

  const [{ photos, pages }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 12;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `${linkToServer}/api/gallery?page=0&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
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
        `${linkToServer}/api/gallery?page=${
          value - 1
        }&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`
      );
      setFilesList(await response.data);
      setCurrentPage(value);
    } catch (error) {
      console.error("Error during request execution:", error);
    }
  };

  const modalShow = (linkToImg: number) => {
    setIsModalShow(true);
    setModalImage(""+linkToImg);
  };

  return (
    <div>
      <h2>Our gallery</h2>
      <Container>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
          perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus
          commodi ducimus nisi esse repellendus ratione molestias sit magni
          soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Distinctio perspiciatis laboriosam
          animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi
          esse repellendus ratione molestias sit magni soluta perferendis vero
          pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
          accusamus commodi ducimus nisi esse repellendus ratione molestias sit
          magni soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Distinctio perspiciatis laboriosam
          animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi
          esse repellendus ratione molestias sit magni soluta perferendis vero
          pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium
          accusamus commodi ducimus nisi esse repellendus ratione molestias
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </Container>
      <Container>
        <div className={styles.gallery_container}>
          <ul className={styles.grid}>
            {photos.map((item) => (
              <li key={item.id} className={styles.card}>
                <img
                  id={item.id}
                  src={linkToServer + "/api/files/" + item.linkToImg}
                  alt={item.id}
                  className={styles.card_item}
                  onClick={() => modalShow(item.linkToImg)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.pagination_container}>
            <Pagination
              count={pages}
              page={currentPage}
              size="large"
              onChange={getAnotherPage}
            />
          </div>
        </div>
        {isModalShow && 
          <Modal
            setModalHide={setIsModalShow}
            modalImage={linkToServer + "/api/files/" + modalImage}
          />
        }
      </Container>
    </div>
  );
};

export default Gallery;
