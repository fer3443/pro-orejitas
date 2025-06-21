"use client";
import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";

interface Props {
  image: {url:string, id:number}[];
  title: string;
  className?: string;
}

export const SlideShowMobile = ({ image, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width:'100%',
          height: '450px',
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties
      }
        pagination={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper2"
      >
        {image.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={title}
              width={500}
              height={500}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};