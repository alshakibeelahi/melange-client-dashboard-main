"use client";

import { useEffect, useState } from "react";
import { Pagination, Empty } from "antd";
import baseAxios from "../../../../Config";
import Link from "next/link";
import { getImageUrl } from "@/app/utils";

const VisualArtist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const imageBaseURL = getImageUrl();
  const imagesPerPage = 9;

  useEffect(() => {
    baseAxios
      .get(
        `/users?limit=9&page=${currentPage}&type=visual-artist&userId=${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        setUserData(res.data.data.attributes.userList);
        setPagination(res.data.data.attributes.pagination);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  // Function to handle page change
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {userData.length === 0 ? (
        <div className="m-96">
          <Empty description="No music artists found" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.map((item, index) => (
              <Link href={`/about/${item._id}?type=visual-artist`} key={index}>
                <div key={index} className="p-4">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "100%" }}
                  >
                    <img
                      src={imageBaseURL + item.image}
                      alt={`Image ${index}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h1 className="font-bold text-site-text text-lg my-2">
                    {item.fullName}
                  </h1>
                  <p className="w-full mt-2 font-sans font-semibold">{item.designation}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalResults}
              pageSize={imagesPerPage}
              onChange={onPageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VisualArtist;
