import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import styles from "./TopCallery.module.css";
import axios from "axios";
import linkToServer from "../../globalLinkToServer";
import {
  IGalleryPhotos,
  initIFilesListDto,
} from "../../AdminPage/GalleryAdmin/interfaces/IGalleryPhotos";
import LoaderStart from "../../Loader/LoaderStart";
import {Container} from "react-bootstrap";

const TopCallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [{ photos }, setFilesList] =
    useState<IGalleryPhotos>(initIFilesListDto);

  const handleSetThumbsSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };
  useEffect(() => {
    async function getListOfFiles() {
      try {
        const response = await axios.get(
          `${linkToServer}/api/gallery?page=0&items=5&orderBy=creationTimePhoto&desk=true`
        );

        console.log("🚀  response:", response.data);
        setFilesList(response.data);
      } catch (error) {
        console.error("Error during request execution:", error);
      }
    }
    getListOfFiles();
  }, []);
  return (
      <>
      <Container>
          <h2>UNSERE GALERIE</h2>
          <h4>Fotos unserer Gemeinde finden Sie in unserer Galerie.</h4>

          <div className={styles.top}>
            <div className={styles.container}>
              {photos.length === 0 ? (
                <LoaderStart />
              ) : (
                <>
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={`${styles.main_img} mySwiper2`}
                  >
                    {photos.map(({ id, linkToImg }) => (
                      <SwiperSlide key={id}>
                        <img
                          src={`${linkToServer}/api/files/${linkToImg}`}
                          className={styles.common_img}
                        />
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
                    {photos.map(({ id, linkToImg }) => (
                      <SwiperSlide key={id} className={styles.small_img}>
                        <img src={`${linkToServer}/api/files/${linkToImg}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </div>
          </div>
      </Container>
      </>
  );
};

export default TopCallery;
