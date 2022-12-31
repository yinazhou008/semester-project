import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import 'swiper/css/navigation';



// import required modules
import { EffectCoverflow, Navigation} from "swiper";
import QuizCard from "./QuizCard";

export default function QuizSlider({ quizs }) {
  return (
    <>
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
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        modules={[EffectCoverflow, Navigation]}
        className="max-w-lg"
      >
        {quizs?.map((item, id) =>
          <SwiperSlide key={id}>
            {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" /> */}
            <QuizCard item={item} />
          </SwiperSlide>
        )}

      </Swiper>
    </>
  );
}
