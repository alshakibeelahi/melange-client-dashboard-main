"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { AllImages } from "@/assets/AllImages";
import { Divider, Empty } from "antd";
import baseAxios from "../../../../Config";
import Link from "next/link";
import { getImageUrl } from "@/app/utils";

type FieldType = {
  type?: string;
  link?: string;
  image?: string;
};

const UpcomingGigs = ({ id }: { id: string }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [upcomingGigs, setUpcomingGigs] = useState<FieldType[]>([]);
  const imageBaseURL = getImageUrl();

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

  useEffect(() => {
    baseAxios
      .get(`contents?type=upcoming-gig&userId=${id}`)
      .then((res) => {
        setUpcomingGigs(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="lg:w-[80%] mx-auto">
          <h1 className="-mb-5 text-2xl text-site-color font-bold">
            Upcoming Gigs
          </h1>
        </div>
        <div className=" lg:w-[80%] mx-auto mt-10">
          {upcomingGigs && upcomingGigs.length > 0 ? (
            <>
              <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={5}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {upcomingGigs.map((item, index) => (
                  <SwiperSlide className="mb-10" key={index}>
                    <Link
                      href={`${item?.link}`}
                      className="w-[70%] mx-auto flex flex-col items-center"
                    >
                      <img
                        src={imageBaseURL + item.image} // Assuming item.image contains the image URL
                        alt="images"
                        className="h-96 w-fit  rounded-md"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <>
              <div>
                <Empty description="No gig found" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingGigs;
