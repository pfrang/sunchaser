import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

interface WeatherCarousellProps {
  setWeather: (weather: string) => void;
}

export const WeatherCarousell = ({ setWeather }: WeatherCarousellProps) => {
  const items = ["sun", "rain", "snow"];
  return (
    <Swiper
      // breakpoints={{
      //   480: {
      //     width: 480,
      //     slidesPerView: 2,
      //     slidesPerGroup: 2,
      //   },
      //   1100: {
      //     width: 1100,
      //     slidesPerView: 3,
      //     slidesPerGroup: 3,
      //   },
      // }}
      autoHeight
      // freeMode={true}
      // mousewheel={{
      //   sensitivity: 10,

      // }}
      style={{
        height: "100%",
        width: "100%",
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      slidesPerView={1}
      // spaceBetween={30}
      // slidesPerGroup={3}
      loop={true}
      // loopFillGroupWithBlank={false}
      pagination
      navigation
      onSlideChange={(el) => {
        setWeather(items[el.realIndex]);
      }}
      modules={[Navigation, Scrollbar, Keyboard, Pagination]}
    >
      {items.map((item, idx) => {
        return (
          <SwiperSlide
            key={`card ${idx}`}
            id={item}
            style={{ width: "100%", height: "100%" }}
          >
            <Image
              className="rounded-b-[50px] w-full h-full"
              // style={{
              //   boxShadow: "rgba(0,0,0,0.4) 0px 0px 10px",
              // }}
              src={`/photo-and-layout/${item}.png`}
              layout="fill"
              objectFit="cover"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
