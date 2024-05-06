import DigitalArtist from "@/Components/AfterLog/DigitalArtist/DigitalArtist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Artist",
  description: "Mélange Digital Artist page",
};

const DigitalArtistPage = () => {
  return (
    <>
      <DigitalArtist />
    </>
  );
};

export default DigitalArtistPage;
