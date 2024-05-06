"use client";
import { Modal, Empty, Input, Form, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Spotify } from "react-spotify-embed";
import SubmitButton from "@/Components/Shared/SubmitButton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import baseAxios from "../../../../Config";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

type FieldType = {
  _id?: string;
  type?: string;
  link?: string;
  description?: string;
};

interface User {
  _id: string;
}

const SongsUpload = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [user, setUser] = useState<User>({ _id: "" });
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [songs, setSongs] = useState<FieldType[]>([]);

  const onFinish = (values: FieldType) => {
    values.type = "songs";
    baseAxios
      .post("contents", values, {
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
            title: "Song Uploaded Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setModal1Open(false);
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

  const onFinishFailed = (errorInfo: any) => {};

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

  useEffect(() => {
    baseAxios
      .get(`contents?type=songs&userId=${user._id}`)
      .then((res) => {
        setSongs(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id]);

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
            title: "Song Deleted Successfully",
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
            Upload Songs & Picture
          </h1>
        </div>
        <div
          className=" h-10 w-10 grid items-center justify-center border border-gray-500 cursor-pointer"
          onClick={handleButtonClick}
        >
          <p className="font-bold text-2xl cursor-pointer">+</p>
        </div>
      </div>
      <div className=" lg:w-[80%] mx-auto mt-10">
        {songs && songs.length > 0 ? (
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
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {songs.map((item, index) => (
                <SwiperSlide className="mb-10" key={index}>
                  <div
                    className="w-[70%] mx-auto flex flex-col items-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Spotify link={`${item.link}`} />
                    {isHovered && (
                      <div className="relative -top-[360px] -left-[127px] transform -translate-x-100 -translate-y-5">
                        <button
                          className="relative border border-white p-1 bg-white rounded-br-2xl"
                          onClick={() => handleDeleteClick(item._id ?? "")}
                        >
                          <MdDelete className="h-10 w-10" />
                        </button>
                      </div>
                    )}
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
        width={600}
      >
        <div className="lg:flex-row justify-center items-center gap-3">
          <div className="flex-col">
            <div className="flex-col">
              {/* <div className="h-auto w-auto">
                <span className="font-bold">Link</span>
                <div className="my-2">
                  <input placeholder="Enter the Spotify song link here" className="w-full border border-black" onChange={(e) => setLink(e.target.value)} />
                </div>
              </div>
              <div>
                <span className="font-bold">Description</span>
                <div className="my-2">
                  <textarea placeholder="Enter the song's description here" className="w-full border border-black" onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div> */}
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div>
                  <div>
                    <Typography.Title level={5}>
                      <span className="text-black">Spotify Link</span>
                    </Typography.Title>
                    <Form.Item
                      name="link"
                      className="mb-2"
                      rules={[
                        {
                          required: true,
                          message: "Spotify link is required!",
                        },
                        {
                          pattern: /^https:\/\/open\.spotify\.com\/track\//,
                          message:
                            "Incorrect Spotify link! Hint: https://open.spotify.com/track/2TzyJEUfWHGRsk3r6Emvbk?si=fa18987596924",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter the Spotify song link here"
                        className="border border-black"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Typography.Title level={5}>
                      <span className="text-black">Description</span>
                    </Typography.Title>
                    <Form.Item
                      name="description"
                      className="mb-2"
                      rules={[
                        {
                          required: true,
                          message: "A small description is required!",
                        },
                      ]}
                    >
                      <textarea
                        className="w-full border border-black p-2 rounded-md"
                        placeholder={"Write a description here"}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div>
                  <div className="flex justify-center items-center">
                    <Form.Item>
                      <SubmitButton title={"Upload"} />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SongsUpload;
