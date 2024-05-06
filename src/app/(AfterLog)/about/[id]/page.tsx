"use client"

import About from "@/Components/AfterLog/About/About";
import { Metadata } from "next";
import { useParams, useSearchParams } from "next/navigation";

// export const metadata: Metadata = {
//   title: "About",
//   description: "Mélange About page",
// };

const AboutPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const userId = params.id.toString()
  return (
    <>
      <About data={{id: userId, type}} />
    </>
  );
};

export default AboutPage;
