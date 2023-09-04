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
          spaceBetween={30}
          effect={"fade"}
          navigation={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          style={{
            pointerEvents: "none",
            width: "100%",
            height: "400px",
          }}
          className="mySwiper"
        >
          {/* {photos.map((item) => (
            <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
              <img src={"/api/files/" + item.linkToImg} />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src={"/api/files/" + photos[0]?.linkToImg}
            />
          </SwiperSlide> */}
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src="/img/sliders/slider2.jpg"
            />
          </SwiperSlide>
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src="/img/sliders/slider1.jpg"
            />
          </SwiperSlide>
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src="/img/sliders/slider3.jpg"
            />
          </SwiperSlide>
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src="/img/sliders/slider4.jpg"
            />
          </SwiperSlide>
          <SwiperSlide style={{ opacity: 1, pointerEvents: "none" }}>
            <img
              style={{ opacity: 1, pointerEvents: "none" }}
              src="/img/sliders/slider5.jpg"
            />
          </SwiperSlide>
        </Swiper>
      )}
    </>
  );
}
