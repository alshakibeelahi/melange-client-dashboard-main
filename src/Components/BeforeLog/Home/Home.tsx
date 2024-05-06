import React from "react";
import ImageCards from "./ImageCards";
import Footer from "@/Components/Shared/Footer";
import BefNavbar from "@/Components/Shared/BefNavbar";

const Home = () => {
  return (
    <div>
      <BefNavbar />
      <ImageCards />
      <Footer />
    </div>
  );
};

export default Home;
