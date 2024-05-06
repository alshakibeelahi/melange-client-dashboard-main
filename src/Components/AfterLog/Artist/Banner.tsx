"use client";

import Image from "next/image";
import back from "../../assets/home/back-girl.png";
import { Button, Divider } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BackgroundImage from "@/Components/Shared/BackgroundImage";
import { AllImages } from "@/assets/AllImages";

const Banner = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <BackgroundImage
      className="bg-black bg-opacity-55 text-white"
      image={
        <Image
          src={AllImages.home.homeBanner}
          alt="Image Alt Text"
          className="object-cover object-center h-screen "
          fill
        />
      }
    >
      {/* Change the  w-[80%] and lg:-ml-14 or delete it  */}

      <div className="flex flex-col lg:flex-row justify-start items-center lg:mx-10 gap-10 lg:w-[80%] mx-auto relative">
        <div className="lg:text-7xl text-4xl lg:w-[50%] mt-[50%] lg:mt-0 lg:mx-0 mx-auto lg:text-start text-center font-bold leading-snug">
          <h1>The new jams adrean single album is burning hot.</h1>
        </div>
        {/* <div className="lg:text-xl md:w-[50%] mt-6 lg:text-end text-center left-1/2 border absolute">
          <h1>hello</h1>
        </div> */}
        <div className="lg:text-xl md:w-[35%] mt-6 text-center lg:text-right lg:bottom-10 lg:right-0  lg:absolute font-sans">
          <p>
            The latest Adrian&apos;s single album ignites with scorching heat,
            blazing through speakers with irresistible melodies and beats that
            set hearts on fire.
          </p>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Banner;
