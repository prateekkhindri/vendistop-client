import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { SlideBanner } from "./SlideBanner/Slider";
import "swiper/css/navigation";
import "swiper/css";
import { Icon } from "@iconify/react";

export const HomeSlider = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="relative mySwiper"
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
      >
        <SwiperSlide>
          <SlideBanner />
        </SwiperSlide>
        <SwiperSlide>
          <SlideBanner />
        </SwiperSlide>
        <SwiperSlide>
          <SlideBanner />
        </SwiperSlide>
        <SwiperSlide>
          <SlideBanner />
        </SwiperSlide>
        <button className="hidden md:flex absolute z-[2] md:top-[46%] md:left-0 cursor-pointer md:items-center md:justify-center p-3 rounded-full bg-[#E2E2E2] hover:bg-[#e2e2e2a4] button-prev-slide">
          <Icon
            icon="ph:arrow-left"
            className="text-2xl lg:text-3xl xl:text-4xl text-[#595858]"
          />
        </button>
        <button className="hidden md:flex absolute z-[2] md:top-[46%] md:right-0 cursor-pointer md:items-center md:justify-center p-3 rounded-full bg-[#E2E2E2] hover:bg-[#e2e2e2a4] button-next-slide">
          <Icon
            icon="ph:arrow-right"
            className="text-2xl lg:text-3xl xl:text-4xl text-[#595858]"
          />
        </button>
      </Swiper>
    </div>
  );
};
