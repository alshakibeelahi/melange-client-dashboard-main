"use client";

import { Divider } from "antd";
import { MdOutlineEmail, MdLocationCity } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import { AllImages } from "@/assets/AllImages";

const Footer = () => {
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [hovered3, setHovered3] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleMouseEnter2 = () => {
    setHovered2(true);
  };
  const handleMouseLeave2 = () => {
    setHovered2(false);
  };
  const handleMouseEnter3 = () => {
    setHovered3(true);
  };
  const handleMouseLeave3 = () => {
    setHovered3(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Divider style={{ borderBlockColor: "#363062" }} />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="leading-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="border border-site-text rounded-full p-2 ">
              <MdOutlineEmail className="h-7 w-7 text-site-text" />
            </div>
            <div>
              <h3>Email Drop</h3>
              <p className="text-xs text-gray-400">melange-support@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="border border-site-text rounded-full p-2 ">
              <MdLocationCity className="h-7 w-7 text-site-text" />
            </div>
            <div>
              <h3>Location From</h3>
              <p className="text-xs text-gray-400">
                Moon-Sun, 9:00 AM -9:00 PM
              </p>
            </div>
          </div>
        </div>
        <Divider
          type="vertical"
          style={{ borderColor: "#363062", height: "30vh" }}
          className="hidden lg:block"
        />
        <div className="flex flex-col items-center gap-6">
          <div>
            <Image src={AllImages.logo} className="h-[65px] w-fit" alt="logo" />
          </div>
          <div className="flex items-center justify-center gap-5">
            <div
              className={`border border-site-text rounded-full p-3 ${
                hovered ? "bg-site-text text-white" : "hover:bg-site-text"
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <FaTwitter className="h-5 w-5" />
            </div>
            <div
              className={`border border-site-text rounded-full p-3 ${
                hovered2 ? "bg-site-text text-white" : "hover:bg-site-text"
              }`}
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              <FaFacebookF className="h-5 w-5" />
            </div>
            <div
              className={`border border-site-text rounded-full p-3 ${
                hovered3 ? "bg-site-text text-white" : "hover:bg-site-text"
              }`}
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
            >
              <FaLinkedinIn className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
