"use client";

import { useState, useEffect } from "react";
import { Empty, Radio, Button } from "antd";
import { CiFilter } from "react-icons/ci";
import Link from "next/link";
import baseAxios from "../../../../Config";
import Search from "antd/es/transfer/search";
import { getImageUrl } from "@/app/utils";

interface User {
  _id?: string;
}

const ImageCards = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showEmpty, setShowEmpty] = useState(true);
  const [filteredInfo, setFilteredInfo] = useState<any>({});
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    // Ensure localStorage is available (client-side)
    if (typeof window !== "undefined") {
      // Retrieve user data from localStorage
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const imageBaseURL = getImageUrl();

  useEffect(() => {
    baseAxios
      .get(
        `/users?limit=9&type=${selectedFilter}&search=${search}&userId=${localStorage.getItem(
          "userId"
        )}`
      )
      .then((res) => {
        setUserData(res.data.data.attributes.userList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedFilter, search]);

  const handleFilterClick = () => {
    setShowFilterModal(true);
    setShowEmpty(false);
  };

  const handleFilterClose = () => {
    setShowFilterModal(false);
    setShowEmpty(true);
  };

  console.log(userData)

  return (
    <div className="py-20 max-w-6xl mx-auto relative ">
      {showEmpty && (
        <div className="flex justify-end mb-4 cursor-pointer">
          <div
            className="border border-white rounded-lg p-4  flex"
            onClick={handleFilterClick}
          >
            <CiFilter className="h-6 w-6 mr-2" />
            <div className="text-blue-500">Add filter options</div>
          </div>
        </div>
      )}
      {showFilterModal && (
        <div className="flex justify-center items-center bg">
          <div>
            <h2 className="text-2xl font-bold">Filter Options</h2>
            <div className="text-xl font-semibold mt-2">Artist Type</div>
            <div>
              <Radio.Group
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter}
              >
                <Radio value="music-artist" className="text-lg font-normal">
                  Musical
                </Radio>
                <Radio value="visual-artist" className="text-lg font-normal">
                  Visual
                </Radio>
                <Radio value="digital-artist" className="text-lg font-normal">
                  Digital
                </Radio>
                <Radio value="all" className="text-lg font-normal">
                  All
                </Radio>
              </Radio.Group>
            </div>
            <div className="mt-4 my-4">
              <div className="text-xl font-semibold">Search</div>
              <input type="text" placeholder="Search by name/type/profession/address" className="border border-black w-full font-sans p-1" onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="mt-2">
              <Button
                className="bg-blue-600 text-white text-lg font-normal w-auto h-auto"
                onClick={handleFilterClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {userData.map((user: any, index: number) => (
          <Link href={`/about/${user._id}?type=${user.type}`} key={index}>
            <div className="bg-white overflow-hidden mt-10 ">
              <img
                src={`${imageBaseURL}${user.image}`}
                alt="Profile Picture"
                className="w-[366px] h-[366px] p-3"
              />
              <div className="p-3">
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <p className="text-gray-600 font-sans font-semibold">{user.designation}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageCards;
