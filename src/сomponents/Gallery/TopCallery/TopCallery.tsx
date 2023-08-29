import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageObjRequest } from "../imgObj";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import styles from "./TopCallery.module.css";

const TopCallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const handleSetThumbsSwiper = (swiper: SwiperType) => {
    // Использование типа Swiper
    setThumbsSwiper(swiper);
  };
  return (
    <div className={styles.container}>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.main_img} mySwiper2`}
      >
        {imageObjRequest.data.map(({ id, img }) => (
          <SwiperSlide key={id}>
            <img src={img} className={styles.common_img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={handleSetThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imageObjRequest.data.map(({ id, img }) => (
          //   <div className={styles.small_img}>
          <SwiperSlide key={id} className={styles.small_img}>
            <img src={img} />
          </SwiperSlide>
          //   </div>
        ))}
      </Swiper>
    </div>
  );
};

export default TopCallery;
