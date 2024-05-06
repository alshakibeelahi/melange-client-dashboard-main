"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Divider, Empty } from "antd";
import baseAxios from "../../../../Config";
import { getImageUrl } from "@/app/utils";

type FieldType = {
  type?: string;
  description?: string;
  image?: string;
};

const ReciepePicture = ({ id }: { id: string }) => {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [recipe, setRecipe] = useState<FieldType[]>([]);
  const imageBaseURL = getImageUrl();

  useEffect(() => {
    baseAxios
      .get(`contents?type=recipe&userId=${id}`)
      .then((res) => {
        setRecipe(res.data.data.attributes);
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
    <div className="">
      <div className="lg:w-[80%] mx-auto">
        <h1 className="-mb-5 text-2xl text-site-color font-bold">
          Recipe & Picture
        </h1>
      </div>
      <div className=" lg:w-[80%] mx-auto mt-10">
        {recipe && recipe.length > 0 ? (
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
              {recipe.map((item, index) => (
                <SwiperSlide className="mb-10" key={index}>
                  <div className="w-[70%] mx-auto flex flex-col items-center">
                    <img
                      src={imageBaseURL + item.image}
                      alt="images"
                      className="h-96 w-fit rounded-md mb-2"
                    />
                    <p className="w-full text-center font-sans text-lg">
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
              <Empty description="No recipe uploaded yet" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReciepePicture;
