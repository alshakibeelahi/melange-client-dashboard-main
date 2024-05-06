"use client";

import React, { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PiUserCirclePlus } from "react-icons/pi";
import { Button, Empty, Spin } from "antd"; // Import Spin from Ant Design
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/utils";

interface User {
  fullName: string;
  facebook: string;
  instagram: string;
  image: string;
  designation: string;
  address: string;
  _id: string;
  isFollowing: boolean;
}

const TopSection = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add isLoading state
  var token: any = null;

  const imageBaseURL = getImageUrl();

  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
  }, []);

  console.log("user", user);

  useEffect(() => {
    baseAxios
      .get(
        `/users/artist-details/${id}?select=profile&userId=${localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        setUser(response.data.data.attributes);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  const handleFollow = () => {
    baseAxios
      .post(
        "/follows",
        { user: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "You are now following this artist.",
            showConfirmButton: true,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "You have just unfollowed this artist.",
            showConfirmButton: true,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 500) {
          window.location.href = "/login";
        }
      });
  };

  return (
    <>
      {isLoading ? ( // Render Spin component if isLoading is true
        <div className="text-center p-52">
          <Spin size="large" />
        </div>
      ) : user && user !== null ? (
        <>
          <div className="flex flex-col lg:flex-row justify-start items-center lg:mx-10 gap-10 lg:w-[80%] mx-auto  my-20">
            <div className="lg:text-7xl text-4xl lg:w-[50%] mt-[50%] lg:mt-0 lg:mx-0 mx-auto lg:text-start text-center font-bold leading-snug flex flex-col items-center justify-center relative">
              <div>
                <div className="relative lg:left-[40%] left-6">
                  <img
                    src={imageBaseURL + user.image}
                    className="lg:max-h-96 h-80 w-full lg:w-fit rounded-xl"
                    alt="rectangle"
                  />
                </div>
              </div>
            </div>
            <div className="lg:text-xl lg:w-[50%] mt-6 text-start lg:right-0 flex flex-col lg:items-start items-center lg:absolute ">
              <div className="my-5">
                <h1 className="text-3xl font-bold ">{user?.fullName}</h1>
                {user.designation && user.designation !== "undefined" && (
                  <h1 className="text-lg font-sans font-bold">
                    {user?.designation}
                  </h1>
                )}
                {user.address && user.address !== "undefined" && (
                  <h1 className="text-lg font-sans font-bold">
                    {user?.address}
                  </h1>
                )}
              </div>

              {user && user.isFollowing ? (
                <>
                  <Button
                    className="flex gap-2 items-center rounded-md"
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "black	",
                      fontSize: 20,
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#48d956",
                    }}
                    onClick={handleFollow}
                  >
                    <span>
                      <PiUserCirclePlus className="h-7 w-7" />
                    </span>{" "}
                    <span>Following</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="flex gap-2 items-center rounded-md"
                    style={{
                      paddingTop: 20,
                      paddingBottom: 20,
                      color: "black	",
                      fontSize: 20,
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#b8b9ba",
                    }}
                    onClick={handleFollow}
                  >
                    <span>
                      <RiUserFollowLine className="h-7" />
                    </span>{" "}
                    <span>Follow</span>
                  </Button>
                </>
              )}
              <div className="flex my-5 gap-4 items-center justify-center">
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-8 w-fit hover:text-site-text hover: rounded-lg" />
                </a>
                <a
                  href={user.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="h-7 w-fit hover:text-site-text hover: rounded-lg" />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-52">
            <Empty description="No user found" />
          </div>
        </>
      )}
    </>
  );
};

export default TopSection;
