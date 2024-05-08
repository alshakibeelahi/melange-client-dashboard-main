"use client";
import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import baseAxios from "../../../../Config";
import { IoIosDoneAll } from "react-icons/io";
import { SlUserFollow } from "react-icons/sl";
import Swal from "sweetalert2";
import { getImageUrl } from "@/app/utils";

const imageBaseUrl = getImageUrl();

interface Follower {
  fullName: string;
  image: string;
  isFollowed: boolean;
  followerId: string;
}

const Follow = () => {
  const [followerList, setFollowerList] = useState<Follower[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    baseAxios
      .get(`/follows?limit=10&page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const { followersList, pagination: fetchedPagination } =
          res.data.data.attributes;
        setFollowerList(followersList);
        setPagination(fetchedPagination);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => (
        <img
          src={`${imageBaseUrl}${image}`}
          alt="image"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Status",
      dataIndex: "isFollowed",
      key: "isFollowed",
      render: (isFollowed: any, record: any) => (
        <div
          className="cursor-pointer"
          onClick={() => handleFollow(record.followerId)}
        >
          {isFollowed ? (
            <div style={{ color: "green" }}>
              <IoIosDoneAll className="h-10 w-10" />
            </div>
          ) : (
            <div style={{ color: "red" }}>
              <SlUserFollow className="h-5 w-10" />
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleFollow = (id: string) => {
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
            setCurrentPage(1);
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
            setCurrentPage(1);
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
    <div className="w-[80%] mx-auto ">
      <Table
        columns={columns}
        dataSource={followerList}
        pagination={{
          pageSize: pagination.limit,
          current: pagination.currentPage,
          total: pagination.totalResults,
          onChange: (page, pageSize) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default Follow;
