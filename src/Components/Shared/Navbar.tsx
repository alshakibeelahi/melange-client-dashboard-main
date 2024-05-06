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
import baseAxios from "../../../Config";

const Navbar = () => {
  const path = usePathname();
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

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
    console.log(result);
    window.location.href = `/about/${result._id}?type=${result.type}`;
  };

  return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between py-4 gap-16 ">
        <div className="flex items-center  ">
          <div>
            <Link href={"/artist"}>
              <Image
                src={AllImages.logo}
                className="h-[70px] w-fit mr-20"
                alt="logo"
                width={100} // Set a width for Image component
                height={100} // Set a height for Image component
              />
            </Link>
          </div>
        </div>

        <div className="lg:flex items-center hidden  ">
          <div className="ml-4 hidden lg:flex">
            {menu.map((item, index) => (
              <Link href={item.link} key={index}>
                <Button
                  className={`px-4 cursor-pointer shadow-none capitalize font-medium duration-200 hover:scale-105 border-none ml-3 ${
                    selected === index ? "text-black" : "text-white"
                  }`}
                  style={{
                    backgroundColor:
                      path === item.link ? "#000000" : "transparent",
                    color: path === item.link ? "white" : "black",
                  }}
                  onClick={() => select(index)}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {user ? (
            <div className="flex justify-center items-center">
              <Link href="/upload-details" className="pl-3">
                <Button
                  shape="circle"
                  icon={<CgProfile className="h-6 w-6 hover:text-black" />}
                />
              </Link>
              <div className="ml-4">
                <button
                  className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
                  onClick={handleLogout}
                >
                  <LuLogOut className="h-5 w-fit" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          {user && (
            <div className="mr-2  lg:hidden">
              <Link href="/upload-details">
                <Button
                  shape="circle"
                  icon={
                    <CgProfile className="h-7 w-7 items-center justify-center -mt-1 text-black hover:text-site-text" />
                  }
                />
              </Link>
            </div>
          )}

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
            {menu.map((item, index) => (
              <Link href={item.link} key={index}>
                <Button
                  className={`px-4 cursor-pointer capitalize font-medium duration-200 shadow-none hover:scale-105 border-none mb-2 ${
                    selected === index ? "text-black" : "text-gray-600"
                  }`}
                  style={{
                    backgroundColor:
                      path === item.link ? "#363062" : "transparent",
                    color: path === item.link ? "white" : "black",
                  }}
                  onClick={() => select(index)}
                >
                  {item.name}
                </Button>
              </Link>
            ))}

            {!user ? (
              <>
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
              </>
            ) : (
              <>
                <div>
                  <button
                    className={`flex items-center gap-3 hover: hover:text-black delay-150 p-3 rounded-full`}
                    onClick={handleLogout}
                  >
                    <LuLogOut className="h-5 w-fit" />
                    <span className="text-sm">Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
