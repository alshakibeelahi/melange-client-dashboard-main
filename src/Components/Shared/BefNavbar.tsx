"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Table, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CgProfile } from "react-icons/cg";
import { IoMdPersonAdd } from "react-icons/io";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { AllImages } from "@/assets/AllImages";
import { usePathname } from "next/navigation";

const BefNavbar = () => {
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  // Function to fetch search results from the API

  // Call fetchSearchResults whenever the search text changes

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const handleMobileMenuClick = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const select = (index: any) => {
    setSelected(index);
    setMobileMenuVisible(false); // Close mobile menu when an item is selected
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const menu = [
    {
      name: "Home",
      link: "/artist",
    },
    {
      name: "Digital Artists",
      link: "/digital-artist",
    },
    {
      name: "Music Artists",
      link: "/music-artist",
    },
    {
      name: "Visual Artists",
      link: "/visual-artist",
    },
  ];

  const handleGoToAbout = (result: any) => {
    setSearchText("");
    setSearchVisible(false);
    setSearchResults([]);
    window.location.href = `/about/${result._id}?type=${result.type}`;
  };

  return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between py-4 gap-16 ">
        <Link href={"/home"}>
          <div className="flex items-center text-center pt-5">
            <div>
              <div className="text-5xl font-galleryModern font-bold tracking-wider ">
                Mélange
              </div>
              <div className="font-sans tracking-wider">
                Made by Artists, For Artists
              </div>
            </div>
          </div>
        </Link>
        <div className="lg:flex items-center hidden  ">
          <Link href="/signup">
            <button
              className={`flex items-center gap-2 hover: hover:text-black delay-150 p-3 rounded-full ml-6`}
            >
              <IoMdPersonAdd className="h-5 w-fit" />
              <span>Create Account</span>
            </button>
          </Link>

          <Link href="/login">
            <button
              className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
            >
              <LuLogIn className="h-5 w-fit" />
              <span>Log In</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <div className="lg:hidden">
            <Button
              shape="circle"
              icon={
                <IoMenu className="h-7 w-7 items-center justify-center -mt-1 text-black hover:text-site-text" />
              }
              onClick={handleMobileMenuClick}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuVisible && (
        <div className="container mx-auto py-2 lg:hidden">
          <div className="flex flex-col items-center">
            <Link href="/signup">
              <button
                className={`flex items-center gap-2 hover: hover:text-black delay-150 p-3 rounded-full ml-6`}
              >
                <IoMdPersonAdd className="h-5 w-fit" />
                <span>Create Account</span>
              </button>
            </Link>

            <Link href="/login">
              <button
                className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
              >
                <LuLogIn className="h-5 w-fit" />
                <span>Log In</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BefNavbar;
