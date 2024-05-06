"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BackgroundImage from "@/Components/Shared/BackgroundImage";
import { AllImages } from "@/assets/AllImages";
import baseAxios from "../../../../Config";
import { Button, Empty, Spin } from "antd";
import { getImageUrl } from "@/app/utils";

interface User {
  about: string;
  aboutBackground: string;
  _id: string;
}

const AboutBanner = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state
  const imageBaseURL = getImageUrl();
  useEffect(() => {
    baseAxios
      .get(`/users/artist-details/${id}?select=about`)
      .then((response) => {
        setUser(response.data.data.attributes);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div className="h-auto">
      <BackgroundImage
        className="bg-black bg-opacity-55 text-white h-auto"
        image={
          <img
            src={`${imageBaseURL + user?.aboutBackground}`}
            alt="Image Alt Text"
            className="object-cover object-center w-full h-auto"
          />
        }
      >
        {isLoading ? (
          <div className="text-center p-96">
            <Spin size="large" />
          </div>
        ) : user && user !== null ? (
          <>
            <div className="flex flex-col lg:flex-row justify-start items-center lg:mx-10 gap-10 lg:w-[80%] mx-auto  ">
              <p className="lg:text-3xl text-xl text-gray-300 font-sans text-center">{user?.about}</p>
            </div>
          </>
        ) : (
          <>
          </>
        )}
      </BackgroundImage>
    </div>
  );
};

export default AboutBanner;
