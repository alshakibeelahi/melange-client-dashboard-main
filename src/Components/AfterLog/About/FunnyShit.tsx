"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { Divider, Empty } from "antd";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { IoPauseSharp } from "react-icons/io5";
import baseAxios from "../../../../Config";

type FieldType = {
  type?: string;
  link?: string;
  description?: string;
};

const FunnyShit = ({ id }: { id: string }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [hovered, setHovered] = useState(false);
  const [songs, setSongs] = useState<FieldType[]>([]);

  useEffect(() => {
    baseAxios
      .get(`contents?type=funny-shit&userId=${id}`)
      .then((res) => {
        setSongs(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1); // Small screens
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(3); // Medium screens
      }
    };

    // Add event listener to update dimensions on window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial values
    handleResize();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="py-20">
      <div className="lg:w-[80%] mx-auto">
        <h1 className="-mb-5 text-2xl text-site-color font-bold">
          Upload Artist setup/ Equipment
        </h1>
      </div>
      <div className=" lg:w-[80%] mx-auto mt-10">
        {songs && songs.length > 0 ? (
          <>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={5}
              centeredSlides={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper "
            >
              {songs.map((item, index) => (
                <SwiperSlide className="mb-10" key={index}>
                  <div className="w-[70%] mx-auto flex flex-col items-center">
                    <iframe
                      className="h-60 w-96"
                      src={`https://www.youtube.com/embed/${
                        item.link && item.link.split("/")[3]
                      }`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p className="w-full text-center font-sans text-lg pt-5">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <>
            <div>
              <Empty description="No song found" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FunnyShit;
