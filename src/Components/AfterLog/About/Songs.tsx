"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Empty } from "antd";
import { Spotify } from "react-spotify-embed";
import baseAxios from "../../../../Config";

type FieldType = {
  type?: string;
  link?: string;
  description?: string;
};

const Songs = ({ id }: { id: string }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [hovered, setHovered] = useState(false);
  const [songs, setSongs] = useState<FieldType[]>([]);
  console.log(songs);
  useEffect(() => {
    baseAxios
      .get(`contents?type=songs&userId=${id}`)
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
        <h1 className="-mb-5 text-2xl text-site-color font-bold">Songs</h1>
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
                    <Spotify link={`${item.link}`}/>
                    <p className="w-full text-center font-sans text-base">
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

export default Songs;
