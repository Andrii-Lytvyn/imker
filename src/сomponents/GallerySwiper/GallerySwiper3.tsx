import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./GallerySwiper.css";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GallerySwiper3(): JSX.Element {
  const [{ photos }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const itemsOnPage = 200;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/slider?page=0&items=${itemsOnPage}&orderBy=creationTimeSlider&desk=false`,
          {
            withCredentials: true,
          }
        );
        setFilesList(response.data);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfFiles();
  }, []);
  return (
    <>
      {photos?.length > 0 && (
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={false}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          style={{
            // pointerEvents: "none",
            width: "100%",
            height: "400px",
          }}
          className="mySwiper"
        >
          {photos.map(({ linkToImg, id }) => (
            <SwiperSlide key={id} style={{ opacity: 1, pointerEvents: "none" }}>
              <img src={`https://imker.fra1.digitaloceanspaces.com/${linkToImg}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
