"use client";

import DailyMusic from "./DailyMusic";
import EditProfile from "./EditProfile";
import FunnyShit from "./FunnyShit";
import Portfolio from "./Portfolio";
import Recipe from "./Recipe";
import SongsUpload from "./SongsUpload";
import UpcomingJGigs from "./UpcomingGigs";

const UploadDetails = () => {
  return (
    <div className="">
      <EditProfile />
      <DailyMusic />
      <Recipe />
      <FunnyShit />
      <UpcomingJGigs />
      <SongsUpload />
      <Portfolio />
    </div>
  );
};

export default UploadDetails;
