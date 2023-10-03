import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import axios from "axios";
import { Pagination } from "@mui/material";
import Modal from "./Modal/Modal";
import { Container } from "react-bootstrap";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";
import GallerySwiper2 from "../GallerySwiper/GallerySwiper2";

const Gallery = (): JSX.Element => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>("");

  const [{ photos, pages }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 12;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/gallery?page=0&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`,
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

  const modalShow = (linkToImg: number) => {
    setIsModalShow(true);
    setModalImage("" + linkToImg);
  };

  return (
    <div className={styles.gallery_main}>
      <div
          className={
              styles.gallery_bg +
              " d-flex align-items-center justify-content-center animate__animated animate__pulse"
          }
      >
        <h2>Galerie</h2>
      </div>
      <Container>
        <h3 className={styles.gallery_title}>Willkommen in unserer Galerie</h3>
        <br />
        <GallerySwiper2 />
        <br />
        <p>
          In unserer Galerie möchten wir Ihnen einen Einblick in die
          faszinierende Welt der Bienen und der Imkerei geben. Hier finden Sie
          eine Sammlung von beeindruckenden Fotos und Momentaufnahmen, die die
          Schönheit und Vielfalt unserer geflügelten Freunde sowie die Arbeit
          unserer engagierten Imkerinnen und Imker einfangen.
          <br />
          <br />
          In dieser Galerie entdecken Sie atemberaubende Aufnahmen von Bienen in
          Aktion, wie sie emsig Blüten bestäuben und den süßen Nektar sammeln.
          Wir zeigen Ihnen auch, wie unsere Imkerinnen und Imker mit Hingabe und
          Leidenschaft für die Bienenpflege sorgen. Sie werden die faszinierende
          Welt der Bienenstöcke erkunden können und erfahren, wie der Honig
          geerntet und verarbeitet wird.
          <br />
          <br />
          Wir laden Sie ein, unsere Galerie zu durchstöbern und sich von den
          wunderbaren Momenten und der Schönheit der Natur inspirieren zu
          lassen. Vielleicht entdecken Sie dabei auch Ihre eigene Leidenschaft
          für die Imkerei. Wenn Sie Fragen haben oder mehr über unsere Arbeit
          erfahren möchten, zögern Sie nicht, uns zu kontaktieren. Wir freuen
          uns darauf, Ihre Begeisterung für Bienen und Imkerei zu teilen.
        </p>
      </Container>
      <Container>
        <div className={styles.gallery_container}>
          <ul className={styles.grid}>
            {photos.map((item) => (
              <li key={item.id} className={styles.card}>
                <img
                  id={item.id}
                  src={"https://imker.fra1.cdn.digitaloceanspaces.com/" + item.linkToImg}
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
        {isModalShow && (
          <Modal
            setModalHide={setIsModalShow}
            modalImage={"/api/files/" + modalImage}
          />
        )}
      </Container>
    </div>
  );
};

export default Gallery;
