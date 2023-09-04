import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "./GallerySwiper.css";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GallerySwiper2(): JSX.Element {
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
          effect={"coverflow"}
          grabCursor={false}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
          }}
          pagination={false}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          style={{ pointerEvents: "none", width: "100%", marginBottom: "20px" }}
        >
          {photos.map((item) => (
            <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
              <img src={"/api/files/" + item.linkToImg} />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src={"/api/files/" + photos[0]?.linkToImg}
            />
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}
