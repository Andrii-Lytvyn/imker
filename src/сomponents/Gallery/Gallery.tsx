import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import axios from "axios";
import { imageObjRequest } from "./imgObj";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { IImgData } from "./interfaces/IImgData";
import Modal from "./Modal/Modal";
import {Container} from "react-bootstrap";

const baseURL = "https://63bb362a32d17a50908a3770.mockapi.io";

// получение картинок
const imgDataFromMockApi = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/user_login`);

    return data;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const Gallery = (): JSX.Element => {
  const imagesPerPage = 16;
  const [data, setDataImages] = useState<IImgData[]>([]);
  const [modalHide, setModalHide] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") ?? "1";

  useEffect(() => {
    const fetchImages = async () => {
      // setDataImages(await imgDataFromMockApi()); //получаем каринки запросом
       setDataImages(imageObjRequest.data); //получаем картинки из файла
    };
    fetchImages();
  }, []);

  const getLinkParams = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParams({ page: value.toString() });
  };

  const modalShow = (id: string) => {
    setModalHide(true);
    const imgModalShow = data.find((item) => item.id === id);
    setModalImage(imgModalShow?.img);
  };

  return (
    <div>
      <h2>Our gallery</h2>
      <Container>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi esse repellendus ratione molestias sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi esse repellendus ratione molestias sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi esse repellendus ratione molestias sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi esse repellendus ratione molestias sit magni soluta perferendis vero pariatur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio perspiciatis laboriosam animi, ipsum, dolorum ab laudantium accusamus commodi ducimus nisi esse repellendus ratione molestias

          Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </Container>
      <Container>
      <div className={styles.gallery_container}>
        <ul className={styles.grid}>
          {data
            .map((item) => (
              <li key={item.id} className={styles.card}>
                <img
                  id={item.id}
                  src={item.img}
                  alt={item.id}
                  className={styles.card_item}
                  onClick={() => modalShow(item.id)}
                />
              </li>
            ))
            .slice(
              (+pageNumber - 1) * imagesPerPage,
              (+pageNumber - 1) * imagesPerPage + imagesPerPage
            )}
        </ul>

        <div className={styles.pagination_container}>
          <Pagination
            count={Math.ceil(+data.length / imagesPerPage)}
            page={+pageNumber}
            size="large"
            onChange={getLinkParams}
          />
        </div>
      </div>
      {modalHide ? (
        <Modal setModalHide={setModalHide} modalImage={modalImage} />
      ) : (
        ""
      )}
        </Container>
    </div>
  );
};

export default Gallery;
