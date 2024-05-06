import MusicArtist from "@/Components/AfterLog/MusicArtist/MusicArtist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music Artist",
  description: "Mélange Music Artist page",
};

const MusicArtistPage = () => {
  return (
    <>
      <MusicArtist />
    </>
  );
};

export default MusicArtistPage;
