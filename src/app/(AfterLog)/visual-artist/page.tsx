import VisualArtist from "@/Components/AfterLog/VisualArtist/VisualArtist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Artist",
  description: "Mélange Visual Artist page",
};

const VisualArtistPage = () => {
  return (
    <>
      <VisualArtist />
    </>
  );
};

export default VisualArtistPage;
