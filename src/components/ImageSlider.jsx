import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/css/imageslider.css";

export default function ImageSlider({ images, onClose }) {
  return (
    <div className="images-slider">
      <div className="images-slider-close" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="slider-container">
        <Swiper
          loop={true}
          navigation={false}
          pagination={true}
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image?.url} alt="" className="image-slide" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
