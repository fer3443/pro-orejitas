"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

interface Props {
  image: {url:string, id:number}[];
  title: string;
  className?: string;
}

export const SlideShow = ({ image, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {image.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={title}
              width={600}
              height={600}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {image.map((img) => (
          <SwiperSlide key={img.id}>
            <Image
              src={img.url}
              alt={title}
              width={300}
              height={300}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};