"use client";
import { Divider, Modal, Upload, Button, Empty, Input } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { RiUpload2Line } from "react-icons/ri";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { getImageUrl } from "@/app/utils";

type FieldType = {
  _id?: string;
  type?: string;
  link?: string;
  image?: string;
};

interface User {
  _id: string;
}

const UpcomingJGigs = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [user, setUser] = useState<User>({ _id: "" });
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [link, setLink] = useState<string>("");
  const [upcomingGigs, setUpcomingGigs] = useState<FieldType[]>([]);
  const imageBaseURL = getImageUrl();

  useEffect(() => {
    // Ensure http://192.168.0.104:9000torage is available (client-side)
    if (typeof window !== "undefined") {
      // Retrieve user data from http://192.168.0.104:9000torage
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
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

  const handleButtonClick = (e: any) => {
    e.stopPropagation(); // Prevent click event from bubbling to the parent div
    setModal1Open(true);
  };

  const handleRemoveImage = (info: any) => {
    setImage(null);
  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (info: any) => {
    setImage(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };

  useEffect(() => {
    baseAxios
      .get(`contents?type=upcoming-gig&userId=${user._id}`)
      .then((res) => {
        setUpcomingGigs(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id]);

  const handleUploadUpcomingGigs = () => {
    const formData = new FormData();
    formData.append("type", "upcoming-gig");
    formData.append("link", link);
    if (image) {
      formData.append("image", image);
    } else {
      window.alert("Please upload an image");
      return;
    }
    baseAxios
      .post("contents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setModal1Open(false);
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Upcoming Gig Uploaded Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setModal1Open(false);
            setImage(null);
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong, try again later.",
        });
      });
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteClick = (id: string) => {
    if (!id || id === undefined) {
      window.alert("ID not found!");
      return;
    }
    baseAxios
      .delete(`contents/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Upcoming Gig Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      });
  };

  return (
    <div className="my-20 w-[80%] mx-auto">
      <div className="flex justify-between mx-5">
        <div className="text-center ">
          <h1 className="-mb-5 text-2xl text-site-color font-bold">
            Upload Upcoming Gigs
          </h1>
        </div>
        <div
          className="h-10 w-10 grid items-center justify-center border border-gray-500 cursor-pointer"
          onClick={handleButtonClick}
        >
          <p className="font-bold text-2xl cursor-pointer">+</p>
        </div>

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
                <SwiperSlide
                  className="mb-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                >
                  <Link
                    href={`${item?.link}`}
                    className="w-[70%] mx-auto flex flex-col items-center"
                  >
                    <img
                      src={imageBaseURL + item.image} // Assuming item.image contains the image URL
                      alt="images"
                      className="h-60 w-60 rounded-md"
                    />
                  </Link>
                  {isHovered && (
                    <div className="relative -top-56 left-[80px] transform -translate-x-100 -translate-y-5">
                      <button
                        className="relative border border-white p-1 bg-white rounded-br-2xl"
                        onClick={() => handleDeleteClick(item._id ?? "")}
                      >
                        <MdDelete className="h-10 w-10" />
                      </button>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <>
            <div>
              <Empty description="No data found" />
            </div>
          </>
        )}
      </div>
      <Modal
        centered
        open={modal1Open}
        footer={null}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        width={400}
      >
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
          <div className="flex-col">
            <div className="flex">
              <div className="h-auto w-auto">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false} // Prevent default upload behavior
                  onChange={handleImageUpload}
                >
                  {image ? (
                    <div className="flex-col">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="avatar"
                        width={70}
                        height={70}
                        className="ml-1.5"
                      />
                      <Button
                        className="bg-red-600 text-white font-semibold"
                        onClick={handleRemoveImage} // Clear the image when the button is clicked
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center  justify-center">
                      <RiUpload2Line style={{ fontSize: "24px" }} />
                    </div>
                  )}
                </Upload>
              </div>
              <div className="ml-4 my-4">
                <span className="font-bold">Link</span>
                <div className="my-2">
                  <Input
                    placeholder="Enter the event link here"
                    className="w-auto"
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={handleUploadUpcomingGigs}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpcomingJGigs;
