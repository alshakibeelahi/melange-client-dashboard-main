import Home from "@/Components/AfterLog/Artist/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Mélange Home page",
};

const HomePages = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default HomePages;
