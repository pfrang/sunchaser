import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

export type WeatherOptions = "Sun" | "Rain" | "Snow";
import { Text } from "../../../../ui-kit/text";

interface WeatherCarousellProps {
  setWeather: (weather: WeatherOptions) => void;
  weather: WeatherOptions;
}

export const WeatherCarousell = ({
  setWeather,
  weather,
}: WeatherCarousellProps) => {
  const items = ["Sun", "Rain", "Snow"];
  const isDisabled = weather !== "Sun";

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
        //@ts-ignore
        "--swiper-navigation-color": `#7CECA1`,
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
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      navigation
      onSlideChange={(el) => {
        setWeather(items[el.realIndex] as WeatherOptions);
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
            {weather !== "Sun" && (
              <div className="absolute flex w-full h-full justify-center items-center z-10">
                <Text
                  tag="h2"
                  variant="body-large-bold"
                >{`${weather} is not supported yet!`}</Text>
              </div>
            )}
            <Image
              alt="weather"
              className={`rounded-b-[50px] w-full  ${
                isDisabled && "opacity-[50%]"
              }`}
              src={`/photo-and-layout/${item.toLowerCase()}.png`}
              fill
              // style={{ objectFit: "cover" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
