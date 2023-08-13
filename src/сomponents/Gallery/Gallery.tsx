import { ChangeEvent, useEffect, useState } from "react";
import css from "./Gallery.module.css";
import axios from "axios";
// import { imageObjRequest } from "./imgObj";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { IImgData } from "./interfaces/IImgData";
import Modal from "./Modal/Modal";

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
  const imagesPerPage = 9;
  const [data, setDataImages] = useState<IImgData[]>([]);
  const [modalHide, setModalHide] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") ?? "1";

  useEffect(() => {
    const fetchImages = async () => {
      setDataImages(await imgDataFromMockApi()); //получаем каринки запросом
      // setDataImages(imageObjRequest.data); //получаем каринки из файла
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

      <div className={css.gallery_container}>
        <ul className={css.grid}>
          {data
            .map((item) => (
              <li key={item.id} className={css.card}>
                <img
                  id={item.id}
                  src={item.img}
                  alt={item.id}
                  className={css.card_item}
                  onClick={() => modalShow(item.id)}
                />
              </li>
            ))
            .slice(
              (+pageNumber - 1) * imagesPerPage,
              (+pageNumber - 1) * imagesPerPage + imagesPerPage
            )}
        </ul>

        <div className={css.pagination_container}>
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
    </div>
  );
};

export default Gallery;
