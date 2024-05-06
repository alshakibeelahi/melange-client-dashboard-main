import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/Navbar";
import {  Archivo_Black } from "next/font/google";
import "../globals.css";

const archivo_black = Archivo_Black({
  subsets: ["latin"],
  weight: "400"
});


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Set container here to fixed width
    <div className="">
      <Navbar />
      <div className={archivo_black.className}>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
