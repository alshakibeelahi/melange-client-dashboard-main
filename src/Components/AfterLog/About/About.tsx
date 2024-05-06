import React from "react";
import AboutBanner from "./AboutBanner";
import DailyMusicRoutine from "./DailyMusicRoutine";
import FunnyShit from "./FunnyShit";
import UpcomingGigs from "./UpcomingGigs";
import Songs from "./Songs";
import Portfolio from "./Portfolio";
import ReciepePicture from "./ReciepePicture";
import TopSection from "./TopSection";

const About = ({
  data,
}: {
  data: {
    type: any;
    id: string;
  };
}) => {
  return (
    <div className="mb-12">
      <TopSection id={data.id} />
      <AboutBanner id={data.id} />
      <DailyMusicRoutine id={data.id} />
      <ReciepePicture id={data.id} />
      <FunnyShit id={data.id} />
      <UpcomingGigs id={data.id} />
      <Songs id={data.id} />
      <Portfolio data={{ id: data.id, type: data.type }} />
    </div>
  );
};

export default About;
