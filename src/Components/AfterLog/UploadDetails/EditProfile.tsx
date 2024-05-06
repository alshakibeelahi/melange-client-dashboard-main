"use client";

import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Select,
  Upload,
  Checkbox,
} from "antd";
import { RiEdit2Line, RiUserFollowLine } from "react-icons/ri";
import { RiUpload2Line } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import baseAxios from "../../../../Config";
import { getImageUrl } from "@/app/utils";

interface User {
  _id: string;
  fullName: string;
  email: string;
  image: string;
  phoneNumber: string;
  instagram: string;
  facebook: string;
  followers: number;
  about: string;
  type: [string];
  designation: string;
  address: string;
  aboutBackground: string;
}

const EditProfile = () => {
  var [user, setUser] = useState<User>({} as User);
  const [isEdit, setIsEdit] = useState(false);
  const imageBaseURL = getImageUrl();
  const [image, setImage] = useState(null);
  const [aboutBackground, setAboutBackground] = useState(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [type, setType] = useState<string[]>([]);
  const [instagram, setInstagram] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageUpload1 = (info: any) => {
    setAboutBackground(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };
  const handleImageUpload2 = (info: any) => {
    setImage(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };

  const handleRemoveImage = (info: any) => {
    setImage(null);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleImageUpdate = () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    } else {
      window.alert("Please select an image to upload");
      return;
    }
    baseAxios
      .put(`/users/edit-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Profile picture updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsEdit(false);
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.attributes)
          );
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Profile Update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    setIsModalVisible(false);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("designation", designation);
    formData.append("instagram", instagram);
    formData.append("facebook", facebook);
    formData.append("about", about);
    formData.append("address", address);
    if (type && type.length > 0) {
      type.map((data, index) => {
        formData.append("type", data);
      });
    }
    if (aboutBackground) {
      formData.append("aboutBackground", aboutBackground);
    }
    baseAxios
      .put(`/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setIsEdit(false);
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.attributes)
          );
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Profile Update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    baseAxios
      .get(`/users/user-details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.data.attributes);
        setName(response.data.data.attributes.fullName);
        setPhoneNumber(response.data.data.attributes.phoneNumber);
        setDesignation(response.data.data.attributes.designation);
        setInstagram(response.data.data.attributes.instagram);
        setFacebook(response.data.data.attributes.facebook);
        setAbout(response.data.data.attributes.about);
        setAddress(response.data.data.attributes.address);
        setType(response.data.data.attributes.type || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const formatFollowers = (count: number): string => {
    let result: string = "";
    if (count >= 1000000) {
      result = (count / 1000000).toFixed(1) + " M";
    } else if (count >= 1000) {
      result = (count / 1000).toFixed(1) + " K";
    } else {
      result = count + "";
    }
    return result;
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:w-[80%] h-auto mx-auto font-sans">
        <div className="flex flex-col items-center justify-start lg:w-[40%] rounded-md">
          <div className="relative p-8">
            <img
              src={`${imageBaseURL}${user.image}`}
              className="h-full w-full border-4 border-white"
              alt="user"
            />
            <button
              className="absolute top-9 right-9 bg-white"
              onClick={handleModalOpen}
            >
              <RiEdit2Line size={60} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-start ">
            <h1 className="text-2xl font-bold my-5 w-full  text-center">
              {user.fullName}
            </h1>
            <div className="w-full bg-black p-2">
              <Link href="/follow" className="flex justify-center items-center">
                <span>
                  <RiUserFollowLine className="h-7 w-7 mr-2" color="white" />
                </span>{" "}
                <span className="text-3xl text-white">
                  {formatFollowers(user?.followers)}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-full h-auto p-4 rounded-lg">
          <div className="w-auto mx-auto flex justify-between mt-10">
            <div className="w-[80%] mx-auto mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Email </span>
                  </Typography.Title>
                  <span>{user.email}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Contact Number </span>
                  </Typography.Title>
                  <span>{user.phoneNumber}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Account Type</span>
                  </Typography.Title>
                  <span>
                    {user?.type?.map((t, index) => (
                      <span key={index}>
                        {t
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ") + " "}
                      </span>
                    ))}
                  </span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Profession </span>
                  </Typography.Title>
                  <span>{user.designation}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Facebook </span>
                  </Typography.Title>
                  <span>{user.facebook}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Instagram </span>
                  </Typography.Title>
                  <span>{user.instagram}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">Address </span>
                  </Typography.Title>
                  <span>{user.address}</span>

                  {/* Other form items for first column */}
                </div>
                <div>
                  <Typography.Title level={5}>
                    <span className="text-black">
                      About Section&apos;s Background{" "}
                    </span>
                  </Typography.Title>
                  {user.aboutBackground && (
                    <img
                      src={imageBaseURL + user.aboutBackground}
                      className="w-full h-[150px]"
                    />
                  )}

                  {/* Other form items for first column */}
                </div>
              </div>
              <div className="mt-8">
                <Typography.Title level={5}>
                  <span className="text-black">About </span>
                </Typography.Title>
                <div className="w-auto h-auto">{user.about}</div>
              </div>
              <div className="mt-8 justify-center items-center flex">
                <Button
                  className="bg-blue-800 text-white font-semibold"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Edit Profile"
          open={isEdit}
          onCancel={handleCancel}
          footer={null}
        >
          <Form>
            <div className=" w-full h-full rounded-lg">
              <div className="w-auto mx-auto flex justify-between">
                <div className="w-[80%] mx-auto mb-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Full Name </span>
                      </Typography.Title>
                      <Form.Item name="fullName" className="mb-2">
                        <Input
                          defaultValue={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Contact Number </span>
                      </Typography.Title>
                      <Form.Item name="phoneNumber" className="mb-2">
                        <Input
                          defaultValue={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </Form.Item>

                      {/* Other form items for first column */}
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Designation </span>
                      </Typography.Title>
                      <Form.Item name="designation" className="mb-2">
                        <Input
                          defaultValue={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Facebook </span>
                      </Typography.Title>
                      <Form.Item name="facebook" className="mb-2">
                        <Input
                          defaultValue={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Instagram </span>
                      </Typography.Title>
                      <Form.Item name="instagram" className="mb-2">
                        <Input
                          defaultValue={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Address </span>
                      </Typography.Title>
                      <Form.Item name="address" className="mb-2">
                        <Input
                          defaultValue={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">Account Type</span>
                      </Typography.Title>
                      <Form.Item name="accountType" className="mb-2">
                        <Form.Item name="accountType" className="mb-2">
                          {[
                            "music-artist",
                            "digital-artist",
                            "visual-artist",
                          ].map((typeValue) => (
                            <Checkbox
                              key={typeValue}
                              checked={type.includes(typeValue)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setType((prevType) => {
                                  if (isChecked) {
                                    // Add the typeValue to the state if it's checked
                                    return [...prevType, typeValue];
                                  } else {
                                    // Remove the typeValue from the state if it's unchecked
                                    return prevType.filter(
                                      (value) => value !== typeValue
                                    );
                                  }
                                });
                              }}
                            >
                              {typeValue
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </Checkbox>
                          ))}
                        </Form.Item>
                      </Form.Item>
                      {/* Other form items for first column */}
                    </div>
                    <div>
                      <Typography.Title level={5}>
                        <span className="text-black">
                          About Section&apos;s Background
                        </span>
                      </Typography.Title>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent default upload behavior
                        onChange={handleImageUpload1}
                      >
                        {aboutBackground ? (
                          <div className="flex-col">
                            <img
                              src={URL.createObjectURL(aboutBackground)}
                              alt="avatar"
                              width={70}
                              height={70}
                              className="ml-1.5"
                            />
                            <Button
                              className="bg-red-600 text-white font-semibold"
                              onClick={() => setImage(null)} // Clear the image when the button is clicked
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
                  </div>
                  <div>
                    <Typography.Title level={5}>
                      <span className="text-black">About </span>
                    </Typography.Title>
                    <Form.Item name="about" className="mb-2">
                      <textarea
                        defaultValue={about}
                        className="w-full h-24 p-2"
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <Button
                      className="bg-blue-800 text-white font-semibold"
                      htmlType="submit"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal>
        <Modal
          title="Upload Profile Picture"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="cancel" onClick={handleModalClose}>
              Cancel
            </Button>,
            <Button key="upload" type="primary" onClick={handleImageUpdate}>
              Upload
            </Button>,
          ]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false} // Prevent default upload behavior
            onChange={handleImageUpload2}
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
        </Modal>
      </div>
    </>
  );
};

export default EditProfile;
