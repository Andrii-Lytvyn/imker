import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./GallerySwiper.css";

import { Autoplay, EffectCube, Navigation } from "swiper/modules";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GallerySwiper(): JSX.Element {
  const [{ photos }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);
  const itemsOnPage = 200;

  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `/api/gallery?page=0&items=${itemsOnPage}&orderBy=creationTimePhoto&desk=true`,
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
          effect={"cube"}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
          }}
          grabCursor={false}
          navigation={false}
          modules={[EffectCube, Autoplay, Navigation]}
          style={{ pointerEvents: "none" }}
          className="mySwiper"
        >
          {photos.map(({ linkToImg }, index) => (
            <SwiperSlide
              key={index}
              style={{ opacity: 1, pointerEvents: "none" }}
            >
              <img src={`/api/files/${linkToImg}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
