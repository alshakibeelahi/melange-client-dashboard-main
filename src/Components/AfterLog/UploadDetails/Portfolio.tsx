import React, { useEffect, useState } from "react";
import { Divider, Modal, Upload, Button, Empty, Row, Col } from "antd";
import { RiUpload2Line } from "react-icons/ri";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { getImageUrl } from "@/app/utils";

interface User {
  _id: string;
  type: string;
}

type FieldType = {
  _id?: string;
  image?: string;
};

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<FieldType[]>([]);
  const [user, setUser] = useState<User>({ _id: "", type: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  useEffect(() => {
    baseAxios
      .get(`contents?type=portfolio&userId=${user._id}`)
      .then((res) => {
        setPortfolio(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user._id]);

  const [modal1Open, setModal1Open] = useState(false);
  const imageBaseURL = getImageUrl();

  const handleRemoveImage = (info: any) => {
    setImage(null);
  };

  var spans: any = [10, 8, 16, 10, 9, 8]; // Default spans

  if (user && user.type.includes("music-artist")) {
    spans = [6, 14, 12, 8, 10, 9, 11, 13]; // Modified spans for zigzag pattern
  }
  if (user && user.type.includes("visual-artist")) {
    spans = [9, 6, 14, 6, 7, 11, 9, 6]; // Modified spans for zigzag pattern
  }
  if (user && user.type.includes("digital-artist")) {
    spans = [8, 10, 10, 8, 12, 6, 8, 8]; // Modified spans for zigzag pattern
  }

  const [image, setImage] = useState(null);

  const handleImageUpload = (info: any) => {
    setImage(info.fileList[info?.fileList?.length - 1].originFileObj);
    info.fileList = [];
  };

  const handleUploadPortfolio = () => {
    const formData = new FormData();
    formData.append("type", "portfolio");
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
            title: "Portfolio uploaded successfully",
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
            title: "Portfolio Image Deleted Successfully",
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

  const getRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <div className="my-20 w-[80%] mx-auto">
      <div className="flex justify-between mx-5">
        <div className="text-center ">
          <h1 className="-mb-5 text-2xl text-site-color font-bold">
            Upload Portfolio
          </h1>
        </div>
        <div
          className=" h-10 w-10 grid items-center justify-center border border-gray-500 cursor-pointer"
          onClick={() => setModal1Open(true)}
        >
          <p className="font-bold text-2xl cursor-pointer">+</p>
        </div>
      </div>
      {portfolio && portfolio.length > 0 ? (
        <>
          {
            <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
              <div className="container p-4 mx-auto flex justify-end">
                <Row gutter={[16, 16]} justify="space-around">
                  {portfolio.map((item, index) => (
                    <Col
                      key={index}
                      xs={24}
                      md={spans[index % 6]} // Use modulus to cycle through span values
                      lg={spans[index % 6]} // Use modulus to cycle through span values
                      style={{
                        marginTop: `${getRandomNumber(10, 250)}px`,
                      }}
                    >
                      <img
                        src={imageBaseURL + item.image}
                        alt=""
                        className="w-full h-full shadow-sm min-h-52 aspect-square"
                      />
                      <button
                        className="absolute top-0 right-2 rounded-full bg-white border border-gray-400 p-1"
                        onClick={() => handleDeleteClick(item._id ?? "")}
                      >
                        <MdDelete className="h-10 w-10" />
                      </button>
                    </Col>
                  ))}
                </Row>
              </div>
            </section>
          }
        </>
      ) : (
        <div>
          <Empty description="No user found" />
        </div>
      )}
      <Modal
        centered
        open={modal1Open}
        footer={null}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        width={400}
      >
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
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
          <div>
            <Button
              className="bg-blue-600 text-white"
              onClick={handleUploadPortfolio}
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Portfolio;
